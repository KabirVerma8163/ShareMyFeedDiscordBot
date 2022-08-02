import { Guild } from 'discord.js'
import botConfig from '../bot_config.json'
import fs = require("fs")

const discordEvent:DiscordEvent = {
  once: false,
  event_name: "guildCreate",
  eventFunction(guild:Guild) {
    // console.log(botConfig)
    // console.log(guild)

    editBotConfig(guild)
  }
}


function editBotConfig(guild:Guild){
  let newServer = botConfig.ServersList.ServerDataTemplate
  botConfig.ServersList[guild.id] = newServer
  console.log(botConfig)

  fs.writeFile('./bot_config.json', JSON.stringify(botConfig), (err => {
    if (err) console.log(err)
    else console.log(`Config.json has been updated successfully`)
  })) 
}


// export function editBotConfig() {
// let bot_config = JSON.stringify(botConfig)
// let myMap = new Map(Object.entries(botConfig));
// console.log(myMap.get('ServersList'))
// console.log(botConfig)
// botConfig.ServersList["monka"] = "hello"
// console.log(botConfig)
// console.log(bot_config)
// bot_config["ServersList"][guild.id as string] = "monke"
// console.log(bot_config["ServersList"])
// let bot_config = botConfig as RootObject
// let serverDetails:ServerDetails = botConfig.ServersList.ServerDataTemplate
// console.log(botConfig.ServersList[guild.id])
// let newConfig = botConfig.ServersList.ServerDataTemplate
// newConfig.ServerDetails
// let guildId = guild.id as string
// bot_config.ServersList[guildId] = newConfig
// console.log(botConfig.ServersList)

// Anytime the bot restarts, I want it to go through the default list in the json file and if something isn't there, to add it there.

export {discordEvent}

// "SampleServerId": {
//   "owner": {
//     "ownerUserName": "",
//     "ownerDiscriminator": "",
//     "ownerTag": "",
//     "ownerId": ""
//   },
//   "prefixes": [
//     "_"
//   ],
//   "serverDetails": {
//     "channels": {
//       "botCommandsAllowed": [],
//       "botCommandsNotAllowed": []
//     }
//   },
//   "guildId": ""
// }