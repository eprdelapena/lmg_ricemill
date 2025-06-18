"use client"

import type { TParamsPostOrders, TUserSession } from "@/schema/main_schema"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import CPostOrderAddOrderModal from "./cpostorder_addordermodal"

const CPostOrderTable = (props: { userData: TUserSession }) => {
  const [currentCart, setCurrentCart] = useState<(TParamsPostOrders & { title: string; category: string })[]>([])
  const [addOrderModal, setAddOrderModal] = useState<boolean>(false)
  const { userData } = props

  const getCart = () => {
    const storedFilters = localStorage.getItem(`cartItems_${userData.username}`)
    if (!storedFilters) return
    const parsed = JSON.parse(storedFilters)
    setCurrentCart(parsed)
  }

  const handleDelete = (index: number) => {
    const updatedCart = [...currentCart]
    updatedCart.splice(index, 1)
    setCurrentCart(updatedCart)
    localStorage.setItem(`cartItems_${userData.username}`, JSON.stringify(updatedCart))
  }

  useEffect(() => {
    getCart()
  }, [])

  // Calculate total price
  const getTotalPrice = () => {
    return currentCart.reduce((total, item) => total + Number(item.price), 0)
  }

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl space-y-8 min-h-screen">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Current Cart
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            {currentCart.length > 0 && (
              <div className="flex gap-3 mt-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {currentCart.length} {currentCart.length === 1 ? "Item" : "Items"}
                </span>
                {["admin", "admin_secretary"].includes(userData.eaccounttype) && (
                  <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Total: ₱{getTotalPrice().toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex">
            <button
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center"
              onClick={() => {
                if (currentCart.length === 0) {
                  Swal.fire({
                    title: "Error",
                    text: "Your current cart is empty, please add items first to the cart from the product page",
                    icon: "error",
                    confirmButtonText: "Try again",
                  })
                  return
                }
                setAddOrderModal(true)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Issue Order ID
            </button>
          </div>
        </div>

        {/* CARD GRID CONTAINER */}
        <div className="w-full">
          {currentCart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCart.map((order, index) => {
                const quantityTotal = order.quantity

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-purple-200"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 p-4 flex justify-between items-center">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-lg font-mono font-bold text-xs shadow-lg border border-indigo-300">
                        #{order.productid}
                      </div>
                      <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium border border-emerald-300 shadow-sm">
                        {order.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      <div className="font-medium text-gray-800 text-lg border-b border-gray-100 pb-3">
                        {order.title}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          <span className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 px-3 py-1 rounded-full font-bold text-xs border border-violet-300 shadow-sm">
                            {quantityTotal === 0 ? "--" : `${quantityTotal} pcs`}
                          </span>
                        </div>

                        {["admin", "admin_secretary"].includes(userData.eaccounttype) && (
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg border border-green-300 shadow-sm">
                            <span className="font-bold text-green-700 text-sm">
                              ₱ {Number(order.price).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    {["admin_level_three", "admin", "admin_secretary"].includes(userData.eaccounttype) && (
                      <div className="bg-gray-50 p-4 border-t border-gray-100">
                        <button
                          onClick={async () => {
                            const { isConfirmed } = await Swal.fire({
                              title: "Are you sure?",
                              text: "Do you really want to delete this order?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                              cancelButtonText: "Cancel",
                            })
                            if (!isConfirmed) return
                            handleDelete(index)
                            getCart()
                          }}
                          className="w-full bg-gradient-to-r from-red-100 to-rose-100 text-red-600 hover:from-red-500 hover:to-rose-500 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md border border-red-200 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove from Cart
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-2xl font-semibold">Your cart is empty</p>
                  <p className="text-gray-500">Add items from the product page to get started</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Summary Card */}
        {currentCart.length > 0 && ["admin", "admin_secretary"].includes(userData.eaccounttype) && (
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 text-white rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Cart Summary</h3>
                <p className="text-gray-400 text-sm">
                  {currentCart.length} {currentCart.length === 1 ? "item" : "items"} in cart
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Total Amount</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ₱{getTotalPrice().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {addOrderModal && (
        <CPostOrderAddOrderModal
          setPostOrderModal={setAddOrderModal}
          currentCart={currentCart}
          userId={userData.username}
        />
      )}
    </>
  )
}

export default CPostOrderTable
