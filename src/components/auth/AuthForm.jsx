import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { mockAuth } from "../../services/mockAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const AuthForm = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [stateAuth, setStateAuth] = useState("login");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [regisForm, setRegisForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: "" }));
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleRegisChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: "" }));
        setRegisForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validate = () => {
        const newErrors = {};
        if (stateAuth === "login") {
            if (!form.email) newErrors.email = "Email is required";
            if (!form.password) newErrors.password = "Password is required";
        } else {
            if (!regisForm.name) newErrors.name = "Name is required";
            if (!regisForm.email) newErrors.email = "Email is required";
            if (!regisForm.password) newErrors.password = "Password is required";
            if (regisForm.password.length < 6) newErrors.password = "Password must be at least 6 characters";
            if (regisForm.password !== regisForm.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            if (stateAuth === "register") {
                const user = await mockAuth.register(regisForm.name, regisForm.email, regisForm.password);
                console.log("Registered:", user);
                showToast("Account created successfully!", "success");
                navigate("/");
            } else {
                const user = await mockAuth.login(form.email, form.password);
                console.log("Logged in:", user);
                showToast("Welcome back, " + user.name, "success");
                navigate("/");
            }
        } catch (err) {
            const msg = err.message.toLowerCase();
            if (msg.includes("email")) {
                setErrors(prev => ({ ...prev, email: err.message }));
            } else if (msg.includes("password")) {
                setErrors(prev => ({ ...prev, password: err.message }));
            } else {
                showToast(err.message || "Something went wrong", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleAuth = () => {
        setStateAuth(prev => prev === "login" ? "register" : "login");
        setErrors({});
    }

    return (
        <div className="flex flex-col justify-center min-h-screen p-4 w-full max-w-md mx-auto z-10 relative">
            <div
                className="bg-black/20 backdrop-blur-xl p-8 sm:p-12 rounded-2xl shadow-2xl w-full"
            >
                <div className="mb-8">
                    <h2
                        key={stateAuth === "login" ? "title-login" : "title-regis"}
                        className="text-3xl font-extrabold text-white mb-2 tracking-wide animate-fade-in"
                        style={{ animationDuration: "0.5s" }}
                    >
                        {stateAuth === "login" ? "Welcome Back" : "Create Account"}
                    </h2>

                    <p
                        key={stateAuth === "login" ? "desc-login" : "desc-regis"}
                        className="text-gray-400 text-sm animate-fade-in"
                        style={{ animationDuration: "0.5s", animationDelay: "0.1s", animationFillMode: "both" }}
                    >
                        {stateAuth === "login" ? "Please enter your details to sign in." : "Join Cineverse for free to start watching."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className={`grid transition-all duration-500 ease-in-out -mx-3 -mt-4 ${stateAuth === "register" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden pt-4 px-3">
                            <Input
                                label="Name"
                                name="name"
                                type="text"
                                value={regisForm.name}
                                onChange={handleRegisChange}
                                error={errors.name}
                            />
                        </div>
                    </div>

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={stateAuth === "login" ? form.email : regisForm.email}
                        onChange={stateAuth === "login" ? handleChange : handleRegisChange}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={stateAuth === "login" ? form.password : regisForm.password}
                        onChange={stateAuth === "login" ? handleChange : handleRegisChange}
                        error={errors.password}
                    />

                    <div className={`grid transition-all duration-500 ease-in-out -mx-3 -mt-4 ${stateAuth === "register" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden pt-4 px-3">
                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={regisForm.confirmPassword}
                                onChange={handleRegisChange}
                                error={errors.confirmPassword}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                            <input type="checkbox" className="accent-cineverse-cyan rounded" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="hover:text-cineverse-cyan transition-colors hover:underline">Forgot Password?</a>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-4 text-lg bg-cineverse-gradient hover:brightness-110 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : (
                            <span className="transition-all duration-300">
                                {stateAuth === "login" ? "Sign In" : "Sign Up"}
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    {stateAuth === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={toggleAuth}
                        disabled={loading}
                        className="text-white font-bold ml-1 hover:text-cineverse-cyan transition-colors hover:underline focus:outline-none disabled:opacity-50"
                    >
                        {stateAuth === "login" ? "Sign up for free" : "Sign in now"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AuthForm;