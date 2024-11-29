export interface IUserStore {
    user?: IUser | null,
    isLogged: boolean
}

export interface IUser {
    id: number,
    email: string,
    shortsUrls?: IShortUrl[],
    createdAt: string
}

export interface IShortUrl {
    id: number,
    shortUrl: string,
    originalUrl: string,
    createdAt: string,
    openedBy: number,
    isNsfw: boolean,
    user?: IUser
}