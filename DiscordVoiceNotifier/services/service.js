import {VoiceService} from "./voice-service";
import {DiscordService} from "./discord-service";
import {UserService} from "./user-service";
import {User} from "discord.js";


export class Services {
    static _instance;
    static initialize() {
        this._instance = new this()
    }

    static instance() {
        if (!this._instance) {
            throw new Error("Please init the services class")
        }
        return this._instance
    }

    public voiceService: VoiceService = null;
    public discordService: DiscordService = null;
    public userService: UserService = null;

    constructor() {
        this.discordService = new DiscordService();
        this.voiceService = new VoiceService();
        this.userService = new UserService()
    }
}
