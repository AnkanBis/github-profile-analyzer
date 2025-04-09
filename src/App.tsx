import { useState } from 'react';
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserAtom } from './store/atoms/user';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Building2, MapPin } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';



export default function App() {

    const [showCard, setShowCard] = useState<boolean>(true);
    const [user, setUser] = useState("");


    return (
        <div className="w-full h-screen bg-[#0D1321] flex items-center justify-center">
            {showCard && <InputForm setShowCard={setShowCard} user={user} setUser={setUser} />}
            {showCard || <ProfileCard user={user} setShowCard={setShowCard} setUser={setUser} />}
        </div>
    );
}

const InputForm = ({ setShowCard, user, setUser }: {
    setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {

    const setCurrentUser = useSetRecoilState(currentUserAtom)
    const handleSubmit = async () => {
        try {
            setShowCard(currState => !currState)
            const response = await axios.get(`https://api.github.com/users/${user}`)
            setCurrentUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        (
            < form className="bg-[#F0EBD8] rounded-2xl shadow-lg p-8 flex items-center gap-4 animate-fade-in" >
                <Input
                    className="w-72 px-4 py-2 text-gray-700 border border-[#8d99ae] rounded-xl focus:ring-2 focus:ring-[#197278]"
                    placeholder="Insert github username..."
                    onChange={(e) => setUser(e.target.value)}
                />
                <Button
                    className="bg-[#3E5C76] hover:bg-[#1D2D44] text-white px-6 py-2 rounded-xl transition-all duration-200"
                    onClick={handleSubmit}
                >
                    Find
                </Button>
            </form >)

    )
}

const ProfileCard = ({ user, setUser, setShowCard }: {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setShowCard: React.Dispatch<React.SetStateAction<boolean>>;

}) => {
    const currUser = useRecoilValue(currentUserAtom);
    if (!currUser) return;
    console.log(currUser)

    return (
        <div className="w-[85rem] h-[40rem] bg-[#F0EBD8] rounded-2xl shadow-xl p-10 flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-start">
                {/* Left Section */}
                <div className="flex items-center gap-8">
                    {/* Avatar */}
                    <Avatar className="w-32 h-32 border-4 border-[#0D1321] shadow-lg">
                        <AvatarImage src={currUser.avatar_url} alt="user" />
                        <AvatarFallback className="text-2xl">
                            {user}
                        </AvatarFallback>
                    </Avatar>
                    {/* User Info */}
                    <UserInfo user={user} />
                </div>

                {/* Close Button */}
                <button
                    className="text-4xl font-bold text-[#0D1321] hover:text-red-600 transition duration-200"
                    onClick={() => {
                        setUser("");
                        setShowCard((currState) => !currState);
                    }}

                >
                    &times;
                </button>
            </div>

            {/* Activity Heatmap */}
            <div className=' flex justify-center mt-28 '>
                <GitHubCalendar username={user} />
            </div>

        </div>
    );

}

const UserInfo = ({ user }: { user: string; }) => {
    const currUser = useRecoilValue(currentUserAtom);
    if (!currUser) return null;

    return (
        <div className="flex flex-row gap-12 items-start flex-wrap">

            {/* Name, Username & Join Date */}
            <div className="flex flex-col gap-2 min-w-[12rem]">
                <h1 className="text-4xl font-bold text-[#0D1321]">{currUser.name}</h1>
                <a
                    href={`https://github.com/${user}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-[#748CAB] hover:text-[#3E5C76] font-medium hover:underline transition-all"
                >
                    @{user}
                </a>
                <p className="text-sm text-gray-600 font-medium">
                    Joined: {new Date(currUser.created_at).toLocaleDateString()}
                </p>
            </div>

            {/* Stats Section */}
            <StatSection />

            {/* Location & Company */}
            <div className="flex flex-col gap-6 text-lg text-gray-700 min-w-[10rem]">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1D2D44]" />
                    <span>{currUser.location || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1D2D44]" />
                    <span>{currUser.company || "Not specified"}</span>
                </div>
            </div>
        </div>
    );
};



const StatSection = () => {
    const currUser = useRecoilValue(currentUserAtom);
    if (!currUser) return;

    return (
        <div className="flex justify-center ">
            <div className="grid grid-cols-3 gap-6 bg-[#1D2D44] rounded-lg w-[32rem] h-[6rem] text-center items-center shadow-md">
                <div>
                    <div className="text-2xl font-semibold text-white">
                        {currUser.public_repos}
                    </div>
                    <div className="text-sm text-gray-200">Repositories</div>
                </div>
                <div>
                    <div className="text-2xl font-semibold text-white">
                        {currUser.followers}
                    </div>
                    <div className="text-sm text-gray-200">Followers</div>
                </div>
                <div>
                    <div className="text-2xl font-semibold text-white">
                        {currUser.following}
                    </div>
                    <div className="text-sm text-gray-200">Following</div>
                </div>
            </div>
        </div>
    )
}
