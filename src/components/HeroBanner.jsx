import heroBannerImg from "../assets/images/hero-banner.png";
const HeroBanner = () => {
  return (
    <div
      className="relative w-full h-[800px] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBannerImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="absolute inset-0 flex items-center px-8 pb-60">
        <div className="w-full md:w-1/2 px-8">
          <div className="flex flex-col gap-6 text-white">

            <img
              src="/src/assets/images/peaky-blinders.png"
              alt="title-films"
              className="w-1/2 cursor-pointer"
            />

            <p className="text-2xl font-bold">Peaky Blinders</p>

            <div className="flex gap-4 text-white/80">
              <span>2023</span>
              <span>18+</span>
            </div>

            <p className="text-white/70">
              A notorious gang in 1919 Birmingham...
            </p>

            <div className="flex items-center gap-6">
              <button
                className="
                px-6 py-3
                rounded-md
                font-semibold
                text-white
                bg-red-600
                backdrop-blur-sm
                shadow-[0_0_20px_rgba(239,68,68,0.6)]
                hover:shadow-[0_0_28px_rgba(239,68,68,0.85)]
                transition-all
                duration-200
              "
              >
                JOIN NOW
              </button>


              <button className="
                p-3
                rounded-full
                bg-white/20
                backdrop-blur-md
                text-white
                shadow-lg
                hover:bg-white/30
                hover:scale-110
                transition-all
                duration-200
              ">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>


            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-48">
        <div className="w-full h-full flex justify-start items-center px-8 pb-4">
          <div className="w-full flex justify-start items-center gap-4">
            <div className="flex flex-row w-full overflow-x-auto justify-start px-10 gap-8 no-scrollbar scroll-smooth">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex flex-col min-w-[210px] flex-shrink-0 group cursor-pointer">
                  <div className="relative rounded-lg">
                    <img
                      src="/src/assets/images/hero-banner.png"
                      alt={`Episode ${index + 1}`}
                      className="w-52 h-32 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <button
                        className="
                          p-2
                          rounded-full
                          bg-white/20
                          backdrop-blur-md
                          text-white
                          shadow-lg
                          hover:bg-red-600
                          transition-colors
                          duration-200
                        "
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-white text-sm font-medium">Ep {index + 1}: Peaky Blinders</p>
                    <p className="text-white/60 text-xs">55m</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default HeroBanner;