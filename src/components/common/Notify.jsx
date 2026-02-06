const Notify = ({ isNotifyOpen, setIsNotifyOpen }) => {
    return (
        <div className="absolute top-18 right-20 mt-4 w-80 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-[105] animate-fade-in origin-top-right transform transition-all duration-200">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                    <h3 className="text-white font-bold text-lg">Notifications</h3>
                    <button onClick={() => setIsNotifyOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="flex gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                        <div className="w-2 h-2 mt-2 bg-cineverse-cyan rounded-full flex-shrink-0"></div>
                        <div>
                            <p className="text-sm text-gray-200">New movie "Avatar 3" is now available!</p>
                            <p className="text-xs text-gray-500 mt-1">2 mins ago</p>
                        </div>
                    </div>
                    <div className="flex gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                        <div className="w-2 h-2 mt-2 bg-transparent rounded-full flex-shrink-0"></div>
                        <div>
                            <p className="text-sm text-gray-200">Your subscription expires in 3 days.</p>
                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-xs pt-2">View all notifications</p>
                </div>
            </div>
        </div>
    );
};

export default Notify;