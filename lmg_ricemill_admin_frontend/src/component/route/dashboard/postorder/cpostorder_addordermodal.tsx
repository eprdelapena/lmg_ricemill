"use client"
import useV1PostOrderUser from "@/hooks/api_hooks/usev1postorderuser"
import type { TParamsPostOrders } from "@/schema/main_schema"
import type React from "react"
import ReactDOM from "react-dom"
import Swal from "sweetalert2"

const CPostOrderAddOrderModal = (props: {
  setPostOrderModal: (value: React.SetStateAction<boolean>) => void
  currentCart: (TParamsPostOrders & {
    title: string
    category: string
  })[]
  userId: string
}) => {
  const { setPostOrderModal, currentCart, userId } = props
  const { payload, setPayload, getV1PostOrderUser, philippineRegions, regionProvinceMap, provinceAndCities } =
    useV1PostOrderUser()

  const calculateTotalPrice = () => {
    return currentCart.reduce((acc, item) => {
      return acc + Number(item.price.replace(",", ""))
    }, 0)
  }

  const inputClass =
    "w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none shadow-sm"
  const selectClass =
    "w-full p-3 rounded-lg text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white shadow-sm"

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative flex flex-col max-h-[90vh]">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl sticky top-0 z-10">
          <h3 className="text-2xl font-bold">Generate Order ID</h3>
          <p className="text-blue-100 mt-1">Complete the form to create a new order</p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  className={inputClass}
                  value={payload?.username || ""}
                  placeholder="Input username..."
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.includes(" ")) {
                      Swal.fire({
                        title: "Error",
                        text: "Username must not contain spaces",
                        icon: "error",
                        confirmButtonText: "Try again",
                      })
                      return
                    }
                    setPayload((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  className={inputClass}
                  value={payload?.receivermobile || ""}
                  placeholder="Input mobile number..."
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPayload((prev) => ({
                      ...prev,
                      receivermobile: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  className={inputClass}
                  value={payload?.receiverfirstname || ""}
                  placeholder="Input first name..."
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPayload((prev) => ({
                      ...prev,
                      receiverfirstname: e.target.value,
                    }))
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  className={inputClass}
                  value={payload?.receiverlastname || ""}
                  placeholder="Input last name..."
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPayload((prev) => ({
                      ...prev,
                      receiverlastname: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 my-6 pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-800">Shipping Information</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select
                    className={selectClass}
                    value={payload?.region || ""}
                    onInput={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        region: e.target.value,
                      }))
                    }}
                  >
                    <option value="">Select a region...</option>
                    {philippineRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {payload.region && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province / City</label>
                    <select
                      className={selectClass}
                      value={payload?.province || ""}
                      onInput={(e: any) => {
                        setPayload((prev) => ({
                          ...prev,
                          municity: e.target.value,
                          province: e.target.value,
                        }))
                      }}
                    >
                      <option value={undefined}>Select a city or province</option>
                      <option value={undefined} disabled>
                        Select a province
                      </option>
                      {(regionProvinceMap as any)[payload.region].map((city: any) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {payload.province && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Municipality</label>
                    <select
                      className={selectClass}
                      value={payload?.municity || ""}
                      onInput={(e: any) => {
                        setPayload((prev) => ({
                          ...prev,
                          municity: e.target.value,
                        }))
                      }}
                    >
                      <option value={undefined}>Select a city or municipality</option>
                      {(provinceAndCities as any)[payload?.province || ""].map((city: any) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                  <input
                    className={inputClass}
                    value={payload?.barangay || ""}
                    placeholder="Input barangay..."
                    onInput={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        barangay: e.target.value,
                      }))
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <input
                  className={inputClass}
                  value={payload?.address || ""}
                  placeholder="Input full address..."
                  onInput={(e: any) => {
                    setPayload((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 my-6 pt-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-800">Order Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin Site</label>
                  <select
                    className={selectClass}
                    value={payload?.originsite || ""}
                    onInput={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        originsite: e.target.value,
                      }))
                    }}
                  >
                    <option value={undefined}>Select origin site...</option>
                    {["shoppee", "facebook"].map((site: any) => (
                      <option key={site} value={site}>
                        {site.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                  <select
                    className={selectClass}
                    value={payload?.type || ""}
                    onInput={(e: any) => {
                      setPayload((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }}
                  >
                    <option value={"on_hand_layaway"}>In hand layaway</option>
                    <option value={"in_transit_layaway"}>Preorder layaway</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₱</span>
                    </div>
                    <input
                      className={`${inputClass} pl-8`}
                      value={payload?.downpayment || ""}
                      placeholder="Input downpayment..."
                      onInput={(e: any) => {
                        setPayload((prev) => ({
                          ...prev,
                          downpayment: e.target.value,
                        }))
                      }}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Order Amount</label>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100 flex items-center justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-bold text-green-600">₱ {calculateTotalPrice().toLocaleString()}</span>
                  </div>
                  <input id="totalPrice" type="hidden" value={calculateTotalPrice()} />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="bg-gray-50 p-6 flex justify-end space-x-3 border-t border-gray-100 rounded-b-2xl sticky bottom-0 z-10">
          <button
            type="button"
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm"
            onClick={() => {
              setPostOrderModal(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md"
            onClick={() => {
              getV1PostOrderUser({
                currentCart,
                userId,
                totalprice: `${calculateTotalPrice()}`,
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
