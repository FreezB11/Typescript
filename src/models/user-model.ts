export interface IUser {
    id: number;
    name: string;
    email: string;
    password:string;
}

function getNew(name: string, email: string,password:string): IUser {
    return {
        id: -1,
        email,
        name,
        password
    };
}

function copy(user: IUser): IUser {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
