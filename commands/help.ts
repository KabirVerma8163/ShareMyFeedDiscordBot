import { Command, ParsedData } from "../events/botDataTypes";
import { arrToString, getAllParticularFiles } from "../utils";
import discord from 'discord.js'

const command:Command = {
  name: "Help",
  test:false,
  accountSpecific:false,
  command_name: "help",
  command_aliases: ["h"],
  category: ["help"],
  about: "First option will list out command categories. If you type a specific command category, then it will show you command options, descriptions and aliases. Asking for help for a specific command will get you the syntax of said command.\n Do not type the angular brackets, they are only for demonstrative purposes",
  syntax: [".h", ".h <commandName>", ".h <commandCategory>"],
  commandFunction(parsedData:ParsedData) {
    return new Promise ((resolve, reject) => {
      let categoryMap: Map<string, Command[]> = new Map()

      switch (parsedData.messageItems.length) {
        case 1 : {
          let fields = [
            {
              name: "1. help",
              value: "Gives more information about other commands."
            },
            {
              name: "2. user/users",
              value: "Modifying your account"
            }
            {
              name: "3. list/lists",
              value: "To modify lists"
            }
          ]
  
          parsedData.message.channel.send({
            embeds : [new discord.MessageEmbed()
              .setTitle(`Help Command`)
              .setDescription("Lists out the possible categories for commands. To get more information on a particular category, use the syntax:\n.help <categoryName>\nThe categories are listed below.\n Do not type the angular brackets(<>), they are only for demonstrative purposes.")
              .setFields(...fields)
              .setColor([200,0,0]) 
            ]
        })
        return
        }
        case 2 : {
  
          getCommands()
          let cmd = commandMapVerbose.get(parsedData.messageItems[1])
          if(cmd != undefined) {
            parsedData.message.channel.send({
              embeds : [new discord.MessageEmbed()
                .setTitle(`${cmd.name} Command`)
                .setFields([{
                  name: `About`,
                  value: `${cmd.about}`
                },{
                  name: `Aliases`,
                  value: `${arrToString(cmd.command_aliases)}`
                },{
                  name: `Syntax`,
                  value: `${arrToString(cmd.syntax)}`
                },
              ])
                .setColor([200,0,0])  
              ]
            })
            return
          } else {
            getCommandsNoRepeats()
            let commands = commandMap.get(parsedData.messageItems[1])
            if (commands != undefined) {
              categoryMap.set(parsedData.messageItems[1],commands)
              let fields = []
              let commandsList = categoryMap.get(parsedData.messageItems[1])
              commandsList?.forEach(command => {
                let item = {
                  name:command.command_name + ` Aliases: ${arrToString(command.command_aliases)}`,
                  value: command.about
                }
                fields.push(item)
              })
    
              parsedData.message.channel.send({
                embeds : [new discord.MessageEmbed()
                  .setTitle(`${parsedData.messageItems[1]} Commands`)
                  .setFields(...fields)
                  .setColor([200,0,0])  
                ]
              })
              return
            }
          }   
        }
      }
      parsedData.message.channel.send("There is no such command or category, please try again.")
    })
  }
}

let commandMapVerbose: Map<string, Command> = new Map()

function getCommands(){
  if (commandMapVerbose.size == 0){
    const commandfiles = getAllParticularFiles(__dirname + "/../commands", [], ".js")

  commandfiles.forEach((file) => {
    let command = require(file).command
    if (!command.test) {
      commandMapVerbose.set(command.command_name, command)
      command.command_aliases.forEach((alias:string) => {
        commandMapVerbose.set(alias, command)
      });
    }
  })}
}

let commandMap: Map<string, Command[]> = new Map()

function getCommandsNoRepeats(){
  if (commandMap.size == 0){
    const commandfiles = getAllParticularFiles(__dirname + "/../commands", [], ".js")

  commandfiles.forEach((file) => {
    let command:Command = require(file).command
    if (!command.test) {
      command.category.forEach(str => {
        // console.log(`commandName: ${command.command_name} str: ${str}`)
        if (commandMap.has(str)) {
          commandMap.get(str)?.push(command)
        } else { 
          commandMap.set(str, [command])
        }
      });
    }
  })}
}

export {command}