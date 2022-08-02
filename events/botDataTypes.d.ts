import { Message } from "discord.js";

interface DiscordEvent {
  once:boolean;
  event_name: string;
  eventFunction: (a:any) => any;
}

interface ParsedData {
  message: Message;
  commandName: string;
  quotes?: string[];
  messageItems: string[];
}

interface Command {
  name:string;
  test:boolean;
  accountSpecific:boolean;
  command_name: string;
  command_aliases: string[];
  category: string[];
  about: string;
  syntax: string[];
  commandFunction: (a:ParsedData) => Promise<string>;
}