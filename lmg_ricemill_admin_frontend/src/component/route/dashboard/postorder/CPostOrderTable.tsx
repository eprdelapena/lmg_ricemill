"use client"

import type { TParamsPostOrders, TUserSession } from "@/schema/main_schema"
import React, { useEffect, useState } from "react"
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

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl space-y-6 min-h-screen">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-800 relative">
            Current Cart
            <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
          </h2>
          <div className="flex">
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold flex items-center"
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

        {/* HORIZONTAL SCROLL CONTAINER */}
        <div className="w-full overflow-x-auto whitespace-nowrap rounded-xl shadow-2xl bg-white border border-gray-100">
          <table className="table-auto w-max bg-white rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                {[
                  "Delete",
                  "Product ID",
                  "Product name",
                  "Category",
                  "Total price",
                  "Quantity ordered",
                  "Default quantity",
                  "Quantity Size XXS",
                  "Quantity Size XS",
                  "Quantity Size S",
                  "Quantity Size M",
                  "Quantity Size L",
                  "Quantity Size XL",
                  "Quantity Size XXL",
                  "Quantity Size 5.0",
                  "Quantity 5.5",
                  "Quantity 6.0",
                  "Quantity 6.5",
                  "Quantity 7.0",
                  "Quantity 7.5",
                  "Quantity 8.0",
                  "Quantity 8.5",
                  "Quantity 9.0",
                  "Quantity 9.5",
                  "Quantity 10.0",
                  "Quantity 10.5",
                  "Quantity 11.0",
                  "Quantity 11.5",
                  "Quantity 12.0",
                ].map((heading, i) => (
                  <React.Fragment key={i}>
                    {heading === "Delete" &&
                      ["admin_level_three", "admin", "admin_secretary"].includes(userData.eaccounttype) && (
                        <th
                          key={i}
                          className="py-4 px-6 text-white text-center whitespace-nowrap font-bold text-sm uppercase tracking-wider"
                        >
                          {heading}
                        </th>
                      )}
                    {heading === "Total price" && ["admin", "admin_secretary"].includes(userData.eaccounttype) && (
                      <th
                        key={i}
                        className="py-4 px-6 text-white text-center whitespace-nowrap font-bold text-sm uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    )}
                    {!["Delete", "Total price"].includes(heading) && (
                      <th
                        key={i}
                        className="py-4 px-6 text-white text-center whitespace-nowrap font-bold text-sm uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentCart.length > 0 ? (
                currentCart.map((order, index) => {
                  const quantityTotal =
                    Number(order.quantitydefault) +
                    Number(order.quantityxxs) +
                    Number(order.quantityxs) +
                    Number(order.quantittys) +
                    Number(order.quantitym) +
                    Number(order.quantityl) +
                    Number(order.quantityxl) +
                    Number(order.quantityxxl) +
                    Number(order.quantity5) +
                    Number(order.quantity55) +
                    Number(order.quantity6) +
                    Number(order.quantity65) +
                    Number(order.quantity7) +
                    Number(order.quantity75) +
                    Number(order.quantity8) +
                    Number(order.quantity85) +
                    Number(order.quantity9) +
                    Number(order.quantity95) +
                    Number(order.quantity100) +
                    Number(order.quantity105) +
                    Number(order.quantitty110) +
                    Number(order.quantity115) +
                    Number(order.quantity120)

                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {["admin_level_three", "admin", "admin_secretary"].includes(userData.eaccounttype) && (
                        <td className="py-3 px-6 text-center whitespace-nowrap">
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
                            className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-full font-medium text-sm transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </td>
                      )}

                      <td className="py-3 px-6 text-gray-800 text-center whitespace-nowrap font-medium">
                        {order.productId}
                      </td>
                      <td className="py-3 px-6 text-gray-800 text-center whitespace-nowrap font-medium">
                        {order.title}
                      </td>
                      <td className="py-3 px-6 text-gray-800 text-center whitespace-nowrap">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {order.category}
                        </span>
                      </td>
                      {["admin", "admin_secretary"].includes(userData.eaccounttype) && (
                        <td className="py-3 px-6 text-center whitespace-nowrap">
                          <span className="font-bold text-green-600">₱ {Number(order.price).toLocaleString()}</span>
                        </td>
                      )}

                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold">
                          {quantityTotal} pcs
                        </span>
                      </td>

                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantitydefault) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantitydefault) === 0 ? "--" : Number(order.quantitydefault).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantityxxs) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantityxxs) === 0 ? "--" : Number(order.quantityxxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantityxs) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantityxs) === 0 ? "--" : Number(order.quantityxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantittys) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantittys) === 0 ? "--" : Number(order.quantittys).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantitym) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantitym) === 0 ? "--" : Number(order.quantitym).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantityl) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantityl) === 0 ? "--" : Number(order.quantityl).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantityxl) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantityxl) === 0 ? "--" : Number(order.quantityxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantityxxl) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantityxxl) === 0 ? "--" : Number(order.quantityxxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity5) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity5) === 0 ? "--" : Number(order.quantity5).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity55) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity55) === 0 ? "--" : Number(order.quantity55).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity6) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity6) === 0 ? "--" : Number(order.quantity6).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity65) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity65) === 0 ? "--" : Number(order.quantity65).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity7) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity7) === 0 ? "--" : Number(order.quantity7).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity75) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity75) === 0 ? "--" : Number(order.quantity75).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity8) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity8) === 0 ? "--" : Number(order.quantity8).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity85) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity85) === 0 ? "--" : Number(order.quantity85).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity9) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity9) === 0 ? "--" : Number(order.quantity9).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity95) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity95) === 0 ? "--" : Number(order.quantity95).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity100) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity100) === 0 ? "--" : Number(order.quantity100).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity105) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity105) === 0 ? "--" : Number(order.quantity105).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantitty110) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantitty110) === 0 ? "--" : Number(order.quantitty110).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity115) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity115) === 0 ? "--" : Number(order.quantity115).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-center whitespace-nowrap ${
                          Number(order.quantity120) > 0 ? "text-red-600 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {Number(order.quantity120) === 0 ? "--" : Number(order.quantity120).toLocaleString()}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr className="border-t">
                  <td className="py-12 px-6 text-center whitespace-nowrap" colSpan={100}>
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-300 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-1">Add items from the product page</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
