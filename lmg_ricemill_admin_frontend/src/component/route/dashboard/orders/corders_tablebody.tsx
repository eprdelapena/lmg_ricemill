"use client"

import useV1DeleteOrderUser from "@/hooks/api_hooks/usev1deleteorderuser"
import type { TDataGetOrderUser } from "@/schema/main_schema"
import { useState } from "react"
import COrdersModalEditStatus from "./corders_modaleditstatus"
import { EAdminRoutes } from "@/enum/main_enum"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { Edit, Eye, Trash2, Calendar, User, MapPin, Phone, CreditCard } from "lucide-react"

const COrdersTableBody = (props: {
  order: TDataGetOrderUser
  index: number
  getV1GetOrderUser(): Promise<void>
}) => {
  const { order, index, getV1GetOrderUser } = props
  const [editStatusModal, setEditStatusModal] = useState<boolean>(false)

  const { getV1DeleteOrderUser } = useV1DeleteOrderUser()

  const remainingBalance = Number(order.totalcost) - Number(order.cuurentpayment)
  const isPaid = remainingBalance <= 0

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "ondelivery":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getOriginColor = (origin: string) => {
    switch (origin.toLowerCase()) {
      case "shoppee":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "facebook":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <>
      <TableRow key={index} className="hover:bg-gray-50">
        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{new Date(order.orderdate).toLocaleDateString()}</span>
          </div>
        </TableCell>

        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            {isPaid ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">PAID</Badge>
            ) : (
              <Badge variant="destructive">₱{remainingBalance.toLocaleString()}</Badge>
            )}
          </div>
        </TableCell>

        <TableCell className="text-center">
          <Badge
            className={
              order.type === "in_transit_layaway"
                ? "bg-violet-100 text-violet-800 hover:bg-violet-200"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }
          >
            {order.type === "in_transit_layaway" ? "PRE-ORDERED" : "IN-HAND"}
          </Badge>
        </TableCell>

        <TableCell className="text-center font-mono text-sm">{order.orderid}</TableCell>

        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>
              {order.receiverfirstname} {order.receiverlastname}
            </span>
          </div>
        </TableCell>

        <TableCell>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditStatusModal(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Status
            </Button>
            <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
              <a href={`${EAdminRoutes.DASHBOARDVIEWORDER}/${order.orderid}`}>
                <Eye className="h-4 w-4" />
                View Orders
              </a>
            </Button>
          </div>
        </TableCell>

        <TableCell className="text-center">
          <Badge className={getStatusColor(order.estatustype)}>{order.estatustype.toUpperCase()}</Badge>
        </TableCell>

        <TableCell className="text-center">
          <Badge className={getOriginColor(order.originsite)}>{order.originsite.toUpperCase()}</Badge>
        </TableCell>

        <TableCell className="text-center font-medium">{order.username}</TableCell>

        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{order.region}</span>
          </div>
        </TableCell>

        <TableCell className="text-center text-sm">{order.province}</TableCell>

        <TableCell className="text-center text-sm">{order.municity}</TableCell>

        <TableCell className="text-center text-sm max-w-xs">
          <div className="truncate" title={order.address}>
            {order.address}
          </div>
        </TableCell>

        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="font-mono text-sm">{order.receivermobile}</span>
          </div>
        </TableCell>

        <TableCell className="text-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              getV1DeleteOrderUser({
                orderId: order.orderid,
                callbackFunction: getV1GetOrderUser,
              })
            }}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Cancel
          </Button>
        </TableCell>
      </TableRow>

      {editStatusModal && (
        <COrdersModalEditStatus
          setEditStatusModal={setEditStatusModal}
          getV1GetOrderUser={getV1GetOrderUser}
          order={order}
        />
      )}
    </>
  )
}

export default COrdersTableBody
