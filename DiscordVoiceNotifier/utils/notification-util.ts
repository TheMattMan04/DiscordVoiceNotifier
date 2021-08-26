
export class NotificationService {

    notifyUserLeft(member, oldUser, oldVoiceChannelName, membersInOldChannel) {
        if (membersInOldChannel.length === 0) {
            const msg = `${oldUser} was the last to leave the voice channel ${oldVoiceChannelName}.`
            member.send(msg);
        } else {
            const msg = `${oldUser} left [${membersInOldChannel.join(", ")}] in ${oldVoiceChannelName}.`
            member.send(msg);
        }
        console.log("Sent notification to: " + member.user.username);
    }

    notifyUserJoined(member, newUser, newVoiceChannelName, membersInNewChannel) {
        if (membersInNewChannel.length === 0) {
            const msg = `${newUser} joined ${newVoiceChannelName}.`
            member.send(msg);
        } else {
            const msg = `${newUser} joined [${membersInNewChannel.join(", ")}] in ${newVoiceChannelName}.`
            member.send(msg);
        }
        console.log("Sent notification to: " + member.user.username);
    }

}
