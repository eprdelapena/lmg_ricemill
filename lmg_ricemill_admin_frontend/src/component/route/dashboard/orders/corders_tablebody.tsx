"use client"

import useV1DeleteOrderUser from "@/hooks/api_hooks/usev1deleteorderuser"
import type { TDataGetOrderUser } from "@/schema/main_schema"
import { useState } from "react"
import COrdersModalEditStatus from "./corders_modaleditstatus"
import { EAdminRoutes } from "@/enum/main_enum"
import { Eye, Trash2, Calendar, User, MapPin, Phone, CreditCard, Package, Info } from "lucide-react"

const COrdersTableBody = (props: {
  order: TDataGetOrderUser
  index: number
  getV1GetOrderUser(): Promise<void>
}) => {
  const { order, index, getV1GetOrderUser } = props
  const [editStatusModal, setEditStatusModal] = useState<boolean>(false)
  const [viewDetailsModal, setViewDetailsModal] = useState<boolean>(false)

  const { getV1DeleteOrderUser } = useV1DeleteOrderUser()

  const remainingBalance = Number(order.totalcost) - Number(order.currentpayment)
  const isPaid = remainingBalance <= 0

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="font-mono text-lg font-bold">#{order.transactionid}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{new Date(order.transactiondate).toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300 mb-1">
                <span className={`font-bold ${isPaid ? "text-green-500" : "text-red-500"}`}>
                  {isPaid ? "PAID" : "UNPAID"}
                </span>{" "}
                Total Cost
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ₱{Number(order.totalcost).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6">
          {/* Customer Information - Simplified */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Customer Information</h3>
            </div>
            <div>
              <div className="text-sm text-gray-600">Full Name</div>
              <div className="font-medium text-gray-800">{order.fullname}</div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-800">Payment Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Payment</div>
                <div className="font-bold text-emerald-600">₱{Number(order.currentpayment).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Cost</div>
                <div className="font-bold text-gray-800">₱{Number(order.totalcost).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Balance</div>
                {isPaid ? (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 px-2 py-1 rounded-lg text-sm font-semibold inline-block">
                    FULLY PAID
                  </div>
                ) : (
                  <div className="font-bold text-red-600">₱{remainingBalance.toLocaleString()}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setViewDetailsModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-blue-700 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                View Details
              </button>
              <a
                href={`${EAdminRoutes.DASHBOARDVIEWORDER}/${order.transactionid}`}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 text-purple-700 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Orders
              </a>
            </div>
            <button
              onClick={() => {
                getV1DeleteOrderUser({
                  transactionid: order.transactionid,
                  callbackFunction: getV1GetOrderUser,
                })
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {viewDetailsModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Order Details</h2>
                </div>
                <button
                  onClick={() => setViewDetailsModal(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Transaction Info */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-600" />
                  Transaction Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Transaction ID</div>
                    <div className="font-mono font-medium text-gray-800">#{order.transactionid}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium text-gray-800">{new Date(order.transactiondate).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Full Name</div>
                    <div className="font-medium text-gray-800">{order.fullname}</div>
                  </div>
                  {order.spouse && (
                    <div>
                      <div className="text-sm text-gray-600">Spouse</div>
                      <div className="font-medium text-gray-800">{order.spouse}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Mobile
                    </div>
                    <div className="font-mono text-gray-800">{order.mobile}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Agent Code</div>
                    <div className="font-mono text-gray-800">{order.agentcode}</div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Home Address
                </h3>
                <div className="text-gray-700 leading-relaxed">{order.address}</div>
              </div>

              {/* Payment Information */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Payment</div>
                    <div className="font-bold text-emerald-600">₱{Number(order.currentpayment).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                    <div className="font-bold text-gray-800">₱{Number(order.totalcost).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Balance</div>
                    {isPaid ? (
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 px-2 py-1 rounded-lg text-sm font-semibold inline-block">
                        FULLY PAID
                      </div>
                    ) : (
                      <div className="font-bold text-red-600">₱{remainingBalance.toLocaleString()}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200 rounded-b-2xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setViewDetailsModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white rounded-lg font-medium text-sm transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
