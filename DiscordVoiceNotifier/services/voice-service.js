import {VoiceState} from "discord.js";


const VoiceChannel = require("./models/VoiceChannel");

export class VoiceService {
    voiceChannels = [];


    addServerChannels(channels) {
        channels.forEach((channel) => {
            if (channel.type === "voice") {
                this.voiceChannels.push(new VoiceChannel(channel.id, channel.name))
            }
        })
    }

    handleVoiceStateUpdate(oldMember: VoiceState, newMember: VoiceState) {
        let oldUser = client.users.cache.find(
            (user) => user.id === oldMember.id
        ).username;
        let newUser = client.users.cache.find(
            (user) => user.id === newMember.id
        ).username;

        let oldVoiceChannel = voiceChannels.find(
            (voice) => oldMember.channelID === voice.id
        );
        let newVoiceChannel = voiceChannels.find(
            (voice) => newMember.channelID === voice.id
        );

        let oldVoiceChannelName = " ";
        let newVoiceChannelName = " ";

        if (oldVoiceChannel !== undefined) {
            oldVoiceChannelName = oldVoiceChannel.name;
        }

        if (newVoiceChannel !== undefined) {
            newVoiceChannelName = newVoiceChannel.name;
        }

        let channelLeft = client.channels.cache.find(
            (c) => c.id === oldMember.channelID
        );
        let channelJoined = client.channels.cache.find(
            (c) => c.id === newMember.channelID
        );

        let membersInOldChannel = [];
        let membersInNewChannel = [];

        if (channelLeft !== undefined) {
            channelLeft.members.forEach((member) => {
                membersInOldChannel.push(
                    client.users.cache.find((user) => user.id === member.id).username
                );
            });
        }

        if (channelJoined !== undefined) {
            channelJoined.members.forEach((member) => {
                membersInNewChannel.push(
                    client.users.cache.find((user) => user.id === member.id).username
                );
            });
        }

        if (newMember.channelID === null) {
            client.guilds.cache.forEach((guild) => {
                guild.members.cache.forEach((member) => {
                    let memberFound = serverMembers.find(
                        (serverMember) => serverMember.id === member.user.id
                    );

                    if (memberFound !== undefined) {
                        if (memberFound.id !== oldMember.id) {
                            NotificationUtil.notifyUserLeft(member, oldUser, oldVoiceChannelName, membersInOldChannel);
                        }
                    }
                });
            });
        } else if (oldMember.channelID === null) {
            client.guilds.cache.forEach((guild) => {
                guild.members.cache.forEach((member) => {
                    let memberFound = serverMembers.find(
                        (serverMember) => serverMember.id === member.user.id
                    );

                    if (memberFound !== undefined) {
                        if (memberFound.id !== newMember.id) {
                            NotificationUtil.notifyUserJoined(member, newUser, newVoiceChannelName, membersInNewChannel);
                        }
                    }
                });
            });
        } else {
            console.log(
                newUser +
                " moved to " +
                "'" +
                newVoiceChannelName +
                "'" +
                " voice channel" +
                "\n" +
                "People currently in: " +
                "'" +
                newVoiceChannelName +
                "'" +
                "\n" +
                membersInNewChannel
            );
        }
    }
}
