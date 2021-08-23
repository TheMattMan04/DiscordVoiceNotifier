import User from "../models/User";


export class UserService {

    serverMembers = []

    getUserById(userId: string) {
        return client.users.cache.find(
            (user) => user.id === userId
        );
    }

    addServerMembers(members) {
        const users = members.map((member) => {
            return new User(member.user.id, member.user.username)
        })
        this.serverMembers = this.serverMembers.concat(users)
    }
}
