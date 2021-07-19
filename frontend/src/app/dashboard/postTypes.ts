export interface Post {
    category: any,
    title?: string,
    photo?: any,
    text: any
    date: string
    author: string
    _id: any
    post: any
    login: string
    success: boolean
}

export interface DeletePost {
    success: boolean
}