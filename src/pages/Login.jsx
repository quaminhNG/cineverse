import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-black via-cineverse-cyan/20 to-black tracking-tighter select-none py-8 px-4 leading-tight opacity-50"
          style={{ WebkitTextStroke: "1px rgba(174, 248, 255, 0.08)" }}
        >
          CINEVERSE
        </h1>
      </div>
      <AuthForm />
    </div>
  );
};
export default Login;