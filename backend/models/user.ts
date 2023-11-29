import bcrypt from "bcrypt";

export interface User extends Express.User {
    email: string;
    password: string;
    username: string;
}

export default class LocalUsers {
    users: User[] = [{ 
        email: "test@not.real", 
        password: bcrypt.hashSync("a", 10), 
        username: "James F"
    }, { 
        email: "test2@not.real", 
        password: bcrypt.hashSync("b", 10), 
        username: "Cameron Levey"
    }, { 
        email: "test3@not.real", 
        password: bcrypt.hashSync("c", 10), 
        username: "Thingy 2"
    }];

    findUser = (email: string) => this.users.find(u => u.email === email)
}