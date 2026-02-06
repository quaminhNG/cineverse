import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-cineverse-cyan/50 to-black bg-[length:200%_auto] animate-shimmer tracking-tighter select-none drop-shadow-[0_0_50px_rgba(34,211,238,0.7)] py-8 px-4 leading-tight"
          style={{ WebkitTextStroke: "1px rgba(174, 248, 255, 0.12)" }}
        >
          CINEVERSE
        </h1>
      </div>
      <AuthForm />
    </div>
  );
};
export default Login;