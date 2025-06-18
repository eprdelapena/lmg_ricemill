"use client"

import COrdersTableBody from "@/component/route/dashboard/orders/corders_tablebody"
import useV1GetOrderUser from "@/hooks/api_hooks/usev1getorderuser"
import type { TParamsGetOrderUser } from "@/schema/main_schema"
import { useEffect, useState } from "react"
import { Search, Filter, Calendar, Package, ChevronLeft, ChevronRight, CircuitBoard } from "lucide-react"

const totalPages = 9999
const pageSize = 5

const COrdersTable = () => {
  const [initialPayload, setInitialPayload] = useState<Partial<Omit<TParamsGetOrderUser, "skip">>>({
    search: undefined,
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
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Orders Management
              </h1>
              <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Card */}
        <div className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200 p-6">
            <div className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-semibold text-gray-800">Search & Filter Orders</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Search Category */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4 text-purple-500" />
                  Search Category
                </label>
                <select
                  className="w-full h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl px-4 bg-white"
                  onChange={(e) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      category: e.target.value as any,
                    }))
                  }}
                >
                  <option value="">Select search category</option>
                  <option value="fullname">Search by full name</option>
                  <option value="transactionid">Search by transaction ID</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" />
                  Search Orders
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full h-12 pl-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    onChange={(e) => {
                      setInitialPayload((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              {/* Order Status */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Package className="h-4 w-4 text-green-500" />
                  Order Status
                </label>
                <select
                  className="w-full h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 bg-white"
                  defaultValue="All"
                  onChange={(e) => {
                    setCurrentPayload((prev) => ({
                      ...prev,
                      status: e.target.value?.length === 0 ? undefined : (e.target.value as any),
                    }))
                  }}
                >
                  <option value="All">ALL</option>
                  <option value="notpaid">UNPAID</option>
                  <option value="paid">PAID</option>
                </select>
              </div>

              {/* Begin Date */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  Begin Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full h-12 pl-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setCurrentPayload((prev) => ({
                        ...prev,
                        begin: dateObj,
                      }))
                    }}
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-pink-500" />
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full h-12 pl-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                    onChange={(e) => {
                      const dateObj = new Date(e.target.value).toISOString()
                      setCurrentPayload((prev) => ({
                        ...prev,
                        end: dateObj,
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-row gap-4 mt-8">
              <button
                onClick={() => {
                  setCurrentPayload(initialPayload)
                  setCurrentSkip(1)
                }}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Search Orders
              </button>
              <button
                onClick={() => {
                  setCurrentPayload({
                    begin: undefined,
                    end: undefined,
                    category: undefined,
                    search: undefined,
                    status: undefined,
                  })
                  setCurrentSkip(1)
                }}
                className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
              >
                <CircuitBoard className="h-5 w-5" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Orders Cards */}
        <div className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-semibold text-gray-800">Orders List</h2>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200">
                <span className="text-purple-800 font-semibold">{orderUserList.length} orders</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {orderUserList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orderUserList.map((order, index) => (
                  <COrdersTableBody key={index} order={order} getV1GetOrderUser={getV1GetOrderUser} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                  <div className="p-4 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-700">No orders found</p>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pagination */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentSkip === 1}
              className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                currentSkip === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-600 to-slate-600 text-white hover:from-gray-700 hover:to-slate-700 shadow-lg hover:shadow-xl"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            {paginationNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentSkip(page)}
                className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 ${
                  currentSkip === page
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentSkip === totalPages}
              className={`px-4 py-3 text-sm rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                currentSkip === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-600 to-slate-600 text-white hover:from-gray-700 hover:to-slate-700 shadow-lg hover:shadow-xl"
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default COrdersTable
