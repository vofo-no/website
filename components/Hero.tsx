import Image from "next/image";
import demoPic from "./robert-bye-xjQhTrxyVBw-unsplash.jpg";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto my-4 sm:px-4 lg:px-8">
      <div className="bg-crimson-500 h-64 sm:h-80 lg:h-96 relative">
        <Image
          src={demoPic}
          alt="Demo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="z-1 absolute bottom-0 sm:bottom-4 bg-crimson-500 bg-opacity-80 text-white py-4 px-6">
          <div className="text-xl lg:text-2xl font-semibold">
            Læring til levende lokalsamfunn
          </div>
          <div className="mt-2">
            <a href="">Se kursstatistikken for 2021</a>
          </div>
        </div>
      </div>
    </div>
  );
}
