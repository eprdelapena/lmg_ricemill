"use client"

import useV1AddToCart from "@/hooks/api_hooks/usev1addtocart"
import { UserDataContext } from "@/hooks/context/main_context"
import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import type React from "react"
import { useContext } from "react"
import ReactDOM from "react-dom"
import Swal from "sweetalert2"
import { ShoppingCart, Package, X, Shirt, Footprints, Star, Tag } from "lucide-react"

const CPostOrderModal = (props: {
  setPostOrderModal: (value: React.SetStateAction<boolean>) => void
  product: TDataGetProducts
}) => {
  const { product, setPostOrderModal } = props
  const userData = useContext(UserDataContext)
  const { username } = userData as TUserSession
  const { payload, setPayload, getV1AddToCart } = useV1AddToCart()

  const validateNumberInput = (value: string, maxQuantity?: number) => {
    if (isNaN(Number(value))) {
      Swal.fire({
        title: "Error",
        text: "This field must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      })
      return false
    }
    return true
  }

  const handleQuantityChange = (field: string, value: string) => {
    if (validateNumberInput(value)) {
      setPayload((prev) => ({
        ...prev,
        [field]: Number(value),
      }))
    }
  }

  const handleSave = () => {
    const quantityTotal =
      Number(payload.quantitydefault) +
      Number(payload.quantityxxs) +
      Number(payload.quantityxs) +
      Number(payload.quantittys) +
      Number(payload.quantitym) +
      Number(payload.quantityl) +
      Number(payload.quantityxl) +
      Number(payload.quantityxxl) +
      Number(payload.quantity5) +
      Number(payload.quantity55) +
      Number(payload.quantity6) +
      Number(payload.quantity65) +
      Number(payload.quantity7) +
      Number(payload.quantity75) +
      Number(payload.quantity8) +
      Number(payload.quantity85) +
      Number(payload.quantity9) +
      Number(payload.quantity95) +
      Number(payload.quantity100) +
      Number(payload.quantity105) +
      Number(payload.quantitty110) +
      Number(payload.quantity115) +
      Number(payload.quantity120)

    getV1AddToCart(
      {
        price: (Number(product.price) * quantityTotal).toLocaleString().replace(",", ""),
        productId: product.productid,
      },
      userData?.username!,
      {
        title: product.title,
        category: product.category,
      },
    )
    setPostOrderModal(false)
  }

  // Group sizes for better organization
  const clothingSizes = [
    { label: "XXS", value: payload.quantityxxs, field: "quantityxxs", current: product.quantityxxs },
    { label: "XS", value: payload.quantityxs, field: "quantityxs", current: product.quantityxs },
    { label: "S", value: payload.quantittys, field: "quantittys", current: product.quantitys },
    { label: "M", value: payload.quantitym, field: "quantitym", current: product.quantitym },
    { label: "L", value: payload.quantityl, field: "quantityl", current: product.quantityl },
    { label: "XL", value: payload.quantityxl, field: "quantityxl", current: product.quantityxl },
    { label: "XXL", value: payload.quantityxxl, field: "quantityxxl", current: product.quantityxxl },
  ]

  const shoeSizes = [
    { label: "5.0", value: payload.quantity5, field: "quantity5", current: product.quantity5 },
    { label: "5.5", value: payload.quantity55, field: "quantity55", current: product.quantity55 },
    { label: "6.0", value: payload.quantity6, field: "quantity6", current: product.quantity6 },
    { label: "6.5", value: payload.quantity65, field: "quantity65", current: product.quantity65 },
    { label: "7.0", value: payload.quantity7, field: "quantity7", current: product.quantity7 },
    { label: "7.5", value: payload.quantity75, field: "quantity75", current: product.quantity75 },
    { label: "8.0", value: payload.quantity8, field: "quantity8", current: product.quantity8 },
    { label: "8.5", value: payload.quantity85, field: "quantity85", current: product.quantity85 },
    { label: "9.0", value: payload.quantity9, field: "quantity9", current: product.quantity9 },
    { label: "9.5", value: payload.quantity95, field: "quantity95", current: product.quantity95 },
    { label: "10.0", value: payload.quantity100, field: "quantity100", current: product.quantity100 },
    { label: "10.5", value: payload.quantity105, field: "quantity105", current: product.quantity105 },
    { label: "11.0", value: payload.quantitty110, field: "quantitty110", current: product.quantity110 },
    { label: "11.5", value: payload.quantity115, field: "quantity115", current: product.quantity115 },
    { label: "12.0", value: payload.quantity120, field: "quantity120", current: product.quantity120 },
  ]

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
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Price</span>
                    </div>
                    <p className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                    ₱{product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Default Quantity */}
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <label className="block mb-4 font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Default Quantity
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {product.quantitydefault} available
                  </span>
                </label>
                <input
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-200 text-lg font-medium"
                  type="text"
                  value={payload.quantitydefault}
                  onChange={(e) => handleQuantityChange("quantitydefault", e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            {/* Clothing Sizes */}
            {clothingSizes.length > 0 && (
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-lg">
                      <Shirt className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Clothing Sizes</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {clothingSizes.map((size) => (
                      <div key={size.field} className="group">
                        <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center justify-between">
                          <span className="bg-gray-100 px-2 py-1 rounded-lg font-bold">{size.label}</span>
                          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                            {size.current} left
                          </span>
                        </label>
                        <input
                          className="w-full p-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all duration-200 group-hover:border-pink-300"
                          type="text"
                          value={size.value}
                          onChange={(e) => handleQuantityChange(size.field, e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shoe Sizes */}
            {shoeSizes.length > 0 && (
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg">
                      <Footprints className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Shoe Sizes</h4>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
                    {shoeSizes.map((size) => (
                      <div key={size.field} className="group">
                        <label className="block mb-2 text-xs font-medium text-gray-700 text-center">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-lg font-bold text-sm">
                            {size.label}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">{size.current} left</div>
                        </label>
                        <input
                          className="w-full p-2 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all duration-200 group-hover:border-amber-300 text-center text-sm"
                          type="text"
                          value={size.value}
                          onChange={(e) => handleQuantityChange(size.field, e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
