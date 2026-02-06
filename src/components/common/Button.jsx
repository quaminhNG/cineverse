const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`
        px-6 py-3
        rounded-md
        font-semibold
        text-white
        bg-cineverse-gradient
        backdrop-blur-sm
        shadow-[0_0_20px_rgba(74,107,255,0.6)]
        hover:shadow-[0_0_28px_rgba(74,107,255,0.85)]
        transition-all
        duration-200
        ${className}
      `}
            {...props}
        //tat ca cac props khac se duoc truyen vao button (...props)
        //neu con muon dua cha du lieu, bat buoc cha phai co ham xu ly truyen xuong cho con de con gan du lieu va truyen lai cho cha
        >
            {children}
        </button>
    );
};

export default Button;
