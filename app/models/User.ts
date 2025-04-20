interface User {
    _id?: string,
    image?: string,
    name?: string,
    gender?: string,
    birthday?: Date,
    phone?: string,
    password: string,
    email: string,
    address?: string,
    zipcode?: string,
    role?: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export default User;