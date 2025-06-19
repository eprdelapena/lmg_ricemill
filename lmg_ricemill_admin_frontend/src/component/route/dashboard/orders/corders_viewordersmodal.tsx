"use client"

import useV1ViewOrderItem from "@/hooks/api_hooks/usev1vieworderitem"
import type React from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Package, Hash, ShoppingCart, Eye, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

const COrdersViewModal = (props: {
  setViewItemsModal: React.Dispatch<React.SetStateAction<boolean>>
  transactionId: string
}) => {
  const { setViewItemsModal, transactionId } = props
  const { orderList, getV1ViewOrderItem } = useV1ViewOrderItem()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (transactionId) {
        setIsLoading(true)
        try {
          await getV1ViewOrderItem({ transactionid: transactionId })
        } catch (error) {
          console.error("Error fetching order items:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchOrderItems()
  }, [transactionId])

  const BeautifulLoader = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-blue-100 rounded-full animate-ping opacity-20"></div>
        <div className="absolute w-24 h-24 border-4 border-purple-100 rounded-full animate-ping opacity-30 delay-300"></div>
        <div className="absolute w-16 h-16 border-4 border-indigo-100 rounded-full animate-ping opacity-40 delay-700"></div>
      </div>

      {/* Main Spinner */}
      <div className="relative z-10 mb-6">
        <div className="w-16 h-16 relative">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
          {/* Inner Ring */}
          <div
            className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-l-blue-500 rounded-full animate-spin animate-reverse"
            style={{ animationDuration: "0.8s" }}
          ></div>
          {/* Center Dot */}
          <div className="absolute inset-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2 relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Loading Order Items
        </h3>
        <p className="text-gray-500 text-sm">Fetching your transaction details...</p>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Package className="absolute top-8 left-8 w-4 h-4 text-blue-300 opacity-30 animate-bounce delay-500" />
        <ShoppingCart className="absolute top-12 right-12 w-4 h-4 text-purple-300 opacity-30 animate-bounce delay-1000" />
        <Hash className="absolute bottom-16 left-12 w-3 h-3 text-indigo-300 opacity-30 animate-bounce delay-700" />
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Order Details</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Hash className="h-3 w-3 text-blue-200" />
                  <span className="text-sm text-blue-100">Transaction: {transactionId}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewItemsModal(false)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {isLoading ? (
                  <span className="inline-flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                    Loading...
                  </span>
                ) : (
                  `${orderList.length} ${orderList.length === 1 ? "Item" : "Items"}`
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {isLoading ? (
                  <span className="inline-flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin text-purple-500" />
                    Calculating...
                  </span>
                ) : (
                  `Total: ${orderList.reduce((sum, item) => sum + item.quantity, 0)} units`
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Items List */}
        <div className="h-96 overflow-y-auto">
          {isLoading ? (
            <BeautifulLoader />
          ) : orderList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Package className="h-12 w-12 mb-3 text-gray-300" />
              <p className="text-lg font-medium">No items found</p>
              <p className="text-sm">This transaction has no items to display</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orderList.map((item, index) => (
                <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Item Number */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate text-lg">{item.productname}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            ID: {item.productid}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex-shrink-0 text-right">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <span className="text-xs ml-1">units</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex justify-end">
            <Button
              onClick={() => setViewItemsModal(false)}
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Close"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default COrdersViewModal
