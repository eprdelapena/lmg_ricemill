"use client"

import { TableCell } from "@/components/ui/table"

import COrdersTableBody from "@/component/route/dashboard/orders/corders_tablebody"
import useV1GetOrderUser from "@/hooks/api_hooks/usev1getorderuser"
import type { TParamsGetOrderUser } from "@/schema/main_schema"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Calendar, Package, User, MapPin, Phone, CreditCard, Settings } from "lucide-react"

const totalPages = 9999
const pageSize = 5

const COrdersTable = () => {
  const [initialPayload, setInitialPayload] = useState<Partial<Omit<TParamsGetOrderUser, "skip">>>({
    begin: undefined,
    end: undefined,
    category: undefined,
    type: undefined,
    search: undefined,
    estatustype: "pending",
  })


  
  const { currentSkip, setCurrentPayload, setCurrentSkip, payload, getV1GetOrderUser, orderUserList } =
    useV1GetOrderUser()


  const handleNext = () => {
    setCurrentSkip((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const handlePrevious = () => {
    setCurrentSkip((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const paginationNumbers = Array.from(
    {
      length: Math.min(pageSize, totalPages - Math.floor((currentSkip - 1) / pageSize) * pageSize),
    },
    (_, i) => i + 1 + Math.floor((currentSkip - 1) / pageSize) * pageSize,
  )

  useEffect(() => {
    getV1GetOrderUser()
  }, [currentSkip, payload])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Row 1: Search Category, Search Input, Order Type */}
              <div className="space-y-2">
                <Label htmlFor="search-category" className="text-sm font-medium text-gray-700">
                  Search Category
                </Label>
                <Select
                  onValueChange={(value) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      category: value as "orderid" | "username",
                    }))
                  }}
                >
                  <SelectTrigger id="search-category" className="h-10 w-full">
                    <SelectValue placeholder="Select search category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="username">By Username</SelectItem>
                    <SelectItem value="orderid">By Order ID</SelectItem>
                    <SelectItem value="firstname">By First Name</SelectItem>
                    <SelectItem value="lastname">By Last Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Search Orders
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="search"
                    placeholder="Search orders..."
                    className="h-10 pl-10"
                    onChange={(e) => {
                      setInitialPayload((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-type" className="text-sm font-medium text-gray-700">
                  Order Type
                </Label>
                <Select
                  value={initialPayload?.type || ""}
                  onValueChange={(value) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      type: value,
                    }))
                  }}
                >
                  <SelectTrigger id="order-type" className="h-10 w-full">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on_hand_layaway">In Hand</SelectItem>
                    <SelectItem value="in_transit_layaway">Pre-ordered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2: Order Status, Begin Date, End Date */}
              <div className="space-y-2 ">
                <Label htmlFor="order-status" className="text-sm font-medium text-gray-700">
                  Order Status
                </Label>
                <Select
                  defaultValue="pending"
                  onValueChange={(value) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      estatustype: value,
                    }))
                  }}
                >
                  <SelectTrigger id="order-status" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ondelivery">On Delivery</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="begin-date" className="text-sm font-medium text-gray-700">
                  Begin Date
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="begin-date"
                    type="date"
                    className="h-10 pl-10"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setInitialPayload((prev) => ({
                        ...prev,
                        begin: dateObj,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="end-date"
                    type="date"
                    className="h-10 pl-10"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setInitialPayload((prev) => ({
                        ...prev,
                        end: dateObj,
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <Button
                onClick={() => {
                  setCurrentPayload(initialPayload)
                  setCurrentSkip(1)
                }}
                className=" h-10 bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Orders List ({orderUserList.length} orders)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Balance
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Package className="h-4 w-4" />
                        Type
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Order ID</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Settings className="h-4 w-4" />
                        Actions
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Origin</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Username</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Region
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Province</TableHead>
                    <TableHead className="text-center whitespace-nowrap">City</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Address</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                        Mobile
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Cancel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderUserList.length > 0 ? (
                    orderUserList.map((order, index) => (
                      <COrdersTableBody key={index} order={order} getV1GetOrderUser={getV1GetOrderUser} index={index} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <Package className="h-12 w-12 text-gray-300" />
                          <p className="text-lg font-medium">No orders found</p>
                          <p className="text-sm">Try adjusting your search criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex mt-5 flex-wrap justify-center gap-2 px-2">
            <button
              onClick={handlePrevious}
              disabled={currentSkip === 1}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                currentSkip === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {paginationNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentSkip(page)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                  currentSkip === page
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentSkip === totalPages}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                currentSkip === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
    </div>
  )
}

export default COrdersTable
