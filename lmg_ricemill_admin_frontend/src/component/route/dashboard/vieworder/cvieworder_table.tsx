"use client"

import type { TUserSession } from "@/schema/main_schema"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import useV1ViewOrderItem from "@/hooks/api_hooks/usev1vieworderitem"
import useV1GetSingleOrderUser from "@/hooks/api_hooks/usev1getsingleorderuser"
import useV1GetInstallment from "@/hooks/api_hooks/usev1getinstallment"
import useV1PostInstallment from "@/hooks/api_hooks/usev1postinstallment"
import useV1DeleteInstallment from "@/hooks/api_hooks/usev1deleteinstallment"
import useV1EditInstallment from "@/hooks/api_hooks/usev1editinstallment"
import CViewOrderEditPaymentModal from "./cvieworder_editpaymentmodal"
import useV1OrderGenerateBarcode from "@/hooks/api_hooks/usev1ordergeneratebarcode"
import { EParamsDefault } from "@/enum/main_enum"
import Swal from "sweetalert2"
import useV1GetLogs from "@/hooks/api_hooks/usev1getlogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  User,
  Calendar,
  MapPin,
  Phone,
  CreditCard,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  QrCode,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"

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

const CViewOrderTable = (props: { userData: TUserSession }) => {
  const { userData } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [editModal, setEditModal] = useState<boolean>(false)
  const currentOrderId = usePathname()?.split("/")[3]
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null)
  const { getV1ViewOrderItem, orderList, currentSkip, setCurrentSkip } = useV1ViewOrderItem()
  const totalPages = 9999
  const pageSize = 5

  const { getV1GetSingleOrderUser, orderUser } = useV1GetSingleOrderUser()
  const { getV1GetInstallment, installmentList } = useV1GetInstallment()
  const { getV1PostInstallment, setPayload, payload } = useV1PostInstallment()

  const { APILocalOrderGenerateBarcode } = useV1OrderGenerateBarcode()

  const { getV1DeleteInstallment } = useV1DeleteInstallment()

  const { getV1EditInstallment, installmentParams, description, setDescription, setInstallmentParams } =
    useV1EditInstallment()

  const handleNext = () => {
    setCurrentSkip((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const handlePrevious = () => {
    setCurrentSkip((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const { getV1GetLogsOrder, orderLogs, setOrderLogs } = useV1GetLogs()

  const paginationNumbers = Array.from(
    {
      length: Math.min(pageSize, totalPages - Math.floor((currentSkip - 1) / pageSize) * pageSize),
    },
    (_, i) => i + 1 + Math.floor((currentSkip - 1) / pageSize) * pageSize,
  )

  const initializer = async () => {
    setLoading(true)
    try {
      await Promise.all([
        getV1GetInstallment({ orderid: currentOrderId }),
        getV1GetLogsOrder(currentOrderId),
        getV1GetSingleOrderUser({ orderid: currentOrderId }),
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initializer()
  }, [])

  useEffect(() => {
    getV1ViewOrderItem({ orderid: currentOrderId })
  }, [currentSkip])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
    switch (origin?.toLowerCase()) {
      case "shoppee":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "facebook":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-lg text-gray-700 font-medium">Loading order details...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="h-6 w-6 text-blue-600" />
                <span>Order Details: {orderUser?.orderid || ""}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Order Type:</span>
                    <Badge
                      className={
                        orderUser?.type === "on_hand_layaway"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-violet-100 text-violet-800"
                      }
                    >
                      {orderUser?.type === "on_hand_layaway" ? "In Hand" : "Pre-ordered"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Customer:</span>
                    <span className="text-sm">{`${orderUser?.receiverfirstname} ${orderUser?.receiverlastname}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm">{new Date(orderUser?.orderdate || "").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Mobile:</span>
                    <span className="text-sm font-mono">{orderUser?.receivermobile}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Region:</span>
                    <span className="text-sm">{orderUser?.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Province:</span>
                    <span className="text-sm">{orderUser?.province}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">City:</span>
                    <span className="text-sm">{orderUser?.municity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Address:</span>
                    <span className="text-sm">{orderUser?.address}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Current Payment:</span>
                    <Badge className="bg-green-100 text-green-800">
                      ₱{Number(orderUser?.cuurentpayment).toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Total Price:</span>
                    <Badge variant="outline">₱{Number(orderUser?.totalcost).toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Origin:</span>
                    <Badge className={getOriginColor(orderUser?.originsite || "")}>
                      {orderUser?.originsite?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={getStatusColor(orderUser?.estatustype || "")}>
                      {orderUser?.estatustype?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={payload?.amount || ""}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }}
                    placeholder="Enter payment amount"
                    className="pl-10 h-10"
                  />
                </div>
                <Button
                  onClick={async () => {
                    Swal.fire({
                      title: "Posting customer's payment, please wait...",
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading()
                      },
                    })

                    try {
                      await getV1PostInstallment({
                        orderid: orderUser?.orderid!,
                      })
                      Swal.close()
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Something went wrong while adding the payment.",
                      })
                    }
                  }}
                  className="h-10 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment
                </Button>
                {orderUser?.estatustype !== EParamsDefault.success &&
                  orderUser?.estatustype !== EParamsDefault.ondelivery && (
                    <Button
                      onClick={() => {
                        APILocalOrderGenerateBarcode({
                          session: userData as any,
                          orderid: (orderUser?.orderid as string) || "",
                        })
                      }}
                      variant="outline"
                      className="h-10"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR
                    </Button>
                  )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Payment Date
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Amount
                        </div>
                      </TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {installmentList.length > 0 ? (
                      installmentList.map((installment, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(installment.installmentdate).toLocaleDateString("en-PH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              ₱{Number(installment?.installment || 0).toLocaleString()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{installment?.description || "No description"}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedInstallment(installment)
                                  setEditModal(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  getV1DeleteInstallment({
                                    id: installment?.id,
                                    orderid: installment?.orderid,
                                  })
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2 text-gray-500">
                            <CreditCard className="h-12 w-12 text-gray-300" />
                            <p>No payment history available</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>


          {/* Customer Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Customer's Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {[
                        "Product ID",
                        "Product name",
                        "Category",
                        "Total price",
                        "Total quantity",
                        "Default quantity",
                        "Quantity Size XXS",
                        "Quantity Size XS",
                        "Quantity Size S",
                        "Quantity Size M",
                        "Quantity Size L",
                        "Quantity Size XL",
                        "Quantity Size XXL",
                        "Quantity Size 5.0",
                        "Quantity 5.5",
                        "Quantity 6.0",
                        "Quantity 6.5",
                        "Quantity 7.0",
                        "Quantity 7.5",
                        "Quantity 8.0",
                        "Quantity 8.5",
                        "Quantity 9.0",
                        "Quantity 9.5",
                        "Quantity 10.0",
                        "Quantity 10.5",
                        "Quantity 11.0",
                        "Quantity 11.5",
                        "Quantity 12.0",
                      ].map((heading, i) => (
                        <TableHead key={i} className="text-center whitespace-nowrap">
                          {heading}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderList.length > 0 ? (
                      orderList.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-center font-mono text-sm">{order.productid}</TableCell>
                          <TableCell className="text-center">{order.title}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{order.category}</Badge>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            ₱{Number(order.price).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {Number(order.orderquantity).toLocaleString()}
                          </TableCell>
                          <TableCell
                            className={`text-center ${Number(order.quantitydefault) > 0 ? "text-red-500 font-medium" : "text-gray-400"}`}
                          >
                            {Number(order.quantitydefault) === 0
                              ? "--"
                              : Number(order.quantitydefault).toLocaleString()}
                          </TableCell>
                          {/* Repeat similar pattern for all quantity fields */}
                          {[
                            "quantityxxs",
                            "quantityxs",
                            "quantitys",
                            "quantitym",
                            "quantityl",
                            "quantityxl",
                            "quantityxxl",
                            "quantity5",
                            "quantity55",
                            "quantity6",
                            "quantity65",
                            "quantity7",
                            "quantity75",
                            "quantity8",
                            "quantity85",
                            "quantity9",
                            "quantity95",
                            "quantity100",
                            "quantity105",
                            "quantity110",
                            "quantity115",
                            "quantity120",
                          ].map((field) => (
                            <TableCell
                              key={field}
                              className={`text-center ${Number(order[field as keyof typeof order]) > 0 ? "text-red-500 font-medium" : "text-gray-400"}`}
                            >
                              {Number(order[field as keyof typeof order]) === 0
                                ? "--"
                                : Number(order[field as keyof typeof order]).toLocaleString()}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={28} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2 text-gray-500">
                            <Package className="h-12 w-12 text-gray-300" />
                            <p>No order data available</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={handlePrevious} disabled={currentSkip === 1} className="h-10">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {paginationNumbers.map((page) => (
                  <Button
                    key={page}
                    variant={currentSkip === page ? "default" : "outline"}
                    onClick={() => setCurrentSkip(page)}
                    className="h-10 w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" onClick={handleNext} disabled={currentSkip === totalPages} className="h-10">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {editModal && selectedInstallment && (
        <CViewOrderEditPaymentModal
          setEditModal={setEditModal}
          installmentParams={installmentParams}
          setInstallmentParams={setInstallmentParams}
          getV1EditInstallment={getV1EditInstallment}
          installment={selectedInstallment}
          description={description}
          setDescription={setDescription}
        />
      )}
    </>
  )
}

export default CViewOrderTable
