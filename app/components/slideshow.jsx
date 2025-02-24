import {useEffect, useState} from "react";
import Image from "next/image";

export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://wallpapershome.com/images/pages/pic_h/27175.jpg",
        "/fashion2.jpg",
        "/fashion3.jpg",
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Automatically cycle through slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
            <div
                id="indicators-carousel"
                className="relative w-[80%] ml-[10%] my-5"
                data-carousel="static"
            >
                <div className="relative overflow-hidden rounded-lg md:h-[680px] shadow-lg">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`${
                                currentIndex === index ? "block" : "hidden"
                            } duration-700 ease-in-out`}
                            data-carousel-item={currentIndex === index ? "active" : ""}
                        >
                            <Image
                                src={src}
                                fill
                                priority={index === 0} // Load ảnh đầu tiên nhanh hơn
                                quality={100} // Chất lượng ảnh cao hơn
                                className="absolute w-full"
                                alt={`Slide ${index + 1}`}
                            />
                            {/* Optional Overlay Text */}
                            <div className="absolute bottom-10 left-10 text-white">
                                <h2 className="text-2xl font-bold">Beautiful Destination</h2>
                                <p className="text-lg">Explore the world with us!</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full transition-colors ${
                                currentIndex === index ? "bg-white" : "bg-gray-500"
                            }`}
                            aria-current={currentIndex === index ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>

                {/* Previous Button */}
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={prevSlide}
                >
          <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
            <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
              <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
                </button>

                {/* Next Button */}
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={nextSlide}
                >
          <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
            <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
              <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
                </button>
            </div>
        </>
    );
}