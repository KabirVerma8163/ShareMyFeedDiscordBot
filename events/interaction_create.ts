import { Interaction, Message, MessageActionRow } from 'discord.js'
import botConfig from '../bot_config.json'
import fs = require("fs")
import { getAllParticularFiles } from '../utils'
import { DiscordEvent, ParsedData } from './botDataTypes'

const discordEvent:DiscordEvent = {
  once: false,
  event_name: "messageCreate",
  eventFunction(message: Message) {
    // console.log(message)
    // console.log(message.content[0])
    if(message.content[0] === botConfig.default_prefix) {
      getCommands()
      message.content = message.content.substring(1)
      commandHandler(message)
    }
  }
}

let commandMap: Map<string, Function> = new Map()

function getCommands(){
  if (commandMap.size == 0){
    const commandfiles = getAllParticularFiles(__dirname + "/../commands", [], ".js")

  commandfiles.forEach((file) => {
    let command = require(file).command
    // console.log(file)
    if (!command.test) {
      commandMap.set(command.command_name, command.commandFunction)
      command.command_aliases.forEach((alias:string) => {
        commandMap.set(alias, command.commandFunction)
      });
    }
  })}
}

function commandHandler(message:Message) {
  let messageText = message.content.slice(botConfig.default_prefix.length)
  let parsedData:ParsedData = {} as ParsedData
  parsedData.message = message
  parsedData.messageItems = message.content.split(" ")
  parsedData.commandName = parsedData.messageItems[0]

  let content = message.content

  parsedData.quotes = []

  let match = content.match(/\'(.*?)\'/)
  // console.log(`CONTENT: ${content}`)
  while (match != null && match.index != null) {
    parsedData.quotes.push(match[1])
    content = content.substring(match.index + match[1].length + 2)
    match = content.match(/\'(.*?)\'/)
  }

  // console.log(parsedData.quotes)
  // console.log(parsedData.messageItems[0])
  let commandFunc = commandMap.get(parsedData.commandName.toLowerCase())
  // console.log(commandMap)
  if (commandFunc !== undefined) {
    console.log(parsedData.commandName)
    commandFunc(parsedData).then().catch()
  }
}


export {discordEvent}