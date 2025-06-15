"use client"

import useV1EditProduct from "@/hooks/api_hooks/usev1editproduct"
import type { TDataGetProducts } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Edit3, DollarSign, Tag, Sparkles, Package, Ruler, Footprints, Save } from "lucide-react"

const CEditProductModal = (props: {
  setEditModal: (value: React.SetStateAction<boolean>) => void
  product: TDataGetProducts
  getV1GetProduct: () => Promise<void>
}) => {
  const { setEditModal, product, getV1GetProduct } = props
  const { getV1EditProduct, payload, setPayload } = useV1EditProduct(product)

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Edit3 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Edit Product</CardTitle>
                <p className="text-purple-100 mt-1">Update product details and inventory</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditModal(false)}
              className="text-white hover:bg-white/20 p-2 rounded-xl"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[calc(90vh-180px)] overflow-y-auto">
          <form className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    Product name
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-blue-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="title"
                    placeholder="Input product name"
                    value={payload.title}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Tag className="h-4 w-4 text-purple-500" />
                    Product category
                  </label>
                  <select
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    value={payload.category}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }}
                  >
                    <option value={undefined}>Select a category</option>
                    <option value="bags">👜 Bags</option>
                    <option value="shoes">👟 Shoes</option>
                    <option value="clothes">👕 Clothes</option>
                    <option value="jewelry">💎 Jewelry</option>
                    <option value="watches">⌚ Watches</option>
                    <option value="others">📦 Others</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₱
                    </span>
                    <input
                      className="w-full p-3 pl-8 border-2 border-gray-200 focus:border-green-400 bg-green-50/30 shadow-sm rounded-lg text-black transition-all duration-200"
                      name="price"
                      placeholder="Input selling price"
                      value={payload.price}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign className="h-4 w-4 text-red-500" />
                    Buying price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₱
                    </span>
                    <input
                      className="w-full p-3 pl-8 border-2 border-gray-200 focus:border-red-400 bg-red-50/30 shadow-sm rounded-lg text-black transition-all duration-200"
                      name="price"
                      placeholder="Input buying price"
                      value={payload.cost}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          cost: e.target.value,
                        }))
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Default Quantity */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-600" />
                Default Quantity
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Default Quantity:{" "}
                  <Badge className="bg-blue-500 text-white">{product.quantitydefault} items left</Badge>
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 focus:border-gray-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                  type="text"
                  value={payload.quantitydefault}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) {
                      Swal.fire({
                        title: "Error",
                        text: "This field must be a number",
                        icon: "error",
                        confirmButtonText: "Try again",
                      })
                      return
                    }
                    setPayload((prev) => ({
                      ...prev,
                      quantitydefault: Number(e.target.value),
                    }))
                  }}
                />
              </div>
            </div>

            {/* Clothing Sizes */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-purple-600" />
                Clothing Sizes Inventory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* XXS */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantityxxs">
                    Current Quantity (XXS):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantityxxs} items left</Badge>
                  </label>
                  <input
                    id="quantityxxs"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantityxxs"
                    type="text"
                    placeholder="Input Quantity of Size XXS"
                    value={payload.quantityxxs}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantityxxs: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* XS */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantityxs">
                    Current Quantity (XS):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantityxs} items left</Badge>
                  </label>
                  <input
                    id="quantityxs"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantityxs"
                    type="text"
                    placeholder="Input Quantity of Size XS"
                    value={payload.quantityxs}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantityxs: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* S */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantitys">
                    Current Quantity (S):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantitys} items left</Badge>
                  </label>
                  <input
                    id="quantitys"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantitys"
                    type="text"
                    placeholder="Input Quantity of Size S"
                    value={payload.quantittys}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantittys: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* M */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantitym">
                    Current Quantity (M):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantitym} items left</Badge>
                  </label>
                  <input
                    id="quantitym"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantitym"
                    type="text"
                    placeholder="Input Quantity of Size M"
                    value={payload.quantitym}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantitym: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* L */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantityl">
                    Current Quantity (L):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantityl} items left</Badge>
                  </label>
                  <input
                    id="quantityl"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantityl"
                    type="text"
                    placeholder="Input Quantity of Size L"
                    value={payload.quantityl}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantityl: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* XL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="quantityxl">
                    Current Quantity (XL):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantityxl} items left</Badge>
                  </label>
                  <input
                    id="quantityxl"
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    name="quantityxl"
                    type="text"
                    placeholder="Input Quantity of Size XL"
                    value={payload.quantityxl}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantityxl: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* XXL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (XXL):{" "}
                    <Badge className="bg-purple-500 text-white">{product.quantityxxl} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-purple-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    placeholder="Input Quantity of Size XXL"
                    value={payload.quantityxxl}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantityxxl: Number(e.target.value),
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Shoe Sizes */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Footprints className="h-5 w-5 text-orange-600" />
                Shoe Sizes Inventory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Size 5.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (5.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity5} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    placeholder="Input Quantity of Size 5.0"
                    value={payload.quantity5}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity5: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 5.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (5.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity55} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    placeholder="Input Quantity of Size 5.5"
                    value={payload.quantity55}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity55: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 6.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (6.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity6} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity6}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity6: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 6.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (6.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity65} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity65}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity65: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 7.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (7.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity7} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity7}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity7: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 7.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (7.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity75} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity75}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity75: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 8.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (8.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity8} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity8}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity8: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 8.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (8.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity85} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity85}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity85: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 9.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (9.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity9} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity9}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity9: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 9.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (9.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity95} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity95}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity95: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 10.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (10.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity100} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity100}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity100: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 10.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (10.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity105} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity105}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity105: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 11.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (11.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity110} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantitty110}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantitty110: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 11.5 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (11.5):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity115} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity115}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity115: Number(e.target.value),
                      }))
                    }}
                  />
                </div>

                {/* Size 12.0 */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Quantity (12.0):{" "}
                    <Badge className="bg-orange-500 text-white">{product.quantity120} items left</Badge>
                  </label>
                  <input
                    className="w-full p-3 border-2 border-gray-200 focus:border-orange-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                    type="text"
                    value={payload.quantity120}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        Swal.fire({
                          title: "Error",
                          text: "This field must be a number",
                          icon: "error",
                          confirmButtonText: "Try again",
                        })
                        return
                      }
                      setPayload((prev) => ({
                        ...prev,
                        quantity120: Number(e.target.value),
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-200 border-2 border-gray-300 hover:border-gray-400"
            onClick={() => {
              setEditModal(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            onClick={() => {
              getV1EditProduct({
                productid: product.productid,
                callBackFunction: getV1GetProduct,
              })
            }}
          >
            <Save className="h-5 w-5" />
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CEditProductModal
