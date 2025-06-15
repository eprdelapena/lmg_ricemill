"use client"

import { TableCell } from "@/components/ui/table"
import { useEffect, useState } from "react"
import CSummaryTableBody from "./csummary_tablebody"
import useV1GetLogs from "@/hooks/api_hooks/usev1getlogs"
import type { TParamsGetLogTable } from "@/schema/main_schema"
import useV1DownloadInstallmentTable from "@/hooks/api_hooks/usev1downloadinstallmenttable"
import useV1DownloadOrderTable from "@/hooks/api_hooks/usev1downloadordertable"
import useV1DownloadOrderUserTable from "@/hooks/api_hooks/usev1downloadorderusertable"
import useV1DownloadProductTable from "@/hooks/api_hooks/usev1downloadproducttable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Calendar,
  Download,
  Package,
  Users,
  ShoppingCart,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileText,
  QrCode,
  Tag,
  DollarSign,
} from "lucide-react"

const totalPages = 9999
const pageSize = 5

const CSummaryTable = () => {
  const [initialPayload, setInitialPayload] = useState<Partial<TParamsGetLogTable>>({
    searchCategory: undefined,
    searchText: "",
  })

  const { logs, payload, setPayload, getV1GetLogs, currentSkip, setCurrentSkip } = useV1GetLogs()

  useEffect(() => {
    getV1GetLogs()
  }, [currentSkip, payload])

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

  const { getV1DownloadInstallmentTable } = useV1DownloadInstallmentTable()
  const { getV1DownloadOrderTable } = useV1DownloadOrderTable()
  const { getV1DownloadOrderUserTable } = useV1DownloadOrderUserTable()
  const { getV1DownloadProductTable } = useV1DownloadProductTable()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Product Records</h1>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Range Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="pl-10 h-10"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setPayload((prev) => ({
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
                    className="pl-10 h-10"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setPayload((prev) => ({
                        ...prev,
                        end: dateObj,
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 ">
                <Label htmlFor="search-category" className="text-sm  font-medium text-gray-700">
                  Search Category
                </Label>
                <Select
                
                  value={initialPayload?.searchCategory || ""}
                  onValueChange={(value) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      searchCategory: value as "itemid" | "orderid" | "mode",
                      searchText: "",
                    }))
                  }}
                >
                  <SelectTrigger id="search-category" className="h-10 w-full">
                    <SelectValue placeholder="Select search category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="itemid">QR Code ID</SelectItem>
                    <SelectItem value="orderid">Order ID</SelectItem>
                    <SelectItem value="mode">Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-input" className="text-sm font-medium text-gray-700">
                  Search Value
                </Label>
                {initialPayload?.searchCategory === "mode" ? (
                  <Select
                    value={initialPayload?.searchText || ""}
                    onValueChange={(value) => {
                      setInitialPayload((prev) => ({
                        ...prev,
                        searchText: value,
                      }))
                    }}
                  >
                    <SelectTrigger id="search-input" className="h-10">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incoming">Incoming</SelectItem>
                      <SelectItem value="outgoing">Outgoing</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="search-input"
                      placeholder="Search..."
                      className="pl-10 h-10"
                      onChange={(e) => {
                        setInitialPayload((prev) => ({
                          ...prev,
                          searchText: e.target.value,
                        }))
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 opacity-0">Search</Label>
                <Button
                  onClick={() => {
                    setPayload((prev) => ({
                      ...prev,
                      searchText: initialPayload.searchText,
                      searchCategory: initialPayload.searchCategory,
                    }))
                  }}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Records
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Actions Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Tables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button onClick={() => getV1DownloadProductTable()} className="h-10 bg-green-600 hover:bg-green-700">
                <Package className="h-4 w-4 mr-2" />
                Product Table
              </Button>
              <Button onClick={() => getV1DownloadOrderUserTable()} className="h-10 bg-yellow-600 hover:bg-yellow-700">
                <Users className="h-4 w-4 mr-2" />
                Order Users
              </Button>
              <Button onClick={() => getV1DownloadOrderTable()} className="h-10 bg-orange-600 hover:bg-orange-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders Table
              </Button>
              <Button
                onClick={() => getV1DownloadInstallmentTable()}
                className="h-10 bg-violet-600 hover:bg-violet-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Installments
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Product Records ({logs.length} records)
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
                        Date Logged
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Package className="h-4 w-4" />
                        Mode
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Package className="h-4 w-4" />
                        Product ID
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <QrCode className="h-4 w-4" />
                        QR Code ID
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Order ID</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Tag className="h-4 w-4" />
                        Category
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Product Name</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Size</TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Buying Price
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Selling Price
                      </div>
                    </TableHead>
                    <TableHead className="text-center whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <CSummaryTableBody key={index} logs={log} index={index} getV1GetLogs={getV1GetLogs} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <FileText className="h-12 w-12 text-gray-300" />
                          <p className="text-lg font-medium">No records found</p>
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
  )
}

export default CSummaryTable
