"use client"

import useV1AddToCart from "@/hooks/api_hooks/usev1addtocart"
import { UserDataContext } from "@/hooks/context/main_context"
import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import type React from "react"
import { useContext } from "react"
import ReactDOM from "react-dom"
import Swal from "sweetalert2"
import { ShoppingCart, Package, X, Shirt, Footprints, Star, Tag } from "lucide-react"
import { EParamsDefault } from "@/enum/main_enum"

const CPostOrderModal = (props: {
  setPostOrderModal: (value: React.SetStateAction<boolean>) => void
  product: TDataGetProducts
}) => {
  const { product, setPostOrderModal } = props
  const userData = useContext(UserDataContext)

  const { payload, setPayload, getV1AddToCart } = useV1AddToCart()


  const handleSave = () => {
    getV1AddToCart(
      product.productid,
      userData?.username!,
      {
        title: product.title,
        category: product.category,
      },
    )
    setPostOrderModal(false)
  }



  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-30"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Order Product
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Configure your order details</p>
                </div>
              </div>
              <button
                onClick={() => setPostOrderModal(false)}
                className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
              >
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Product Info Card */}
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-emerald-100 to-blue-100 p-4 rounded-xl">
                  <Star className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="flex-1 grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Product Name</span>
                    </div>
                    <p className="font-bold text-lg text-gray-800">{product.title}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</span>
                    </div>
                    <p className="font-semibold text-gray-700">{product.category}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide"> (₱) Total amount</span>
                    </div>
                    <input 
                      className="p-1 border-black border-solid border-[1px] rounded-md"
                      value={payload.price}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          price: e.target.value
                        }))
                      }}
                    >
                    
                    </input>
                  </div>
                </div>
              </div>
            </div>

            {/* Default Quantity */}
            {
              product.category !== EParamsDefault.wordCash.toLocaleUpperCase()
              &&
              <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <label className="block mb-4 font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Quantity
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {product.quantity} available
                  </span>
                </label>
                <input
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200 text-lg font-medium"
                  type="number"
                  value={payload.quantity}
                  onChange={(e) => {
                    setPayload((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value)
                    }))
                  }}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            }




       

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold hover:scale-105 transform"
                onClick={() => setPostOrderModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center gap-3 hover:scale-105 transform shadow-lg hover:shadow-xl"
                onClick={handleSave}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CPostOrderModal
