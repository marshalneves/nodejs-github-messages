import { IUserRepository } from '../data/UserRepository';
import { inject, injectable } from 'tsyringe';
import axios from "axios";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserService { 
    execute(code: string)
}

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

@injectable()
class AuthenticateUserService implements IAuthenticateUserService {

    constructor(
        @inject("UserRepository")
        private repository: IUserRepository
    ) {}
    
    async execute(code: string) {

        // Get Access Token
        const userGitHub = await this.getUserInfoFromGitHub(code);

        let user = await this.repository.getByGithubId(userGitHub.id);

        if (!user) {
           await this.repository.create(userGitHub, userGitHub.login, userGitHub.avatar_url, userGitHub.name);
        }

        const token = await this.signToken(user);

        return { token, user }
    }

    private async getUserInfoFromGitHub(code) {

        const url = "https://github.com/login/oauth/access_token";
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return response.data;

    }

    private async signToken(user) {

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            }, process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            });
        
        return token;

    }

}

export { AuthenticateUserService, IAuthenticateUserService }