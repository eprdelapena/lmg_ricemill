"use client"
import useV1GenerateBarcode from "@/hooks/api_hooks/usev1generatebarcode"
import { UserDataContext } from "@/hooks/context/main_context"
import type { TDataGetProducts, TUserSession } from "@/schema/main_schema"
import type { Session } from "next-auth"
import type React from "react"
import { useContext, useState } from "react"
import ReactDOM from "react-dom"
import { X, QrCode, Package } from "lucide-react"

const CProductBarcodeModal = (props: {
  product: TDataGetProducts
  setBarcodeModal: React.Dispatch<React.SetStateAction<boolean>>
  session: Session | null
}) => {
  const { product, setBarcodeModal, session } = props

  const userData = useContext(UserDataContext)
  const { username } = userData as TUserSession

  const { APILocalGenerateBarcode, quantity, setQuantity } = useV1GenerateBarcode()

  const [selectedSize, setSelectedSize] = useState<string>("quantitydefault")

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 relative">
          <button
            type="button"
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
            onClick={() => setBarcodeModal(false)}
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <QrCode className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Generate Barcode</h3>
              <p className="text-blue-100 text-sm truncate max-w-xs">{product.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form className="space-y-6">
            {/* Size Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package size={16} />
                Select product size
              </label>
              <select
                className="w-full border-2 border-gray-200 text-gray-700 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="quantitydefault">DEFAULT</option>
                <option value="quantityxxs">Size XXS</option>
                <option value="quantityxs">Size XS</option>
                <option value="quantitys">Size S</option>
                <option value="quantitym">Size M</option>
                <option value="quantityl">Size L</option>
                <option value="quantityxl">Size XL</option>
                <option value="quantityxxl">Size XXL</option>
                <option value="quantity5">Size 5</option>
                <option value="quantity55">Size 5.5</option>
                <option value="quantity6">Size 6</option>
                <option value="quantity65">Size 6.5</option>
                <option value="quantity7">Size 7</option>
                <option value="quantity75">Size 7.5</option>
                <option value="quantity8">Size 8</option>
                <option value="quantity85">Size 8.5</option>
                <option value="quantity9">Size 9</option>
                <option value="quantity95">Size 9.5</option>
                <option value="quantity100">Size 10.0</option>
                <option value="quantity105">Size 10.5</option>
                <option value="quantity110">Size 11.0</option>
                <option value="quantity115">Size 11.5</option>
                <option value="quantity120">Size 12.0</option>
              </select>
            </div>

            {/* Quantity Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <QrCode size={16} />
                Number of QR codes to be generated
              </label>
              <input
                type="number"
                className="w-full border-2 border-gray-200 text-gray-700 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Input number of QR codes to be generated..."
                min="1"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
              onClick={() => {
                setBarcodeModal(false)
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                APILocalGenerateBarcode(selectedSize, product, quantity, session)
                setBarcodeModal(false)
              }}
            >
              Generate QR Code
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default CProductBarcodeModal
