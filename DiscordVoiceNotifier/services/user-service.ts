import { User } from '../models/User'
import {Services} from "./service";


export class UserService {

    serverMembers = []

    getUserById(userId: string) {
        const discordService = Services.instance().discordService
        const client = discordService.client()

        return client.users.cache.find(
            (user) => user.id === userId
        );
    }

    getServerMembers() {
        return this.serverMembers
    }

    addServerMembers(members) {
        const users = members.map((member) => {
            return new User(member.user.id, member.user.username)
        })
        this.serverMembers = this.serverMembers.concat(users)
    }
}
