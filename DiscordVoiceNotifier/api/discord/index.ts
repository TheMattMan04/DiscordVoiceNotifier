import {Services} from "../../services/service";

const discord = Services.instance().discordService.client()
export * from './voice-routes'
