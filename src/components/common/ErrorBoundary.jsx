import { Component } from "react";

/**
 * ErrorBoundary - Bắt lỗi runtime trong React component tree
 * Ngăn chặn tình trạng "trắng trang" khi 1 component bị crash
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // TODO: Gửi lỗi lên Sentry/LogRocket khi tích hợp
        console.error("[ErrorBoundary]", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-6">
                            <p className="text-red-400 text-xs font-mono break-all">
                                {this.state.error?.toString()}
                            </p>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">
                            An unexpected error occurred. Please try reloading the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-cineverse-cyan text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
