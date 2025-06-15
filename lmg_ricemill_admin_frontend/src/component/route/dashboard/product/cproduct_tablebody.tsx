"use client"

import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import { useContext } from "react"
import ProductTableContent from "./cproduct_tablecontent"
import { UserDataContext } from "@/hooks/context/main_context"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ProductTableBody = (props: {
  productList: TDataGetProducts[]
  getV1DeleteProduct: (payload: {
    productid: number
    callbackFunction?: any
  }) => Promise<void>
  getV1GetProduct: () => Promise<void>
}) => {
  const { productList, getV1DeleteProduct, getV1GetProduct } = props
  const userData = useContext(UserDataContext)
  const { eaccounttype } = userData as TUserSession

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-b-2 border-blue-100">
            <TableHead className="text-center font-bold text-gray-800 w-32 py-4">🖼️ Product Image</TableHead>
            <TableHead className="text-center font-bold text-gray-800 py-4">📋 Pending Orders</TableHead>
            <TableHead className="text-center font-bold text-gray-800 py-4">🔢 Product ID</TableHead>
            <TableHead className="text-center font-bold text-gray-800 py-4">📅 Date Added</TableHead>

            {eaccounttype !== "admin_viewer" && (
              <TableHead className="text-center font-bold text-gray-800 min-w-44 py-4">
                🛒 Add to Customer Cart
              </TableHead>
            )}

            <TableHead className="text-center font-bold text-gray-800 min-w-48 py-4">📝 Product Name</TableHead>
            <TableHead className="text-center font-bold text-gray-800 py-4">📦 Category</TableHead>
            <TableHead className="text-center font-bold text-gray-800 py-4">📊 Barcode</TableHead>

            {["admin", "admin_viewer", "admin_secretary"].includes(eaccounttype) && (
              <>
                <TableHead className="text-center font-bold text-gray-800 py-4">💰 Selling Price</TableHead>
                <TableHead className="text-center font-bold text-gray-800 py-4">💸 Buying Price</TableHead>
                <TableHead className="text-center font-bold text-gray-800 py-4">📊 Remaining Qty</TableHead>
                <TableHead className="text-center font-bold text-gray-800 py-4">⏳ Pending Orders</TableHead>
              </>
            )}

            {!["admin_level_one", "admin_viewer"].includes(eaccounttype) && (
              <TableHead className="text-center font-bold text-gray-800 py-4">✏️ Edit</TableHead>
            )}

            {!["admin_level_one", "admin_level_two"].includes(eaccounttype) && (
              <TableHead className="text-center font-bold text-gray-800 py-4">🗑️ Delete</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.length > 0 ? (
            productList.map((product, index) => (
              <ProductTableContent
                key={product.id}
                product={product}
                getV1DeleteProduct={getV1DeleteProduct}
                getV1GetProduct={getV1GetProduct}
                index={index}
              />
            ))
          ) : (
            <TableRow>
              <td className="py-12 text-center text-gray-500" colSpan={100}>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-6xl">📦</div>
                  <div className="text-xl font-semibold">No products found</div>
                  <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
                </div>
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTableBody
