import config from "../config/config"

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // user login;
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(email, password);
            return userSession;
        }
        catch (err) {
            throw err;
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    
    logout = async () => {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;




