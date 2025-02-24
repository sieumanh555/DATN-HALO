import Marquee from "react-fast-marquee";

export default function MarqueeComponent() {
  return (
    <Marquee autoFill={true} style={{ backgroundColor: "#034292" }}>
      <div className="marquee text-white uppercase font-semibold mx-5 py-2 flex gap-10 max-sm:hidden">
        <span>big sale january 2025 - up to 25%</span>
        <span>halo store</span>
      </div>
    </Marquee>
  );
}
