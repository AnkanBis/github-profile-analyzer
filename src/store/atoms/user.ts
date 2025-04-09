import { atom } from 'recoil';

interface userObject {
    name: string;
    avatar_url: string;
    created_at: Date;
    location: string;
    company: string;
    public_repos: string;
    followers: string;
    following: string;
}


export const currentUserAtom = atom<userObject | null>({
    key: "currentUserAtom",
    default: null
})
