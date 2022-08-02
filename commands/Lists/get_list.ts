import axios from 'axios';
import discord from 'discord.js'
import { Message } from 'discord.js'
import { VideoQualityModes } from 'discord.js/typings/enums';
import { parse } from 'dotenv';
import { getRequestMake } from '../../api_handing';
import { Command, ParsedData } from '../../events/botDataTypes';
import { LinksList } from '../datatypes';

const command:Command = {
  name: "Get List",
  test: false,
  accountSpecific: true,
  category:["lists", "list"],
  command_name: "getlist",
  command_aliases: ["getlist", "getl"],
  about:"",
  syntax:[""],
  commandFunction(parsedData: ParsedData) {
    return new Promise ((resolve, reject) => {
      if (parsedData.quotes?.length === 1) {
        let message = parsedData.message
        let data = {
          discord_id : message.author.id,
          list_name: parsedData.quotes[0]
        }
        getRequestMake("http://localhost:8000/lists/Get-list", data, message)
        .then((responseData) => {
          console.log("This is response data:\n", responseData)
          let list:LinksList = responseData as LinksList
          // list = responseData
          console.log(list)

          if (list.description == '') {
            list.description = "A list of links"
          }
    
          let fields = []
          list.links.forEach(link => {
            
            let item = {
              name:link.link_name,
              value: `${list.description} : ${link.link_url}`
            }
            fields.push(item)
          })
    
          
          message.channel.send({
            embeds : [new discord.MessageEmbed()
              .setTitle(`${list.list_name}`)
              .setDescription(`${list.description}`)
              .setFields(...fields)
              .setColor([200,0,0])  
            ]
          })
        })
        .catch(() => {
          console.log("Occurs")
        })
      } else {
        parsedData.message.channel.send(`Please enter a list name, or to get all lists, use \`getLists\``)
      }
       
    })
  }
}

export {command}