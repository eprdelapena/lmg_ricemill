"use client"

import useV1EditStatusOrderUser from "@/hooks/api_hooks/usev1editstatusorderuser"
import type { TDataGetOrderUser } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Package, CheckCircle, Truck, Clock, Edit } from "lucide-react"

const COrdersModalEditStatus = (props: {
  setEditStatusModal: React.Dispatch<React.SetStateAction<boolean>>
  getV1GetOrderUser: () => Promise<void>
  order: TDataGetOrderUser
}) => {
  const { setEditStatusModal, getV1GetOrderUser, order } = props
  const { getV1EditStatusOrderUser, status, setStatus } = useV1EditStatusOrderUser()

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "ondelivery":
        return <Truck className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "ondelivery":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit Order Status
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditStatusModal(false)}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Order ID:</span>
              </div>
              <Badge variant="outline" className="font-mono">
                {order.orderid}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Current Status:</span>
              </div>
              <Badge className={getStatusColor(order.estatustype)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(order.estatustype)}
                  {order.estatustype.toUpperCase()}
                </div>
              </Badge>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">Select New Status</label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Pending</span>
                  </div>
                </SelectItem>
                <SelectItem value="ondelivery">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>On Delivery</span>
                  </div>
                </SelectItem>
                <SelectItem value="success">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Success</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                getV1EditStatusOrderUser({
                  orderid: order.orderid,
                  callbackFunction: getV1GetOrderUser,
                })
              }}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setEditStatusModal(false)}
              className="flex-1 h-11 hover:bg-gray-50"
            >
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

export default COrdersModalEditStatus
