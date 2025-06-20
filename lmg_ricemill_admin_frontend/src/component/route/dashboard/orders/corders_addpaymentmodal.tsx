import useV1PostInstallment from "@/hooks/api_hooks/usev1postinstallment"
import { TParamsGetInstallment, TParamsPostInstallment } from "@/schema/main_schema"

import { Plus, Hash, X, DollarSign, FileText, Clock, Send } from "lucide-react"
import type React from "react"
import { useCallback, useState } from "react"
import ReactDOM from "react-dom"

const AddPaymentModal = (props: {
    showAddPaymentModal: boolean,
    setShowAddPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
    getV1GetOrderUser: () => Promise<void>
    getV1GetInstallment: (params: TParamsGetInstallment) => Promise<void>
    params: TParamsGetInstallment
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {showAddPaymentModal, params, getV1GetInstallment, getV1GetOrderUser,  setShowAddPaymentModal} = props;
    const { getV1PostInstallment, payload, setPayload } = useV1PostInstallment()

    if (!showAddPaymentModal) return null

    const callbackFunction = async () => {
      await Promise.all([
        getV1GetInstallment(params),
        getV1GetOrderUser()
      ])
    }

    const handleAddPayment = async () => {
        if (!params.transactionid) return
    
        setIsSubmitting(true)
        try {
          await getV1PostInstallment({ transactionid: params.transactionid }, () => {
            callbackFunction()
            setShowAddPaymentModal(false)
            setPayload({ amount: "", description: "" })
          })
        } catch (error) {
          console.error("Error adding payment:", error)
        } finally {
          setIsSubmitting(false)
        }
      }

        // Memoized handlers to prevent focus loss
  const handleAmountChange = (value: string) => {
    setPayload((prev) => ({ ...prev, amount: value }))
  }

  const handleDescriptionChange =     (value: string) => {
    setPayload((prev) => ({ ...prev, description: value }))
  }
  
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[70] p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Add Payment</h3>
                  <p className="text-sm text-emerald-100">Record new installment</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddPaymentModal(false)
                  setPayload({ amount: "", description: "" })
                }}
                disabled={isSubmitting}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Transaction Info */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Transaction ID</span>
              </div>
              <p className="font-mono text-sm bg-white px-3 py-2 rounded-lg border">{params.transactionid}</p>
            </div>

            <div className="mt-6 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Transaction Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    className={`${inputClass} pl-12`}
                    value={
                      payload?.transactiondate ? new Date(payload.transactiondate).toISOString().split("T")[0] : ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPayload((prev) => ({
                        ...prev,
                        transactiondate: new Date(e.target.value),
                      }))
                    }}
                  />
                </div>
              </div>
              
            {/* Amount Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                Payment Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={payload.amount || ""}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="Enter payment amount"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {payload.amount && !isValidAmount(payload.amount) && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <X className="h-3 w-3" />
                  Please enter a valid amount greater than 0
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="h-4 w-4 text-emerald-600" />
                Description
              </label>
              <textarea
                value={payload.description || ""}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Enter payment description (optional)"
                rows={4}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
            <button
              onClick={() => {
                setShowAddPaymentModal(false)
                setPayload({ amount: "", description: "" })
              }}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPayment}
              disabled={isSubmitting || !isValidAmount(payload.amount)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Add Payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>,
      document.body,
    )
  }

  const isValidAmount = (amount: string | undefined) => {
    if (!amount || amount.trim() === "") return false
    const num = Number.parseFloat(amount)
    return !isNaN(num) && num > 0
  }


  export default AddPaymentModal;

    const inputClass =
    "w-full p-4 rounded-xl text-gray-800 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm bg-gradient-to-r from-white to-gray-50 hover:border-purple-300"