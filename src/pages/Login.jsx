import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          card seasons
        </div>
        <div className="w-1/2">
          <AuthForm />
        </div>
      </div>
    </div>

  );
};
export default Login;