"use strict";

import dotenv from "dotenv"
dotenv.config()
// const Discord = require("discord.js");
// const VoiceChannel = require("./models/VoiceChannel");
// const User = require("./models/User");
// const Intent = require("./enums/Intent");
// const NotificationUtil = require("./utils/NotificationUtil");

// const Services = require('./services/service').Services
import {Services} from "./services/service.js";

Services.initialize()
