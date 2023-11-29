import bcrypt from "bcrypt";

export interface IUser {
    email: string;
    password: string;
    username: string;
}

export default class LocalUsers {
    users: IUser[];

    async initUsers() {
        const p = await bcrypt.hash("goodpassword", 10);
        this.users = [{ email: "test@not.real", password: p, username: "test"}];
    }

    findUser(email: string) {
        return this.users.find(u => u.email === email);
    }

}