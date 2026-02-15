import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MyList = () => {
    const navigate = useNavigate();
    // Assuming no list functionality yet
    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-8 md:px-16 bg-cineverse-dark text-white">
            <h1 className="text-3xl font-bold mb-8">My List</h1>
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-lg border border-dashed border-white/10">
                <p className="text-xl text-gray-400 mb-6">You haven't added any titles to your list yet.</p>
                <div className="flex gap-4">
                    <Button onClick={() => navigate('/')} className="bg-cineverse-cyan text-black font-bold">
                        Browse Movies
                    </Button>
                    <Button onClick={() => navigate('/tv-shows')} className="bg-transparent border border-white/20 hover:bg-white/10">
                        Browse TV Shows
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyList;
