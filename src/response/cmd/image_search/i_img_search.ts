import * as Discord from "discord.js"

interface iImgSearch {
  author: Discord.User;
  message: Discord.Message;
  search: string;
  urls: Array<string>;
  page: number;
  position: number;
  timer: NodeJS.Timeout;
}
export default iImgSearch
