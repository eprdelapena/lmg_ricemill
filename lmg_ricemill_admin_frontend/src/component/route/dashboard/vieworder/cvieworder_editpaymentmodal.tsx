"use client"
import type { TDataGetInstallment, TParamsEditInstallment } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, DollarSign, FileText, Save, CreditCard } from "lucide-react"

const CViewOrderEditPaymentModal = (props: {
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>
  installmentParams: string
  setInstallmentParams: React.Dispatch<React.SetStateAction<string>>
  getV1EditInstallment: (
    params: Omit<TParamsEditInstallment, "installment">,
    callbackFunction?: (...args: any[]) => any,
  ) => Promise<void>
  installment: TDataGetInstallment
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}) => {
  const {
    getV1EditInstallment,
    setEditModal,
    installment,
    setInstallmentParams,
    description,
    setDescription,
    installmentParams,
  } = props

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Edit Payment
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditModal(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Order ID:</span>
              </div>
              <Badge variant="outline" className="font-mono">
                {installment?.orderid}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Current Amount:</span>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                ₱{Number(installment?.installment || 0).toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Payment Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="payment-amount" className="text-sm font-medium text-gray-700">
              Payment Amount
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="payment-amount"
                type="text"
                placeholder="Input payment"
                value={installmentParams === "0" ? "" : installmentParams}
                onChange={(e) => {
                  setInstallmentParams(e.target.value)
                }}
                className="h-11 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Payment Description */}
          <div className="space-y-2">
            <Label htmlFor="payment-description" className="text-sm font-medium text-gray-700">
              Payment Description
            </Label>
            <div className="relative">
              <Textarea
                id="payment-description"
                placeholder="Description about the payment..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                className="min-h-[100px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                getV1EditInstallment({
                  orderid: installment?.orderid,
                  id: installment?.id,
                })
              }}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setEditModal(false)} className="flex-1 h-11 hover:bg-gray-50">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body,
  )
}

export default CViewOrderEditPaymentModal
