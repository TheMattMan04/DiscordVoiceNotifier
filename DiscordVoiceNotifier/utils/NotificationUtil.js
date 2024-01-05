function notifyUserLeft(member, oldUser, oldVoiceChannelName, membersInOldChannel) {
    if (membersInOldChannel.length === 0) {
        member.send(
            oldUser +
              " " +
              "left " +
              "'" +
              oldVoiceChannelName +
              "'" +
              " " +
              "voice channel" +
              "\n" +
              "\n" +
              "People currently in: " +
              "'" +
              oldVoiceChannelName +
              "'" +
              "\n" +
              "\n" +
              "There's no one currently in " +
              "'" +
              oldVoiceChannelName +
              "'" +
              "\n"
          );
    } else {
        member.send(
            oldUser +
              " " +
              "left " +
              "'" +
              oldVoiceChannelName +
              "'" +
              " " +
              "voice channel" +
              "\n" +
              "\n" +
              "People currently in: " +
              "'" +
              oldVoiceChannelName +
              "'" +
              "\n" +
              "\n" +
              membersInOldChannel +
              "\n"
          );
    }
    console.log("Sent notification to: " + member.user.username + "\n");
}

function notifyUserJoined(member, newUser, newVoiceChannelName, membersInNewChannel) {
    member.send(
        newUser +
          " " +
          "is chilling in " +
          "'" +
          newVoiceChannelName +
          "'" +
          " " +
          "voice channel" +
          "\n" +
          "\n" +
          "People currently in: " +
          "'" +
          newVoiceChannelName +
          "'" +
          "\n" +
          "\n" +
          membersInNewChannel +
          "\n"
      );
      console.log("Sent notification to: " + member.user.username + "\n");
}

module.exports = {
    notifyUserLeft: notifyUserLeft,
    notifyUserJoined: notifyUserJoined
}