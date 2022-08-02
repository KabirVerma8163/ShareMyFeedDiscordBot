import { Guid } from 'guid-typescript'
import { ObjectId, Types } from 'mongoose';

interface LinkType {
  link_id: Guid;
  link_name:string;
  link_url: string;
  type: string;
  link_tags: Map<string, boolean>;
  list_categories: string[];
  read: boolean;
  read_users: ObjectId;
  // link_comments: []Map<string,
}

interface LinksList {
  owner_username: string;
  user_name: string;
  user_data_id: ObjectId;
  access_ids: Map<ObjectId, string[]>;
  list_name: string;
  links: LinkType[];
  categories: string[];
  link_accessibility: string[];
  description: string;
}

interface DiscordAccount {
  discord_username:string;
  discord_discriminator:number;
  discord_id:string;
  other_details:object;
}

