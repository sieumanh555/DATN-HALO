import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Check, ChevronUp, Minus, Plus, Trash2} from "lucide-react";

import {decreaseQuantity, increaseQuantity, updateVariant, removeItem} from "@/redux/slices/cartSlice";
import {addItemCheckout, removeItemCheckout} from "@/redux/slices/checkoutSlice";
import {ProductCart} from "../../models/Product";
import {CheckoutState} from "@/app/models/CartState";

export default function ProBox({data}: { data: ProductCart }) {
    const dispatch = useDispatch();
    const checkout = useSelector((state: CheckoutState) => state.checkout.products || []);
    const [selectedSize, setSelectedSize] = useState(data.selectedSize || "Chọn size");
    const [selectedColor, setSelectedColor] = useState(data.selectedColor || "Mặc định");
    const [colorDropdown, setColorDropdown] = useState(false);
    const [sizeDropdown, setSizeDropdown] = useState(false);
    const [checked, setChecked] = useState(false);
    const currentVariant = data.variants.find((variant) => variant.size === selectedSize && variant.color === selectedColor);
    const productStock = currentVariant?.stock;

    const handleDecrease = (product: ProductCart) => {
        if (product.quantityy === 1) {
            const text = `Xóa sản phẩm ${product.name}`;
            if (confirm(text) === true) {
                alert("Xóa thành công");
                dispatch(removeItem({id: product._id, selectedSize, selectedColor}));
            } else {
                console.log(
                    ".-- .... -.-- / -.. .. -.. / -.-- --- ..- / -.. --- / - .... .. ... / - --- / -- . . . . . . . . . / ..--.."
                );
            }
        } else {
            dispatch(decreaseQuantity({id: product._id, selectedSize, selectedColor}));
        }
    };

    const handleSizeSelected = (size: string) => {
        dispatch(updateVariant({
            id: data._id,
            oldSize: selectedSize,
            oldColor: selectedColor,
            newSize: size,
            newColor: selectedColor
        }));
        setSelectedSize(size);

        // Auto chọn màu mới nếu size đó không còn màu hiện tại
        const matchedColors = data.variants.filter(variant => variant.size === size);
        if (!matchedColors.some((v) => v.color === selectedColor)) {
            setSelectedColor(matchedColors[0]?.color || "Mặc định");

            dispatch(updateVariant({
                id: data._id,
                oldSize: size,
                oldColor: selectedColor,
                newSize: size,
                newColor: matchedColors[0]?.color || "Mặc định"
            }));
        }

        setSizeDropdown(false);
    }

    const handleColorSelected = (color: string) => {
        dispatch(updateVariant({
            id: data._id,
            oldSize: selectedSize,
            oldColor: selectedColor,
            newSize: selectedSize,
            newColor: color
        }));
        setSelectedColor(color);
        setColorDropdown(false);
    }

    const handleCheckout = (data: ProductCart) => {
        setChecked(!checked);
        const existedItems = checkout.filter(
            (item) =>
                item._id === data._id &&
                item.selectedSize === data.selectedSize &&
                item.selectedColor === data.selectedColor
        );
        if (existedItems.length !== 0) {
            dispatch(removeItemCheckout({id: data._id, selectedSize,selectedColor}));
        } else {
            dispatch(addItemCheckout({...data}))
        }
    }

    const changeBgColor = (color: string) => {
        switch (color) {
            case "Đỏ":
                return "#ff0000"
            case "Xanh":
                return "#add8e6";
            case "Trắng":
                return "#ffffff";
            case "Xám":
                return "#808080";
            default: {
                return "#ffffff";
            }
        }
    }

    return (
        <div className="w-full bg-white opacity-100 rounded-lg mt-[18px] p-[20px] flex justify-between">
            <button
                onClick={() => handleCheckout(data)}
                className={`w-6 h-6 ${checked ? 'bg-blue-600 text-white' : 'bg-white'} mt-12 p-1 border rounded flex items-center`}>
                {checked ? (
                    <Check strokeWidth={4}/>
                ) : (
                    <Check className={`opacity-0`}/>
                )}
            </button>
            <div className="w-[52%] flex items-center gap-2">
                <div className={`h-[120px] flex items-center`}>
                    <Image
                        src={data.hinhanh}
                        alt={`${data.name}`}
                        width={120}
                        height={120}
                        className={`rounded`}
                    />
                </div>
                <div className="relative w-[68%] flex flex-col space-y-2">
                    <div className="font-semibold">{data.name}</div>
                    <div className="flex items-center gap-2">
                        <div>Chọn size:</div>
                        <div className="relative w-[70px]">
                            <button
                                onClick={() => setSizeDropdown(!sizeDropdown)}
                                className="w-full px-2 py-1 border border-gray-200 rounded flex items-center justify-between gap-2 bg-white hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className={`text-sm text-gray-700`}>{selectedSize}</div>
                                <ChevronUp
                                    className={`w-4 h-4 transition-transform duration-300 ${sizeDropdown ? `-rotate-180` : `rotate-0`} `}/>
                            </button>
                            {sizeDropdown && (
                                <div
                                    className="absolute w-full mt-1 right-0 z-50 bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                                    {[...new Map(data.variants.map(variant => [variant.size, variant])).values()]
                                        .filter((variant) => variant.size != selectedSize)
                                        .map((variant) => (
                                            <button
                                                key={variant._id}
                                                onClick={() => handleSizeSelected(variant.size)}
                                                className="w-full text-left px-2 bg-white hover:bg-gray-100"
                                            >
                                                {variant.size}
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-gray-700">Chọn màu:</div>
                        <div className="relative w-[100px]">
                            <button
                                onClick={() => setColorDropdown(!colorDropdown)}
                                className="w-full px-2 py-1 border border-gray-200 rounded flex items-center justify-between gap-2 bg-white hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div
                                    style={{backgroundColor: changeBgColor(selectedColor)}}
                                    className={`w-4 h-4 border rounded-sm`}></div>
                                <span className="text-sm">{selectedColor}</span>
                                <ChevronUp
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                        colorDropdown ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </button>

                            {colorDropdown && (
                                <div
                                    className="absolute w-full mt-1 right-0 z-50 bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                                    {data.variants
                                        .filter((variant) => variant.size === selectedSize && variant.color !== selectedColor)
                                        .map((variant) => (
                                            <button
                                                key={variant._id}
                                                onClick={() => handleColorSelected(variant.color)}
                                                className="w-full px-2 py-1.5 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
                                            >
                                                <div
                                                    style={{backgroundColor: changeBgColor(variant.color)}}
                                                    className={`w-4 h-4 border rounded-sm`}></div>
                                                <span className="text-sm text-gray-700">{variant.color}</span>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`w-full flex items-center gap-4`}>
                        <Link
                            href={`/pages/product-detail/${data._id}`}
                            className="opacity-60 hover:underline hover:text-[#0037B3]"
                        >
                            <div>Xem chi tiết sản phẩm</div>
                        </Link>
                        <p>|</p>
                        <button
                            onClick={() => dispatch(removeItem({
                                id: data._id,
                                selectedSize: selectedSize,
                                selectedColor: selectedColor
                            }))}
                            title={`Xóa sản phẩm ${data.name} ?`}
                            className={`cursor-pointer text-gray-600 hover:text-[#D92D20]`}
                        >
                            <Trash2 className={`w-6 h-6 `}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[14%] h-[24px] flex">
                <button
                    onClick={() => handleDecrease(data)}
                    className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
                >
                    <Minus className={`w-5`}/>
                </button>
                <div className="inputNumber w-[50%]">
                    <input
                        type="number"
                        id="quantity"
                        value={data.quantityy}
                        readOnly
                        className="w-full text-center focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => dispatch(increaseQuantity({
                        id: data._id,
                        selectedSize,
                        selectedColor,
                        stock: productStock
                    }))}
                    className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
                >
                    <Plus className={`w-5`}/>
                </button>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{data.pricePromo.toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{(data.pricePromo * data.quantityy).toLocaleString("vi-VN")}đ</p>
            </div>
        </div>
    );
}
