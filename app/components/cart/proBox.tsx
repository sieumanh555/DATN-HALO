import Link from "next/link";
import Image from "next/image";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Check, ChevronUp, CircleAlert, Minus, Plus, Trash2} from "lucide-react";

import {decreaseQuantity, increaseQuantity, removeItem, updateVariant} from "@/redux/slices/cartSlice";
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
    const [alertPopup, setAlertPopup] = useState(false);


    const currentVariant = data.variants.find((variant) => variant.size === selectedSize && variant.color === selectedColor);
    const productStock = currentVariant?.stock;

    const availableColors = useCallback((selectedColor: string) => {
        return data.variants.filter((item) => item.size === selectedSize && item.color !== selectedColor)
    }, [data.variants, selectedSize])

    useEffect(() => {
        availableColors(selectedColor);
    }, [availableColors, selectedColor]);

    const isChecked = useCallback((data: ProductCart) => {
        const check = checkout.find((item) =>
            item._id === data._id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        )
        setChecked(!!check);
    }, [checkout, selectedSize, selectedColor]);

    useEffect(() => {
        isChecked(data);
    }, [data, isChecked]);

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
        const matchedColors = data.variants.filter(variant => variant.size === size);
        const hasCurrentColor = matchedColors.some((v) => v.color === selectedColor);
        const newColor = hasCurrentColor ? selectedColor : matchedColors[0]?.color || "Mặc định";

        dispatch(updateVariant({
            ...data,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
            newSize: size,
            newColor: newColor
        }));

        setSelectedSize(size);
        setSelectedColor(newColor);
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

    const addToCheckout = (data: ProductCart) => {
        setChecked(!checked);
        const existedItems = checkout.filter(
            (item) =>
                item._id === data._id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
        );
        if (existedItems.length > 0) {
            dispatch(removeItemCheckout({id: data._id, selectedSize, selectedColor, quantitty: data.quantityy}));
        } else {
            dispatch(addItemCheckout({...data}))
        }
    }

    const changeBgColor = (color: string) => {
        switch (color) {
            case "red":
                return "#ff0000"
            case "blue":
                return "#add8e6";
            case "white":
                return "#ffffff";
            case "black":
                return "000000";
            case "gray":
                return "#808080";
            default: {
                return "#ffffff";
            }
        }
    }

    const handleAction = (a: string) => {
        if (checked) {
            setAlertPopup(true);
        } else {
            switch (a) {
                case "plus": {
                    dispatch(increaseQuantity({
                        id: data._id,
                        selectedSize,
                        selectedColor,
                        stock: productStock
                    }))
                    break;
                }
                case "minus": {
                    handleDecrease(data);
                    break;
                }
                case "selectSize": {
                    setSizeDropdown(!sizeDropdown)
                    break;
                }
                case "selectColor": {
                    setColorDropdown(!colorDropdown)
                    break;
                }
                case "delete": {
                    dispatch(removeItem({
                        id: data._id,
                        selectedSize: selectedSize,
                        selectedColor: selectedColor
                    }))
                    break;
                }
                default: {
                    break;
                }

            }
        }
    }

    return (
        <div className="w-full bg-white opacity-100 rounded-lg mt-4 py-5 px-2 flex justify-between">
            <button
                onClick={() => addToCheckout(data)}
                className={`w-5 h-5 ${checked ? 'bg-blue-600 text-white' : 'bg-white'} mt-16 p-1 border rounded flex items-center`}>
                {checked ? (
                    <Check strokeWidth={4}/>
                ) : (
                    <Check className={`opacity-0`}/>
                )}
            </button>
            <div className="w-[52%] flex items-center gap-2">
                <div className={`h-[120px] flex items-center`}>
                    <Image
                        src={`${currentVariant?.images[0]}`}
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
                                onClick={() => handleAction("selectSize")}
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
                                onClick={() => handleAction("selectColor")}
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
                                                    className={`w-4 h-4 border rounded-sm`}>
                                                </div>
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
                            onClick={() => handleAction("delete")}
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
                    onClick={() => handleAction("minus")}
                    className="w-[25%] flex justify-center items-center rounded"
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
                    onClick={() => handleAction("plus")}
                    className="w-[25%] flex justify-center items-center rounded"
                >
                    <Plus className={`w-5`}/>
                </button>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{(currentVariant ? data.price + currentVariant.price : data.price).toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{((currentVariant ? data.price + currentVariant.price : data.price) * data.quantityy).toLocaleString("vi-VN")}đ</p>
            </div>

            {/*product change popup*/}
            {alertPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div
                        onClick={() => setAlertPopup(false)}
                        className="absolute inset-0"
                    />
                    <div className="relative z-10 w-[90%] max-w-md bg-white rounded-xl px-6 py-8 shadow-lg flex">
                        <CircleAlert size={36}/>
                        <p className="text-center text-base sm:text-lg text-gray-800">
                            Vui lòng bỏ chọn sản phẩm trước khi chỉnh sửa size, màu sắc hoặc xóa sản phẩm.
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}