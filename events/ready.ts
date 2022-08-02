// function eventFunction(a:string) {
//   console.log(a)
// }

import { Client } from "discord.js"

const discordEvent:DiscordEvent = {
  once: true,
  event_name: "ready",
  eventFunction(client:Client) {
    console.log(`${client.user?.username} is ready!`)
    client.user?.setPresence({status: `idle`, afk: false, activities: [{name: `Use .h for help`}]}); 
  } 
}

export {discordEvent}