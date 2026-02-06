import Input from "../common/Input";
import Button from "../common/Button";
const AuthForm = () => {
    return (
        <div className="flex flex-row items-center justify-center h-screen">
            <div className="flex flex-row gap-6">
                <div className="w-full max-w-md">
                    <Input label="Email" type="email" placeholder="Email" />
                    <Input label="Password" type="password" placeholder="Password" />
                    <Button type="submit">Sign In</Button>
                </div>
            </div>
        </div>
    );
};
export default AuthForm;