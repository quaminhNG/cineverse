import { useState } from "react";

const Input = ({ title, label, type = "text", placeholder, value, error, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative mb-6 group">
            {title && <h1 className="text-white text-lg font-bold">{title}</h1>}
            <input
                type={type}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                     w-full px-8 py-3 h-12
      bg-[#222]
      text-white font-medium
      border ${error ? "border-red-500" : "border-white/20"}
      outline-none
      transition-all duration-500 ease-out
      group-hover:bg-[#2a2a2a]
      focus:bg-[#333]
      focus:border-b-0 ${error ? "focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.35)]" : "focus:border-cineverse-cyan focus:shadow-[0_0_12px_rgba(143,239,255,0.35)]"}
                `}
                {...props}
            />
            <span
                className={`
      pointer-events-none
      absolute left-0 bottom-0
      h-[2px] w-full
      ${error ? "bg-red-500" : "bg-cineverse-gradient-2"}
      scale-x-0
      origin-left
      transition-all duration-500 ease-in-out
      group-focus-within:scale-x-100
    `}
            />

            <label
                className={`
                    absolute left-4 
                    transition-all duration-300 ease-out pointer-events-none 
                    ${error ? "text-red-400" : "text-gray-400"}
                    ${(isFocused || (value && value.toString().length > 0))
                        ? `-top-3 text-xs bg-[#222] px-1 font-bold ${error ? "text-red-500" : "text-cineverse-cyan"}`
                        : "top-3 text-base font-normal"}
                `}
            >
                {label}
            </label>
            {error && (
                <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium pl-4 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
