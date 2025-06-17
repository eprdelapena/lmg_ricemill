"use client"

import type React from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X, Search, Plus, Tag, List } from "lucide-react"
import useV1PostProductCategory from "@/hooks/api_hooks/use_post_productcategory"
import useV1DeleteProductCategory from "@/hooks/api_hooks/use_delete_productcategory"

const CCategoryModal = (props: {
  categoryList: {id: number, category: string, agentcode: string}[]
  setPostCategoryModal: (value: React.SetStateAction<boolean>) => void
  getProductCategory: () => Promise<void>

}) => {
  const { setPostCategoryModal, categoryList, getProductCategory } = props
  const { category, setCategory, postProductCategory } = useV1PostProductCategory(categoryList, getProductCategory);
  const {deleteProductCategory} = useV1DeleteProductCategory(getProductCategory);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Tag className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold mb-1">Category Management</CardTitle>
                <p className="text-white/80 text-sm">Add new categories and view existing ones</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPostCategoryModal(false)}
              className="text-white hover:bg-white/20 p-3 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Add Category Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-xl">
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Add New Category</h3>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter category name..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-12 border-2 border-gray-200 focus:border-violet-400 bg-white shadow-sm h-14 text-base rounded-xl transition-all duration-200 focus:shadow-lg"
                />
              </div>

              <Button
                onClick={() => {
                  postProductCategory()
                  setCategory("");
                }}
                className="w-full h-14 text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Category
              </Button>
            </div>
          </div>

          {/* Category List Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-xl">
                <List className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Existing Categories
                <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-600">
                  {categoryList.length}
                </Badge>
              </h3>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
              <ScrollArea className="h-80">
                {categoryList.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100/80 hover:bg-gray-100">
                        <TableHead className="font-semibold text-gray-700 py-4">#</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Category Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryList.map((categoryItem, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-white/80 transition-colors duration-150 border-gray-100"
                        >
                          <TableCell className="py-4 text-gray-500 font-medium">{index + 1}</TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-violet-100 rounded-lg">
                                <Tag className="h-4 w-4 text-violet-600" />
                              </div>
                              <span className="font-medium text-gray-800">{categoryItem.category}</span>
                            </div>
                          </TableCell>
                          <TableCell className="">
                            <button 
                              className="flex text-white text-md p-1 cursor-pointer rounded-md bg-red-600 hover:bg-red-800 transition hover:text-white text-black items-center justify-center"
                              onClick={() => {
                                deleteProductCategory(categoryItem.id)
                              }}
                            >
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <div className="p-4 bg-gray-100 rounded-full mb-4">
                      <List className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium mb-2">No categories yet</p>
                    <p className="text-sm text-center">Add your first category to get started</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200 flex justify-end">
          <Button
            variant="outline"
            onClick={() => setPostCategoryModal(false)}
            className="px-8 py-3 h-12 text-base border-2 border-gray-300 hover:border-gray-400 hover:bg-white rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CCategoryModal
