"use client"

import useV1DeleteProduct from "@/hooks/api_hooks/usev1deleteproduct"
import useV1GetProduct from "@/hooks/api_hooks/usev1getproduct"
import type { TParamsGetProducts, TUserSession } from "@/schema/main_schema"
import { useEffect, useState } from "react"
import CProductSearch from "./cproduct_search"
import CProductTableBody from "./cproduct_tablebody"
import { UserDataContext } from "@/hooks/context/main_context"
import Swal from "sweetalert2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ProductTable = (props: { userData: TUserSession }) => {
  const [initialPayload, setInitialPayload] = useState<Omit<TParamsGetProducts, "skip">>({
    searchType: undefined,
    searchText: undefined,
  })
  const { userData } = props

  const totalPages = 9999
  const pageSize = 5

  const { currentPage, setCurrentPage, getV1GetProduct, payload, productList, setPayload } = useV1GetProduct()

  const { getV1DeleteProduct } = useV1DeleteProduct()

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const paginationNumbers = Array.from(
    {
      length: Math.min(pageSize, totalPages - Math.floor((currentPage - 1) / pageSize) * pageSize),
    },
    (_, i) => i + 1 + Math.floor((currentPage - 1) / pageSize) * pageSize,
  )

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: "Loading products please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      try {
        await getV1GetProduct()
      } finally {
        Swal.close()
      }
    }

    fetchData()
  }, [currentPage, payload])

  return (
    <UserDataContext.Provider value={userData}>
      <div className="min-h-screen bg-gray-50/50 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Product Management</CardTitle>
              <p className="text-gray-600">Manage your product inventory and track sales performance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <CProductSearch
                getV1GetProduct={getV1GetProduct}
                initialPayload={initialPayload}
                setInitialPayload={setInitialPayload}
                setPayload={setPayload}
              />

              <div className="rounded-lg border bg-white">
                <CProductTableBody
                  productList={productList}
                  getV1DeleteProduct={getV1DeleteProduct}
                  getV1GetProduct={getV1GetProduct}
                />
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {paginationNumbers.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-9 w-9 p-0"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserDataContext.Provider>
  )
}

export default ProductTable
