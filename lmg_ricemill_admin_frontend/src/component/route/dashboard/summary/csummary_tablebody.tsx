"use client"

import type { TDataLogTable } from "@/schema/main_schema"
import useV1DeleteLogs from "@/hooks/api_hooks/usev1deletelogs"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, Package, QrCode, ShoppingCart, Tag, DollarSign } from "lucide-react"

const quantityMap: Record<string, string> = {
  quantityxxs: "XXS",
  quantityxs: "XS",
  quantitys: "S",
  quantitym: "M",
  quantityl: "L",
  quantityxl: "XL",
  quantityxxl: "XXL",
  quantity5: "5.0",
  quantity55: "5.5",
  quantity6: "6.0",
  quantity65: "6.5",
  quantity7: "7.0",
  quantity75: "7.5",
  quantity8: "8.0",
  quantity85: "8.5",
  quantity9: "9.0",
  quantity95: "9.5",
  quantity100: "10.0",
  quantity105: "10.5",
  quantity110: "11.0",
  quantity115: "11.5",
  quantity120: "12.0",
  quantitydefault: "default",
}

const CSummaryTableBody = (props: {
  logs: TDataLogTable
  index: number
  getV1GetLogs: () => Promise<void>
}) => {
  const { index, logs, getV1GetLogs } = props

  const { getV1DeleteLogs } = useV1DeleteLogs(getV1GetLogs)

  const isIncoming = logs.mode === "incoming"

  return (
    <TableRow
      key={index}
      className={`${isIncoming ? "bg-green-50 hover:bg-green-100" : "bg-red-50 hover:bg-red-100"} transition-colors`}
    >
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{new Date(logs.logdate).toLocaleDateString()}</span>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Badge
          className={
            isIncoming ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"
          }
        >
          <div className="flex items-center gap-1">
            {isIncoming ? <Package className="h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
            {logs.mode.toUpperCase()}
          </div>
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Package className="h-4 w-4 text-gray-500" />
          <span className="font-mono text-sm">{logs.productid}</span>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          <QrCode className="h-4 w-4 text-gray-500" />
          <span className="font-mono text-sm">{logs.itemid}</span>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-mono text-sm">{logs?.orderid || "--"}</span>
      </TableCell>

      <TableCell className="text-center">
        <Badge variant="outline">
          <Tag className="h-3 w-3 mr-1" />
          {logs.category}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <span className="font-medium">{logs.title}</span>
      </TableCell>

      <TableCell className="text-center">
        <Badge variant="secondary">{quantityMap[`${logs.size}`]}</Badge>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1">
          <DollarSign className="h-4 w-4 text-red-600" />
          <span className="font-semibold text-red-700">₱{Number(logs.cost).toLocaleString()}</span>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-1">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-700">₱{Number(logs.price).toLocaleString()}</span>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            getV1DeleteLogs(logs.itemid)
          }}
          className="h-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default CSummaryTableBody
