export enum University {
    "Multimedia University",
    "TARUMT",
    "SEGi",
    "University Malaya",
    "Sunway University",
}

export enum Interests {
    "Football",
    "Piano",
    "Badminton",
    "Listen to Music",
    "Watch Movie",
    "Basketball",
}

export enum Gender {
    "Male",
    "Female",
}

export type RecommendedUser = {
    id: string;
    name: string;
    interests: Interests;
    university: University;
    gender: Gender;
    location: string;
    priority: number;
};
