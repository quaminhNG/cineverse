const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-cineverse-cyan/30 border-t-cineverse-cyan rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-cineverse-gradient rounded-full opacity-20 animate-pulse"></div>
                </div>
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-widest text-transparent bg-clip-text bg-cineverse-gradient animate-pulse">
                CINEVERSE
            </h2>
        </div>
    );
};

export default LoadingScreen;
