export interface User {
    _id: string;
    email: string;
    username: string;
    bio?: string;
    image?: string;
}
export interface Profile {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
}

export interface UserSubmit {
  email: string;
  password: string;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface Article {
    _id: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author_id: string;
    profile: Profile;
}
