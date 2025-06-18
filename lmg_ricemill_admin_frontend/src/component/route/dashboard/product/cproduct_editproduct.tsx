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
import { EParamsDefault } from "@/enum/main_enum"

const CEditProductModal = (props: {
  setEditModal: (value: React.SetStateAction<boolean>) => void
  product: TDataGetProducts
  getV1GetProduct: () => Promise<void>
  categories: {
    id: number;
    category: string;
    agentcode: string;
}[]
}) => {
  const { setEditModal, product, getV1GetProduct, categories } = props
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
                    {
                      categories.map((item, index) => <option value={item.category} key={index}>{item.category}</option>)
                    }

                  </select>
                </div>
              </div>
            </div>


            {/* Default Quantity */}
            {
              payload.category !== EParamsDefault.wordCash.toLocaleUpperCase()
              &&
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-600" />
                Quantity
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Quantity:{" "}
                  <Badge className="bg-blue-500 text-white">{product.quantity} items left</Badge>
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-200 focus:border-gray-400 bg-white shadow-sm rounded-lg text-black transition-all duration-200"
                  type="number"
                  value={payload.quantity}
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
                      quantity: Number(e.target.value),
                    }))
                  }}
                />
              </div>
            </div>
            }

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
