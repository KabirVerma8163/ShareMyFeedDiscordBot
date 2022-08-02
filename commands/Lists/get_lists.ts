import axios from 'axios';
import discord from 'discord.js'
import { Message } from 'discord.js'
import { parse } from 'dotenv';
import { getRequestMake } from '../../api_handing';
import { Command, ParsedData } from '../../events/botDataTypes';
import { LinksList } from '../datatypes';

const command:Command = {
  name: "Get Lists",
  test: false,
  accountSpecific: true,
  category:["list", "lists"],
  command_name: "getLists",
  command_aliases: ["getlists", "getls"],
  about:"Use this command to get all the lists associated with your account",
  syntax:[".getlists"],
  commandFunction(parsedData: ParsedData) {
    return new Promise ((resolve, reject) => {
      let message = parsedData.message
      let data = {
        discord_id : message.author.id,
      }
      getRequestMake("http://localhost:8000/lists/Get-lists", data, message)
      .then((responseData) => {
        // resolve()
        console.log("This is response data:\n", responseData)
        let lists:LinksList[] = [] as LinksList[]
        lists = responseData.lists
  
        if (lists.length > 0) { 
          let fields = []
          lists.forEach(list => {
            if (list.description == '') {
              list.description = "A list of links"
            }
            let item = {
              name:list.list_name,
              value: list.description
            }
            fields.push(item)
          })
          
          message.channel.send({
            embeds : [new discord.MessageEmbed()
              .setTitle(`${message.author.username}'s List`)
              .setFields(...fields)
              .setColor([200,0,0])  
            ]
          })
        } else {
          message.channel.send("You don't have lists, please use Makelists to create your very first list!!")
        }
      })
      .catch(() => {
        console.log("Occurs")
      }) 
    })
  }
}

export {command}