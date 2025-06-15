"use client"

import type { TParamsGetProducts } from "@/schema/main_schema"
import type React from "react"
import { useContext, useState } from "react"
import CPostProductModal from "./cproduct_postproduct"
import { EAdminRoutes } from "@/enum/main_enum"
import Link from "next/link"
import CPostProductExpenseModal from "./cproduct_postexpense"
import { UserDataContext } from "@/hooks/context/main_context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const CProductSearch = (props: {
  initialPayload: Omit<TParamsGetProducts, "skip">
  setInitialPayload: (value: React.SetStateAction<Omit<TParamsGetProducts, "skip">>) => void
  setPayload: (value: React.SetStateAction<Omit<TParamsGetProducts, "skip">>) => void
  getV1GetProduct: () => Promise<void>
}) => {
  const { initialPayload, setInitialPayload, setPayload, getV1GetProduct } = props
  const userData = useContext(UserDataContext)
  const { eaccounttype } = userData!
  const [postModal, setPostModal] = useState<boolean>(false)
  const [expenseModal, setExpenseModal] = useState<boolean>(false)

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Category</label>
              <Select
                value={initialPayload.searchType || ""}
                onValueChange={(value) => {
                  setInitialPayload((prev) => ({
                    ...prev,
                    searchType: value as "category" | "productid" | "searchtag" | "title",
                    searchText: undefined,
                  }))
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select search category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="productid">Product ID</SelectItem>
                  <SelectItem value="title">Product name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Term</label>
              {initialPayload.searchType === "category" ? (
                <Select
                  value={initialPayload.searchText || ""}
                  onValueChange={(value) => {
                    setInitialPayload((prev) => ({
                      ...prev,
                      searchText: value,
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="watches">Watches</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={initialPayload.searchType === "productid" ? "number" : "text"}
                  placeholder="Search products..."
                  value={initialPayload.searchText || ""}
                  onChange={(e) => {
                    if (initialPayload.searchType === "productid" && isNaN(Number(e.target.value))) {
                      alert("Product ID must be a number")
                      return
                    }
                    setInitialPayload((prev) => ({
                      ...prev,
                      searchText: e.target.value,
                    }))
                  }}
                />
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setPayload(initialPayload)
                }}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>

              {["admin", "admin_secretary"].includes(eaccounttype) && (
                <Button
                  onClick={() => {
                    setPostModal(true)
                  }}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              )}

              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href={EAdminRoutes.DASHBOARDPOSTORDER}>
                  <ShoppingCart className="h-4 w-4" />
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {postModal && <CPostProductModal setPostModal={setPostModal} getV1GetProduct={getV1GetProduct} />}
      {expenseModal && <CPostProductExpenseModal setPostExpenseModal={setExpenseModal} />}
    </>
  )
}

export default CProductSearch
