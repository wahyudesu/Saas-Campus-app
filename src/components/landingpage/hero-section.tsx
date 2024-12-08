import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Tagline or Badge */}
      <div className=" text-blue-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
        LW13: Day 5 - database.build v2 →
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-black leading-tight">
        Serahkan tugas kepada kita <br />
        <span className="text-black">supaya kamu fokus mengajar</span>
      </h1>

      {/* Subtitle/Description */}
      <p className="text-lg md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
        Campus app adalah aplikasi yang memudahkanmu untuk mengecek plagiarisasi,
        detail tugas, akurasi tugas, mudah dan cepat
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <Button
          size="lg"
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3"
          
        >
          Mulai aja dulu
        </Button>
        <Button
          size="lg"
          variant="outline"
          className=""
        >
          Minta uji coba
        </Button>
      </div>

      {/* Footer Section */}
      {/* <div className="mt-16 text-gray-500">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {["supabase", "betashares", "mozilla", "github"].map((logo, index) => (
            <div key={index} className="w-10 h-10 bg-gray-700 rounded-full"></div>
          ))}
        </div>
        <p>Trusted by fast-growing companies worldwide</p>
      </div> */}
    </div>
  );
};
