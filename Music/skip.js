const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);

module.exports = {
  name: "skip",
  aliases: ["se"],
  description: "Skip the currently playing song",
  cooldown: 5,
  edesc: `Type the Command, to skip to current listening song.\nUsage: ${PREFIX}skip`,

execute(message) {
    if (!message.guild) return;
    message.react(approveemoji).catch(console.error);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return attentionembed(message, "There is nothing you can skip!").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(
      new MessageEmbed().setColor("#0000FF").setAuthor(`${message.author.username} skipped the song.`, "https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif")
    ).catch(console.error);
  }
};
