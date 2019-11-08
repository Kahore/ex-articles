export interface User {
    _id: string;
    email: string;
    username: string;
    bio?: string;
    image?: string;
    following?: string[];
}
export interface Profile {
    _id: string;
    username: string;
    bio?: string;
    image?: string;
    following?: string[];
}
export interface ProfileRequest {
    profileId: string;
    userId: string | null;
}
export interface FollowToggler {
    profileId: string;
    userId: string;
    mode: string;
}
export interface UserSubmit {
  email: string;
  password: string;
}
export interface NewUser {
  username: string;
  email: string;
  password: string;
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
    author: Profile;
    comments: Comment[];
}
export interface Comment {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: Profile;
}
export interface NewArticle {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    author_id: string;
}
export interface NewComment {
    body: string;
    author_id: string;
    article_id: string;
}
