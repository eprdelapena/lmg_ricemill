"use client"

import type React from "react"
import type { TDataGetMonthlyIncome } from "@/schema/main_schema"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, FileText, Calendar } from "lucide-react"

const CSummaryMemoModal = (props: {
  setMemoModal: (value: React.SetStateAction<boolean>) => void
  income: TDataGetMonthlyIncome
}) => {
  const { setMemoModal, income } = props

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-blue-600" />
              Expense Breakdown
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMemoModal(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(income.day).toLocaleDateString()}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expense Details</label>
            <Textarea
              value={income?.memo ? income.memo : "No content"}
              disabled
              className="min-h-[300px] resize-none bg-gray-50 border-gray-300"
              placeholder="Place description about the expenses (e.g. Product name - x Quantity - Product price)"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setMemoModal(false)} className="bg-blue-600 hover:bg-blue-700">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body,
  )
}

export default CSummaryMemoModal
