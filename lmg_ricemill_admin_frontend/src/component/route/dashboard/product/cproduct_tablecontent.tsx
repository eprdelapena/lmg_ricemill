"use client"

import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import { useContext, useState } from "react"
import CEditProductModal from "./cproduct_editproduct"
import CPostOrderModal from "./cproduct_postorder"
import Swal from "sweetalert2"
import { UserDataContext } from "@/hooks/context/main_context"
import CProductImageModal from "./cproduct_imagemodal"
import { useSession } from "next-auth/react"
import CProductBarcodeModal from "./cproduct_generatebarcode"
import CPendingOrderModal from "./cproduct_pendingordermodal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, Trash2, ShoppingCart, Calendar, TrendingUp, TrendingDown, Minus, Package } from "lucide-react"
import { EParamsDefault } from "@/enum/main_enum"

const ProductCardContent = (props: {
  product: TDataGetProducts
  getV1DeleteProduct: (payload: {
    productid: string
    callbackFunction?: any
  }) => Promise<void>
  getV1GetProduct: () => Promise<void>
  categories: {
    id: number
    category: string
    agentcode: string
  }[]
  index: number
}) => {
  const { product, getV1DeleteProduct, getV1GetProduct, index, categories } = props
  const userData = useContext(UserDataContext)

  const [editModal, setEditModal] = useState<boolean>(false)
  const [orderModal, setOrderModal] = useState<boolean>(false)
  const [imageModal, setImageModal] = useState<boolean>(false)
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false)
  const [pendingOrderModal, setPendingOrderModal] = useState<boolean>(false)

  const { eaccounttype } = userData as TUserSession
  const { data: session } = useSession()

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { color: "bg-red-500", text: "Out of Stock", icon: Minus }
    if (quantity <= 10) return { color: "bg-orange-500", text: "Low Stock", icon: TrendingDown }
    return { color: "bg-green-500", text: "In Stock", icon: TrendingUp }
  }

  const stockStatus = getStockStatus(product.quantity)

  const getCategoryColor = (category: string) => {
    const colors = {
      bags: "bg-purple-100 text-purple-800 border-purple-200",
      shoes: "bg-blue-100 text-blue-800 border-blue-200",
      clothes: "bg-green-100 text-green-800 border-green-200",
      jewelry: "bg-yellow-100 text-yellow-800 border-yellow-200",
      watches: "bg-indigo-100 text-indigo-800 border-indigo-200",
      others: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[category as keyof typeof colors] || colors.others
  }

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-mono text-xs px-2 py-1 shadow-md">
              ID: #{product.productid}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
              <Calendar className="h-3 w-3" />
              {new Date(product.regdate).toLocaleDateString()}
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
            <Package className="h-12 w-12 text-gray-400" />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]" title={product.title}>
              {product.title}
            </h3>

            <Badge className={`capitalize font-medium text-xs px-2 py-1 border ${getCategoryColor(product.category)}`}>
              {product.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {/* Admin-specific information */}
          {["admin", "admin_viewer", "admin_secretary"].includes(eaccounttype) && (
            <div className="space-y-2">

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Stock:</span>
                  <Badge
                    className={`${stockStatus.color} text-white font-bold text-xs px-2 py-1 shadow-sm flex items-center gap-1`}
                  >
                    <stockStatus.icon className="h-3 w-3" />
                    {product.category !== EParamsDefault.wordCash.toLocaleUpperCase() ? `${product.quantity} pcs` :  ""}
                  </Badge>
                </div>
    

              {/* Add other admin fields like selling price, buying price if they exist in your schema */}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            {eaccounttype !== "admin_viewer" && (
              <Button
                variant="ghost"
                onClick={() => {
                  const cart = localStorage.getItem(`cartItems_${userData?.username}`)

                  if (JSON.parse(cart as string)) {
                    const result = (JSON.parse(cart as string) as { productId: string }[]).some(
                      (item) => item.productId === product.productid,
                    )
                    if (result) {
                      Swal.fire({
                        title: "Error",
                        text: "This item has already been added to the cart",
                        icon: "error",
                        confirmButtonText: "Try again",
                      })
                      return
                    }
                  }

                  setOrderModal(true)
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full text-xs py-2"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            )}

            <div className="flex gap-2">
              {!["admin_level_one", "admin_viewer"].includes(eaccounttype) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex-1 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              )}

              {!["admin_level_one", "admin_level_two"].includes(eaccounttype) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const cart = localStorage.getItem(`cartItems_${userData?.username}`)

                    if (JSON.parse(cart as string)) {
                      const result = (JSON.parse(cart as string) as { productId: number }[]).filter(
                        (item) => item.productId !== product.id,
                      )
                      localStorage.setItem(`cartItems_${userData?.username}`, JSON.stringify(result))
                    }

                    getV1DeleteProduct({
                      productid: product.productid,
                      callbackFunction: getV1GetProduct,
                    })
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex-1 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals - keeping all existing modal logic */}
      {editModal && (
        <CEditProductModal
          categories={categories}
          setEditModal={setEditModal}
          product={product}
          getV1GetProduct={getV1GetProduct}
        />
      )}
      {orderModal && <CPostOrderModal setPostOrderModal={setOrderModal} product={product} />}
      {imageModal && <CProductImageModal setImageModal={setImageModal} product={product} />}
      {barcodeModal && <CProductBarcodeModal product={product} setBarcodeModal={setBarcodeModal} session={session} />}
      {pendingOrderModal && <CPendingOrderModal product={product} setPendingOrderModal={setPendingOrderModal} />}
    </>
  )
}

export default ProductCardContent
