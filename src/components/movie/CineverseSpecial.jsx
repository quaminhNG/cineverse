
import React from 'react';

const CineverseSpecial = () => {
    return (
        <div className="w-full relative my-12 group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cineverse-cyan/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c026d3]/30 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg"
                        alt="Special Background"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                </div>

                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 max-w-4xl">
                    <span className="inline-block py-1 px-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-cineverse-cyan text-[10px] md:text-sm font-bold tracking-wider w-fit mb-3 md:mb-4">
                        CINEVERSE EXCLUSIVE
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 md:mb-4 leading-tight">
                        Experience the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cineverse-cyan to-[#c026d3] animate-pulse">
                            Next Level
                        </span> of Cinema
                    </h1>

                    <p className="text-gray-300 text-xs sm:text-sm md:text-lg mb-6 md:mb-8 max-w-xl leading-relaxed line-clamp-3 md:line-clamp-none">
                        Unlock early access to blockbuster premieres, exclusive behind-the-scenes content, and immersive 4K streaming. Your journey into the multiverse starts here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button className="bg-cineverse-cyan text-black px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] text-center">
                            Join Premium
                        </button>
                        <button className="px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center">
                            Explore Features
                        </button>
                    </div>
                </div>

                <div className="absolute right-0 bottom-0 md:right-10 md:bottom-10 z-20 hidden md:block">
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cineverse-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
                        </div>
                        <div className="text-left">
                            <p className="text-white text-xs font-bold">Just Watched</p>
                            <p className="text-gray-300 text-[10px]">Avengers: Endgame</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CineverseSpecial;
