export interface IUser {
    username: string;
    twitterId: string;
    accessToken: string;
    refreshToken: string;
    emotion: {
        sadness: number;
        joy: number;
        fear: number;
        disgust: number;
        anger: number;
    };
    genres: string[];
    _id: string;
    _v: string;
}