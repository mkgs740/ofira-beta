const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);


module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Toggle music loop",
  cooldown: 3,
  edesc: `Just type the Command in the chat to activate/deactivate loop, you can also react to the loop emoji, to receive the same goal!\nUsage: ${PREFIX}loop`,
execute(message) {
    if(!message.guild) return;
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, "There is nothing playing").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    queue.loop = !queue.loop;
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#0000FF" : "#0000FF")
    .setAuthor(`Loop is now ${queue.loop ? " enabled" : " disabled"}`, "https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif")
    message.react(approveemoji);
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
