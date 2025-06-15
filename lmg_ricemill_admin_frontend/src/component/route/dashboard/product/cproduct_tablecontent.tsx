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
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ShoppingCart, QrCode, Eye, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"

const ProductTableContent = (props: {
  product: TDataGetProducts
  getV1DeleteProduct: (payload: {
    productid: number
    callbackFunction?: any
  }) => Promise<void>
  getV1GetProduct: () => Promise<void>
  index: number
}) => {
  const { product, getV1DeleteProduct, getV1GetProduct, index } = props
  const userData = useContext(UserDataContext)

  const [editModal, setEditModal] = useState<boolean>(false)
  const [orderModal, setOrderModal] = useState<boolean>(false)
  const [imageModal, setImageModal] = useState<boolean>(false)
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false)
  const [pendingOrderModal, setPendingOrderModal] = useState<boolean>(false)

  const { eaccounttype } = userData as TUserSession
  const { data: session } = useSession()

  const totalQuantity = [
    "quantitydefault",
    "quantityxxs",
    "quantityxs",
    "quantitys",
    "quantitym",
    "quantityl",
    "quantityxl",
    "quantityxxl",
    "quantity5",
    "quantity55",
    "quantity6",
    "quantity65",
    "quantity7",
    "quantity75",
    "quantity8",
    "quantity85",
    "quantity9",
    "quantity95",
    "quantity100",
    "quantity105",
    "quantity110",
    "quantity115",
    "quantity120",
  ].reduce((sum, key) => {
    return sum + Number((product as any)[key] || 0)
  }, 0)

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { color: "bg-red-500", text: "Out of Stock", icon: Minus }
    if (quantity <= 10) return { color: "bg-orange-500", text: "Low Stock", icon: TrendingDown }
    return { color: "bg-green-500", text: "In Stock", icon: TrendingUp }
  }

  const stockStatus = getStockStatus(totalQuantity)

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
      <TableRow
        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border-b border-gray-100 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
        }`}
      >
        <TableCell className="text-center w-40 py-6">
          <div className="flex justify-center">
            <div className="relative group">
              <img
                className="h-28 w-36 rounded-xl object-cover border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                src={product?.image || "/placeholder.svg?height=112&width=144"}
                alt={product.title}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-all duration-300" />
            </div>
          </div>
        </TableCell>

        <TableCell className="text-center py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPendingOrderModal(true)}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Orders
          </Button>
        </TableCell>

        <TableCell className="text-center py-6">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-mono text-sm px-3 py-1 shadow-md">
            #{product.productid}
          </Badge>
        </TableCell>

        <TableCell className="text-center py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            {new Date(product.regdate).toLocaleDateString()}
          </div>
        </TableCell>

        {eaccounttype !== "admin_viewer" && (
          <TableCell className="text-center w-56 py-6">
            <Button
              variant="ghost"
              onClick={() => {
                const cart = localStorage.getItem(`cartItems_${userData?.username}`)

                if (JSON.parse(cart as string)) {
                  const result = (JSON.parse(cart as string) as { productId: number }[]).some(
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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap px-6 py-2.5 w-full"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Customer Cart
            </Button>
          </TableCell>
        )}

        <TableCell className="text-center font-semibold w-64 py-6">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg px-4 py-3 border border-gray-200 mx-2">
            <div className="truncate text-gray-800 font-medium text-base" title={product.title}>
              {product.title}
            </div>
          </div>
        </TableCell>

        <TableCell className="text-center py-6">
          <Badge className={`capitalize font-medium px-3 py-1 border ${getCategoryColor(product.category)}`}>
            {product.category}
          </Badge>
        </TableCell>

        <TableCell className="text-center py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBarcodeModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </TableCell>

        {["admin", "admin_viewer", "admin_secretary"].includes(eaccounttype) && (
          <>
            <TableCell className="text-center font-bold text-emerald-600 py-6">
              <div className="bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-200">
                ₱{Number(product.price).toLocaleString()}
              </div>
            </TableCell>
            <TableCell className="text-center font-bold text-red-600 py-6">
              <div className="bg-red-50 rounded-lg px-3 py-2 border border-red-200">
                ₱{Number(product.cost).toLocaleString()}
              </div>
            </TableCell>
            <TableCell className="text-center py-6">
              <div className="flex items-center justify-center">
                <Badge
                  className={`${stockStatus.color} text-white font-bold px-3 py-2 shadow-md flex items-center gap-1`}
                >
                  <stockStatus.icon className="h-4 w-4" />
                  {totalQuantity} pcs
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-center py-6">
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800 font-semibold px-3 py-1">
                {Number(product.pendingorders).toLocaleString()}
              </Badge>
            </TableCell>
          </>
        )}

        {!["admin_level_one", "admin_viewer"].includes(eaccounttype) && (
          <TableCell className="text-center py-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditModal(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 p-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TableCell>
        )}

        {!["admin_level_one", "admin_level_two"].includes(eaccounttype) && (
          <TableCell className="text-center py-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (product.pendingorders > 0) {
                  Swal.fire({
                    title: "Error",
                    text: "You cannot delete a product with pending orders",
                    icon: "error",
                    confirmButtonText: "Try again",
                  })
                  return
                }

                const cart = localStorage.getItem(`cartItems_${userData?.username}`)

                if (JSON.parse(cart as string)) {
                  const result = (JSON.parse(cart as string) as { productId: number }[]).filter(
                    (item) => item.productId !== product.id,
                  )
                  localStorage.setItem(`cartItems_${userData?.username}`, JSON.stringify(result))
                }

                getV1DeleteProduct({
                  productid: Number(product.productid),
                  callbackFunction: getV1GetProduct,
                })
              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        )}
      </TableRow>

      {editModal && (
        <CEditProductModal setEditModal={setEditModal} product={product} getV1GetProduct={getV1GetProduct} />
      )}
      {orderModal && <CPostOrderModal setPostOrderModal={setOrderModal} product={product} />}
      {imageModal && <CProductImageModal setImageModal={setImageModal} product={product} />}
      {barcodeModal && <CProductBarcodeModal product={product} setBarcodeModal={setBarcodeModal} session={session} />}
      {pendingOrderModal && <CPendingOrderModal product={product} setPendingOrderModal={setPendingOrderModal} />}
    </>
  )
}

export default ProductTableContent
