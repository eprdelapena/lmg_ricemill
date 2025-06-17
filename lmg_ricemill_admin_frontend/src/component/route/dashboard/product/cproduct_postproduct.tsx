"use client"

import useV1PostProduct from "@/hooks/api_hooks/usev1postproduct"
import { changeImage } from "@/utils/main_utils"
import type React from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Package, Upload, DollarSign, Tag, ImageIcon, Save, Sparkles } from "lucide-react"

const CPostProductModal = (props: {
  setPostModal: (value: React.SetStateAction<boolean>) => void
  getV1GetProduct: () => Promise<void>
  categoryList: { id: number, category: string, agentcode: string }[]
}) => {
  const { setPostModal, getV1GetProduct, categoryList } = props
  const { getV1PostProduct, payload, setPayload } = useV1PostProduct()

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                <p className="text-blue-100 mt-1">Create a new product for your inventory</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPostModal(false)}
              className="text-white hover:bg-white/20 p-2 rounded-xl"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
          <form className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="h-4 w-4 text-purple-500" />
                Product Category
              </label>
              <Select
                value={payload.category || ""}
                onValueChange={(value) => {
                  setPayload((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }}
              >
                <SelectTrigger className="border-2 w-full border-gray-200 focus:border-blue-400 bg-white shadow-sm h-12">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categoryList.map((item, index) =>
                      <SelectItem value={item.category} key={index}>{item.category}</SelectItem>
                    )
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Product Name
              </label>
              <Input
                placeholder="Enter product name"
                value={payload.title}
                onChange={(e) => {
                  setPayload((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }}
                className="border-2 border-gray-200 focus:border-blue-400 bg-white shadow-sm h-12 text-base"
              />
            </div>


            {/* Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buying Price */}

              {/* Selling Price */}
              <div className="space-y-2 ">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Selling Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₱
                  </span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={payload.price}
                    onChange={(e) => {
                      setPayload((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }}
                    className="border-2 border-gray-200 focus:border-green-400 bg-green-50/30 shadow-sm h-12 text-base pl-8"
                  />
                </div>
              </div>
            </div>


          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setPostModal(false)}
            className="px-6 py-2.5 h-12 text-base border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              getV1PostProduct({ callBackFunction: getV1GetProduct })
              setPostModal(false)
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5 h-12 text-base"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Product
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CPostProductModal
