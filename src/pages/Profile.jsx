import { useEffect, useState } from "react";
import { mockAuth } from "../services/mockAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = mockAuth.getCurrentUser();
        if (!currentUser) {
            navigate("/login");
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        mockAuth.logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black pt-24 px-4 md:px-16 text-white bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-no-repeat bg-fixed">
            <div className="bg-black/80 fixed inset-0 z-0" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 border-b border-gray-700 pb-4">
                    Account
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden ring-4 ring-cineverse-cyan/30 shadow-2xl">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                alt="Current Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-gray-400 text-sm">MEMBER SINCE 2024</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg border border-white/5">
                            <h3 className="text-gray-400 text-sm font-bold tracking-wider mb-4 uppercase">
                                Profile Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                                    <span className="font-semibold text-lg">{user.name}</span>
                                    <span className="text-gray-400 text-sm">Username</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-2">
                                    <span className="font-semibold text-lg">{user.email}</span>
                                    <span className="text-gray-400 text-sm">Email</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg border border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-400 text-sm font-bold tracking-wider mb-1 uppercase">
                                    Plan Details
                                </h3>
                                <p className="flex items-center gap-2 font-bold text-cineverse-cyan">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    PREMIUM (4K + HDR)
                                </p>
                            </div>
                            <button className="text-gray-400 hover:text-white underline text-sm">
                                Change Plan
                            </button>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-8">
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4 border-l-4 border-cineverse-cyan pl-4">
                        My List
                    </h2>
                    <div className="p-8 text-center bg-[#1f1f1f] rounded-xl border border-dashed border-white/20 text-gray-400">
                        You haven't added any movies to your list yet.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
