import { Gender, Interests, University } from "../@types/commmon";

export type AuthInitialState = {
    user: {
        id: string;
        name: string;
        gender: Gender;
        location: string;
        university: University;
        interests: Interests;
    } | null;
    isAuthenticated?: boolean;
    accessToken: string;
};
