"use client"

import useV1GetInstallment from "@/hooks/api_hooks/usev1getinstallment"
import type { TParamsGetInstallment, TDataGetInstallment } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"
import { X, CreditCard, Calendar, FileText, DollarSign, Clock, CheckCircle, Eye, Hash, Plus, Send, Trash2 } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import AddPaymentModal from "./corders_addpaymentmodal"
import useV1DeleteInstallment from "@/hooks/api_hooks/usev1deleteinstallment"

const CInstallmentModal = (props: {
  setInstallmentModal: React.Dispatch<React.SetStateAction<boolean>>
  params: TParamsGetInstallment
}) => {
  const { setInstallmentModal, params } = props
  const { installmentList, getV1GetInstallment } = useV1GetInstallment()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState<TDataGetInstallment | null>(null)
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  const {getV1DeleteInstallment} = useV1DeleteInstallment();

  useEffect(() => {
    const fetchInstallments = async () => {
      if (params) {
        setIsLoading(true)
        try {
          await getV1GetInstallment(params)
        } catch (error) {
          console.error("Error fetching installments:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchInstallments()
  }, [params])



  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatCurrency = (amount: string) => {
    try {
      const num = Number.parseFloat(amount)
      return `₱ ${num.toLocaleString()}`
    } catch {
      return `$${amount}`
    }
  }



  const BeautifulLoader = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-green-100 rounded-full animate-ping opacity-20"></div>
        <div className="absolute w-24 h-24 border-4 border-emerald-100 rounded-full animate-ping opacity-30 delay-300"></div>
        <div className="absolute w-16 h-16 border-4 border-teal-100 rounded-full animate-ping opacity-40 delay-700"></div>
      </div>

      {/* Main Spinner */}
      <div className="relative z-10 mb-6">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-4 border-transparent border-t-green-500 border-r-emerald-500 rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 border-4 border-transparent border-t-emerald-500 border-l-green-500 rounded-full animate-spin"
            style={{ animationDuration: "0.8s", animationDirection: "reverse" }}
          ></div>
          <div className="absolute inset-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2 relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Loading Installments
        </h3>
        <p className="text-gray-500 text-sm">Fetching payment details...</p>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CreditCard className="absolute top-8 left-8 w-4 h-4 text-green-300 opacity-30 animate-bounce delay-500" />
        <DollarSign className="absolute top-12 right-12 w-4 h-4 text-emerald-300 opacity-30 animate-bounce delay-1000" />
        <Calendar className="absolute bottom-16 left-12 w-3 h-3 text-teal-300 opacity-30 animate-bounce delay-700" />
      </div>
    </div>
  )

  const totalAmount = installmentList.reduce((sum, item) => {
    try {
      return sum + Number.parseFloat(item.installment)
    } catch {
      return sum
    }
  }, 0)


  // Description Modal Component
  const DescriptionModal = () => {
    if (!selectedDescription) return null

    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Payment Description</h3>
                  <p className="text-sm text-indigo-100">Installment Details</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDescription(null)}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Payment Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-xs text-indigo-600 uppercase tracking-wide">Amount</p>
                    <p className="font-bold text-indigo-900">{formatCurrency(selectedDescription.installment)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-purple-600 uppercase tracking-wide">Date</p>
                    <p className="font-bold text-purple-900">{formatDate(selectedDescription.installmentdate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-xs text-indigo-600 uppercase tracking-wide">Transaction</p>
                    <p className="font-mono text-sm font-bold text-indigo-900">{selectedDescription.transactionid}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <h4 className="text-lg font-semibold text-gray-900">Description</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-indigo-500">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedDescription.description || "No description provided for this installment."}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedDescription(null)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Payment Installments</h2>
                    <p className="text-sm text-green-100">Track your payment schedule</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddPaymentModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add Payment
                  </button>
                  <button
                    onClick={() => setInstallmentModal(false)}
                    className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {isLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 animate-spin text-green-500" />
                        Loading...
                      </span>
                    ) : (
                      `${installmentList.length} ${installmentList.length === 1 ? "Installment" : "Installments"}`
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {isLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 animate-spin text-green-500" />
                        Calculating...
                      </span>
                    ) : (
                      `Total: ${formatCurrency(totalAmount.toString())}`
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Installments List */}
            <div className="h-96 overflow-y-auto">
              {isLoading ? (
                <BeautifulLoader />
              ) : installmentList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <CreditCard className="h-12 w-12 mb-3 text-gray-300" />
                  <p className="text-lg font-medium">No installments found</p>
                  <p className="text-sm">No payment records available</p>
                  <button
                    onClick={() => setShowAddPaymentModal(true)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Payment
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {installmentList.map((installment, index) => (
                    <div
                      key={installment.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-green-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Installment Number */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{index + 1}</span>
                            </div>
                          </div>

                          {/* Installment Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {formatCurrency(installment.installment)}
                              </h3>
                              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                Payment
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium text-gray-900">
                                  {formatDate(installment.installmentdate)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">Transaction:</span>
                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                  {installment.transactionid}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                        {/* Description Button */}
                        {
                          installment?.description?.length > 0 
                          &&
                          <div className="flex-shrink-0 ml-4">
                          <button
                            onClick={() => setSelectedDescription(installment)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">Description</span>
                          </button>
                        </div>
                        }

                        <div className="flex-shrink-0 ml-4">
                          <button
                            onClick={() => {
                              getV1DeleteInstallment({
                                id: installment.id,
                                transactionid: installment.transactionid
                              },
                              getV1GetInstallment,
                              {
                                transactionid: installment.transactionid
                              }
                            )
                            }}
                            className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-yellow-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-end">
                <button
                  onClick={() => setInstallmentModal(false)}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 font-medium"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Close"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* Description Modal */}
      <DescriptionModal />

      {/* Add Payment Modal */}
      <AddPaymentModal getV1GetInstallment={getV1GetInstallment} showAddPaymentModal={showAddPaymentModal} params={params} setShowAddPaymentModal={setShowAddPaymentModal}/>
    </>
  )
}

export default CInstallmentModal
