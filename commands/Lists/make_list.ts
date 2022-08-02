import axios from 'axios';
import discord from 'discord.js'
import { Message } from 'discord.js'
import { getRequestMake, postRequestMake } from '../../api_handing';
import { Command, ParsedData } from '../../events/botDataTypes';
import { LinksList } from '../datatypes';


const command:Command = {
  name: "Make List",
  test: false,
  accountSpecific: true,
  category:["list", "lists"],
  command_name: "makeList",
  command_aliases: ["makelist", "makels"],
  about: "Use this command to make a list",
  syntax: [`.makeList '<name>' '<description>'`],
  commandFunction(parsedData: ParsedData) {
    return new Promise ( (resolve, reject) => {
      let message = parsedData.message
    // console.log(message.content)
    let data = {
      discord_id : message.author.id,
      // discord_username : message.author.username
    }

    console.log(parsedData.quotes)
    let list:LinksList = {} as LinksList;
    
    if (parsedData.quotes?.length != undefined && parsedData.quotes?.length >= 0) {
      list.list_name = parsedData.quotes[0]
      if (parsedData.quotes?.length == 2) {
        list.description = parsedData.quotes[1]
      }
      data = {
        ...data,
        ...list
      }
  
      postRequestMake("http://localhost:8000/lists/Make-list", data, message)
      .then((responseData) => {
        let fields = []
        responseData.links.forEach((link, index) => {
          let item = {
            name : link.link_name,
            value : `https://${link.link_url}`
          }
          fields.push(item)
        })
        message.channel.send({
          embeds : [new discord.MessageEmbed()
            .setTitle(responseData.list_name)
            .setFields(...fields)
            .setColor([200,0,0])  
          ]
        })
       
       }).catch ((err) => {
        //  console.log(err)
        message.channel.send(`Request failed, please check the syntax and try again.`)
       }) 
    }
    })
  }
}

export {command}