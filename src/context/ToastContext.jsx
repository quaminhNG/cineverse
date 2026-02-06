import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 right-5 z-[200] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              pointer-events-auto
              flex items-center gap-3 px-4 py-3 min-w-[300px]
              backdrop-blur-xl border border-white/10 shadow-2xl rounded-lg
              animate-slide-in-right transition-all duration-300
              ${toast.type === "success" ? "bg-green-500/10 border-green-500/50" : ""}
              ${toast.type === "error" ? "bg-red-500/10 border-red-500/50" : ""}
              ${toast.type === "info" ? "bg-blue-500/10 border-blue-500/50" : ""}
            `}
                    >
                        <div
                            className={`
              p-1 rounded-full 
              ${toast.type === "success" ? "bg-green-500 text-black" : ""}
              ${toast.type === "error" ? "bg-red-500 text-white" : ""}
              ${toast.type === "info" ? "bg-blue-500 text-white" : ""}
            `}
                        >
                            {toast.type === "success" && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            )}
                            {toast.type === "error" && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            {toast.type === "info" && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1">
                            <p className={`font-semibold text-sm ${toast.type === 'success' ? 'text-green-200' : toast.type === 'error' ? 'text-red-200' : 'text-blue-200'}`}>
                                {toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : "Info"}
                            </p>
                            <p className="text-xs text-gray-300">{toast.message}</p>
                        </div>

                        <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
