import { useState } from "react";

const Input = ({ label, type = "text", placeholder, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className="relative mb-6 group">
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                     w-full px-8 py-3 h-12
      bg-[#222]
      text-white font-medium
      border border-white/20
      outline-none
      transition-all duration-500 ease-out
      group-hover:bg-[#2a2a2a]
      focus:bg-[#333]
      focus:border-b-0 focus:border-cineverse-cyan
      focus:shadow-[0_0_12px_rgba(143,239,255,0.35)]
                `}
                {...props}
            />
            <span
                className={`
      pointer-events-none
      absolute left-0 bottom-0
      h-[1px] w-full
      bg-cineverse-gradient-2
      scale-x-0
      origin-left
      transition-all duration-500 ease-in-out
      group-focus-within:scale-x-100
    `}
            />

            <label
                className={`
                    absolute left-4 
                    transition-all duration-300 ease-out pointer-events-none text-gray-400
                    ${(isFocused || value)
                        ? "-top-3 text-xs bg-[#222] px-1 text-cineverse-cyan font-bold"
                        : "top-3 text-base font-normal"}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
