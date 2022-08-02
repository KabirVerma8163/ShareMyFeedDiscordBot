import Discord = require('discord.js')
require('dotenv').config('/.env' )
import {getAllParticularFiles} from './utils'


let BotToken:string = process.env.BOT_TOKEN!

const myIntents = new Discord.Intents()
myIntents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS,
  Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES,
  Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING)

// // Create a new client instance
const client = new Discord.Client({ intents: myIntents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const eventFiles = getAllParticularFiles(__dirname + "/events", [], ".js")

// console.log(eventFiles)

// let eventMap = {}


eventFiles.forEach((file) => {
    let discordEvent = require(file).discordEvent
    // console.log(file)
    if (discordEvent.once) {
      client.once(discordEvent.event_name, (...args) => discordEvent.eventFunction(...args))
    } else {
      client.on(discordEvent.event_name, (...args) => discordEvent.eventFunction(...args))
    }
})

// console.log(BotToken)
client.login(BotToken)

//testing zone
// editBotConfig()