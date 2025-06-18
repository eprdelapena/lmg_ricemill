"use client"

import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import { useContext } from "react"
import ProductTableContent from "./cproduct_tablecontent"
import { UserDataContext } from "@/hooks/context/main_context"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ProductCardContent from "./cproduct_tablecontent"

const ProductTableBody = (props: {
  productList: TDataGetProducts[]
  getV1DeleteProduct: (payload: {
    productid: string;
    callbackFunction?: any;
}) => Promise<void>
categories: {
  id: number;
  category: string;
  agentcode: string;
}[];
  getV1GetProduct: () => Promise<void>
}) => {
  const { productList, categories, getV1DeleteProduct, getV1GetProduct } = props
  const userData = useContext(UserDataContext)
  const { eaccounttype } = userData as TUserSession

  return (
    <div className="p-4">
      {productList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product, index) => (
            <ProductCardContent
              key={product.id}
              categories={categories}
              product={product}
              getV1DeleteProduct={getV1DeleteProduct}
              getV1GetProduct={getV1GetProduct}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-8xl mb-4">📦</div>
          <div className="text-2xl font-semibold text-gray-700 mb-2">No products found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}

export default ProductTableBody
