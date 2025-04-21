"use client";
import Marquee from "react-fast-marquee";
import {usePathname} from "next/navigation";

export default function MarqueeComponent() {
    const pathname = usePathname();
    const hiddenOnPaths = ["/pages/login", "/pages/register"];
    const isHidden = hiddenOnPaths.includes(pathname);
    return (
        <Marquee autoFill={true} style={{backgroundColor: "#034292"}}>
            <div className={`${isHidden ? "hidden" : "block"} marquee text-white uppercase font-semibold mx-5 py-2 flex gap-10 max-sm:hidden`}>
                <span>big sale january 2025 - up to 25%</span>
                <span>halo store</span>
            </div>
        </Marquee>
    );
}
