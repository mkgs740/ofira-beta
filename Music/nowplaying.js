const createBar = require("string-progressbar");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);


module.exports = {
  name: "nowplaying",
  aliases: ['np',"now-playing","current","current-song"],
  description: "Show current song",
  cooldown: 5,
  edesc: `Type nowplaying in chat, to see which song is currently playing! As well as how long it will take until its finished\nUsage: ${PREFIX}nowplaying`,
  
execute(message) {
    if(!message.guild) return;
    message.react(approveemoji)
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return attentionembed(message, "There is nothing playing.").catch(console.error);
    const song = queue.songs[0];
    let minutes = song.duration.split(":")[0];   
    let seconds = song.duration.split(":")[1];    
    let ms = (Number(minutes)*60+Number(seconds));   
    let thumb;
    if (song.thumbnail === undefined) thumb = "https://media.giphy.com/media/P4OLEIP94nLi63K9JM/giphy.gif";
    else thumb = song.thumbnail.url;
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = ms - seek;
    let nowPlaying = new MessageEmbed()
          .setAuthor('♪Now playing♪','https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif','https://github.com/SAURABH-777')
          .setDescription(`[**${song.title}**](${song.url})`)
          .setThumbnail(song.thumbnail.url)
          .setColor("#0000FF")
          .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
      if(ms >= 10000) {
        nowPlaying.addField("\u200b", "🔴 LIVE", false);
        return message.channel.send(nowPlaying);
      }
      if (ms > 0 && ms<10000) {
        nowPlaying.addField("\u200b", "**``[" + createBar((ms == 0 ? seek : ms), seek, 25, "▬", "🔘")[0] + "]``**\n**" + "\n[" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8))+ "]**" + "\n" + "\n **Time Remaining:**" + "``" + new Date(left * 1000).toISOString().substr(11, 8) + "``", false );
        return message.channel.send(nowPlaying);
      }
  }
};
