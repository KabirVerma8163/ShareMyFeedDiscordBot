import axios from "axios";
import { Message } from "discord.js";

let header = {
  'Content-Type': 'application/json',
  'Client-Type': ['Discord'],
  'Client-Password': [process.env.DISCORD_PASSWORD]
}

export {header}

async function getRequestMake (address:string, requestData:object, message:Message) {
  return new Promise((resolve:(data:object) => void, reject:(err:Object) => void) => {
    axios.get (address, {
      headers : header,
      data: requestData
      }, )
      .then(res => {
        let responseData = res.data
        resolve(responseData)
      })
      .catch(err => {
        console.log('Error: ', err?.message);
        console.log(err?.response?.data?.error)
        if (err?.response?.data?.error === "ServerError: UserDataType for given user does not exist"){
          message.channel.send("Please use the `MakeUser` command to make a user to use LinksLists commands.")
        } else {
          reject(err)
        }
      
      });
  })

  }

export{getRequestMake}

async function postRequestMake (address:string, requestData:object, message:Message) {
  return new Promise ((resolve:(data:object) => void, reject:(err:object) => void ) => {
    axios.post (address, requestData, {
      headers : header
      }, )
      .then(res => {
        let responseData = res.data
        console.log(res)
        resolve(responseData)
      })
      .catch(err => {
        console.log('Error: ', err?.message);
        console.log(err?.data)
        if (err?.response?.data?.error === "ServerError: UserDataType for given user does not exist"){
          message.channel.send("Please use the `MakeUser` command to make a user to use LinksLists commands.")
        } else {
          reject(err)
        }
      })
  })
} 

export{postRequestMake}