import axios from 'axios';
import discord from 'discord.js'
import { Message } from 'discord.js'
import { parse } from 'dotenv';
import { getRequestMake, postRequestMake } from '../../api_handing';
import { Command, ParsedData } from '../../events/botDataTypes';
import { DiscordAccount, LinksList } from '../datatypes';

const command:Command = {
  name: "Make User",
  test: false,
  accountSpecific: false,
  category:["users", "user"],
  command_name: "makeUser",
  command_aliases: ["makeuser", "makeu"],
  about:"This helps you make a user so you can certain commands that need an account",
  syntax:[".makeUser"],
  commandFunction(parsedData: ParsedData) {
    let message = parsedData.message
    let discordData:DiscordAccount = {} as DiscordAccount
    discordData.discord_id = message.author.id
    discordData.discord_discriminator = parseInt(message.author.discriminator)
    discordData.discord_username = message.author.username
    
    let data = {
      ...discordData
    }
    return new Promise ((resolve, reject) => {
      console.log(data)

      postRequestMake("http://localhost:8000/users/New-discord", data, message)
      .then((responseData) => {
        message.channel.send(`${message.author.username} was added successfully!`)
      })
      .catch((err) => {
        console.log(err)
        if (err?.response?.data?.error == "RequestError: User already has an account") {
          message.channel.send(`${message.author.username} already has an account`)
        }else {
          message.channel.send(`There was an error, please try again or contact bot owner.`)
        }
      })

      // getRequestMake("http://localhost:8000/lists/Get-lists", data)
      // .then((responseData) => {
      //   console.log("This is response data:\n", responseData)
      //   let lists:LinksList[] = [] as LinksList[]
      //   lists = responseData.lists
  
      //   let fields = []
      //   lists.forEach(list => {
      //     if (list.description == '') {
      //       list.description = "A list of links"
      //     }
      //     let item = {
      //       name:list.list_name,
      //       value: list.description
      //     }
      //     fields.push(item)
      //   })
  
        
      //   message.channel.send({
      //     embeds : [new discord.MessageEmbed()
      //       .setTitle(`${message.author.username}'s List`)
      //       .setFields(...fields)
      //       .setColor([200,0,0])  
      //     ]
      //   })
      // })
      // .catch(() => {
      //   console.log("Occurs")
      // }) 
    })
  }
}

export {command}