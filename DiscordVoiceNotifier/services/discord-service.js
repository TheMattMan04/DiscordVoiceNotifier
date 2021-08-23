import {Services} from "./service";
import {VoiceService} from "./voice-service";
import {UserService} from "./user-service";

const discord = require("discord.js");

const userService: UserService = Services.instance().userService;
const voiceService: VoiceService = Services.instance().voiceService;

const Intent = require("../enums/Intent");
const intentList = [
    Intent.GUILDS,
    Intent.GUILD_MEMBERS,
    Intent.GUILD_MESSAGES,
    Intent.GUILD_PRESENCES,
    Intent.GUILD_VOICE_STATES,
    Intent.DIRECT_MESSAGES,
]

const client = new discord.Client({
    ws: {
        intents: intentList
    },
});

client.once("ready", () => {
    console.log("Voice Channel Bot is online");

    client.guilds.cache.forEach((guild) => {
        userService.addServerMembers(guild.members.cache)
    });
    voiceService.addServerChannels(client.channels.cache)
});

client.on("message", async (message) => {
    if (message.content === "!family") {
        message.reply("@everyone" + " "+ "IT'S BEEN A LOOOOOONG DAYYYYYYY!")
    }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
    voiceService.handleVoiceStateUpdate(oldMember, newMember)
});


export class DiscordService {

    constructor() {
        client.login(process.env.BOT_TOKEN)
    }

   client() {
       return client
   }
}
