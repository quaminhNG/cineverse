const Skeleton = ({ className, width, height, variant = "rect" }) => {
    const baseClasses = "bg-gray-800 animate-pulse relative overflow-hidden";

    const getVariantClasses = () => {
        switch (variant) {
            case "circle":
                return "rounded-full";
            case "text":
                return "rounded-md";
            case "rect":
            default:
                return "rounded-xl";
        }
    };

    const shimmer = (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    );

    return (
        <div
            className={`${baseClasses} ${getVariantClasses()} ${className || ""}`}
            style={{ width, height }}
        >
            {shimmer}
        </div>
    );
};

export default Skeleton;
