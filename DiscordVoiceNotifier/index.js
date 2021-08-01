"use strict";

require("dotenv").config();
const Discord = require("discord.js");
const VoiceChannel = require("./models/VoiceChannel");
const User = require("./models/User");

const client = new Discord.Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_MEMBERS",
      "GUILD_PRESENCES",
      "DIRECT_MESSAGES",
      "GUILD_VOICE_STATES",
    ],
  },
});

let voiceChannels = [];
let serverMembers = [];

client.once("ready", () => {
  console.log("Voice Channel Bot is online" + "\n");

  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      if (member.user.bot) return;
      serverMembers.push(new User(member.user.id, member.user.username));
    });
  });

  client.channels.cache.forEach((channel) => {
    if (channel.type === "voice") {
      voiceChannels.push(new VoiceChannel(channel.id, channel.name));
    }
  });
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let oldUser = client.users.cache.find(
    (user) => user.id === oldMember.id
  ).username;
  let newUser = client.users.cache.find(
    (user) => user.id === newMember.id
  ).username;

  let oldVoiceChannel = voiceChannels.find(
    (voice) => voice.id === oldMember.channelID
  );
  let newVoiceChannel = voiceChannels.find(
    (voice) => voice.id === newMember.channelID
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
              membersInOldChannel
          );
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
          member.send(
            newUser +
              " " +
              "joined " +
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
              membersInNewChannel
          );
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
});

client.login(process.env.BOT_TOKEN);
