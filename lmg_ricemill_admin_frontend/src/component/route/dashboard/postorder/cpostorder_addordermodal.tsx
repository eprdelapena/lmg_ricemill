"use client"
import useV1PostOrderUser from "@/hooks/api_hooks/usev1postorderuser"
import type { TParamsPostOrders } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"

const CPostOrderAddOrderModal = (props: {
  setPostOrderModal: (value: React.SetStateAction<boolean>) => void
  currentCart: (TParamsPostOrders & {
    title: string
    category: string
  })[]
  userId: string
}) => {
  const { setPostOrderModal, currentCart, userId } = props
  const { payload, setPayload, getV1PostOrderUser } = useV1PostOrderUser()

  const calculateTotalPrice = () => {
    return currentCart.reduce((acc, item) => {
      return acc + Number(item.price.replace(",", ""))
    }, 0)
  }

  const inputClass =
    "w-full p-4 rounded-xl text-gray-800 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm bg-gradient-to-r from-white to-gray-50 hover:border-purple-300"
  const textareaClass =
    "w-full p-4 rounded-xl text-gray-800 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm bg-gradient-to-r from-white to-gray-50 hover:border-purple-300 resize-none"

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[95vh] border border-gray-100">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 p-8 text-white rounded-t-3xl sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Generate Order ID</h3>
              <p className="text-purple-100 mt-1 text-lg">Complete the customer information to create a new order</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-grow bg-gradient-to-br from-gray-50 to-white">
          <form className="space-y-8">
            {/* Customer Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Customer Information</h4>
                  <p className="text-gray-600">Enter the customer's personal details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={payload?.fullname || ""}
                    placeholder="Enter customer's full name..."
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPayload((prev) => ({
                        ...prev,
                        fullname: e.target.value,
                      }))
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Spouse Name</label>
                  <input
                    className={inputClass}
                    value={payload?.spouse || ""}
                    placeholder="Enter spouse's name (optional)..."
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPayload((prev) => ({
                        ...prev,
                        spouse: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    className={`${inputClass} pl-12`}
                    value={payload?.mobile || ""}
                    placeholder="Enter mobile number..."
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPayload((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <textarea
                    className={`${textareaClass} pl-12 min-h-[100px]`}
                    value={payload?.address || ""}
                    placeholder="Enter complete address..."
                    onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setPayload((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Order Details</h4>
                  <p className="text-gray-600">Specify order information and payment details</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Order Description</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <textarea
                      className={`${textareaClass} pl-12 min-h-[120px]`}
                      value={payload?.description || ""}
                      placeholder="Enter order description, special instructions, or notes..."
                      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setPayload((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Current Payment</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-semibold">₱</span>
                      </div>
                      <input
                        className={`${inputClass} pl-10`}
                        value={payload?.currentpayment || "0.00"}
                        placeholder="0.00"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPayload((prev) => ({
                            ...prev,
                            currentpayment: e.target.value,
                          }))
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Total Order Amount</label>
                    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 p-4 rounded-xl border-2 border-emerald-200 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Total:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          ₱{calculateTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <input id="totalPrice" type="hidden" value={calculateTotalPrice()} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800">Cart Summary</h4>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{currentCart.length}</span>{" "}
                {currentCart.length === 1 ? "item" : "items"} ready for order
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-6 flex justify-end space-x-4 border-t-2 border-gray-100 rounded-b-3xl sticky bottom-0 z-10">
          <button
            type="button"
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            onClick={() => {
              setPostOrderModal(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:via-pink-700 hover:to-rose-600 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => {
              getV1PostOrderUser({
                currentCart,
                userId,
                totalcost: `${calculateTotalPrice()}`,
              })
            }}
          >
            Save Order
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CPostOrderAddOrderModal
