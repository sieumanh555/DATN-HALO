import {useState} from "react";
import {ChevronUp} from "lucide-react";

export default function DropDownButton() {
    const [dropDown, setDropDown] = useState(false);
    return (
        <button
            onClick={() => setDropDown(!dropDown)}
            className={`transition-transform transform duration-300 ${dropDown ? `-rotate-180` : `rotate-0`}`}>
            <ChevronUp size={26} strokeWidth={1.5}/>
        </button>
    )
}