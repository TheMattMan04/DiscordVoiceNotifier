import {Services} from "../../services/service";


const discord = Services.instance().discordService.client()

discord.once("ready", () => {

})
