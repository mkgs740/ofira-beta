const { play } = require("../include/play");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);
const ytsr = require("youtube-sr")



module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Plays song from YouTube/Stream",
  cooldown: 1.5,
  edesc: `Type this command to play some music.\nUsage: ${PREFIX}play <TITLE | URL>`,
  
async execute(message, args, client) {
    if (!message.guild) return;
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!channel) return attentionembed(message, "Please join a Voice Channel first");
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return attentionembed(message, `You must be in the same Voice Channel as me`);
    if (!args.length)
      return attentionembed(message, `Usage: ${message.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`);
    message.react(approveemoji).catch(console.error);
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return attentionembed(message, "I need permissions to join your channel!");
    if (!permissions.has("SPEAK"))
      return attentionembed(message, "I need permissions to speak in your channel");


    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const urlValid = videoPattern.test(args[0]);


    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      filters: [],
      realseek: 0,
      playing: true
    };

    let songInfo = null;
    let song = null;

    try {
      if (serverQueue) {

        if (urlValid) {
          message.channel.send(new MessageEmbed().setColor("#0000FF")
            .setDescription(`**:notes: Searching 🔍 [\`LINK\`](${args.join(" ")})**`))

        }
        else {
          message.channel.send(new MessageEmbed().setColor("#0000FF")
            .setDescription(`**:notes: Searching 🔍 \`${args.join(" ")}\`**`))
        }
      } else {

        queueConstruct.connection = await channel.join();

        message.channel.send(new MessageEmbed().setColor("#0000FF")
          .setDescription(`**👍 Joined \`${channel.name}\` 📄 bound \`#${message.channel.name}\`**`)
          .setFooter(`By: ${message.author.username}#${message.author.discriminator}`))

        if (urlValid) {
          message.channel.send(new MessageEmbed().setColor("#0000FF")
            .setDescription(`**:notes: Searching 🔍 [\`LINK\`](${args.join(" ")})**`))

        }
        else {
          message.channel.send(new MessageEmbed().setColor("#0000FF")
            .setDescription(`**:notes: Searching 🔍 \`${args.join(" ")}\`**`))
        }

        queueConstruct.connection.voice.setSelfDeaf(true);
        queueConstruct.connection.voice.setDeaf(true);
      }
    }
    catch {
    }

    if (urlValid) {
      try {
        songInfo = await ytsr.searchOne(search) ;
        song = {
          title: songInfo.title,
          url: songInfo.url,
          thumbnail: songInfo.thumbnail,
          duration: songInfo.durationFormatted,
       };
      } catch (error) {
        if (error.statusCode === 403) return attentionembed(message, "Max. uses of api Key, please refresh!");
        console.error(error);
        return attentionembed(message, error.message);
      }
    } 

    else {
      try {

        songInfo = await ytsr.searchOne(search) ;
        song = {
          title: songInfo.title,
          url: songInfo.url,
          thumbnail: songInfo.thumbnail,
          duration: songInfo.durationFormatted,
       };
      } catch (error) {
        console.error(error);
        return attentionembed(message, error);        
      }                                                               
    }

    let thumb = "https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif"
    if (song.thumbnail === undefined) thumb = "https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif";
    else thumb = song.thumbnail.url;

    if (serverQueue) {

      let estimatedtime = Number(0);
      for (let i = 0; i < serverQueue.songs.length; i++) {
        let minutes = serverQueue.songs[i].duration.split(":")[0];   
        let seconds = serverQueue.songs[i].duration.split(":")[1];    
        estimatedtime += (Number(minutes)*60+Number(seconds));   
      }
      if (estimatedtime > 60) {
        estimatedtime = Math.round(estimatedtime / 60 * 100) / 100;
        estimatedtime = estimatedtime + " Minutes"
      }
      else if (estimatedtime > 60) {
        estimatedtime = Math.round(estimatedtime / 60 * 100) / 100;
        estimatedtime = estimatedtime + " Hours"
      }
      else {
        estimatedtime = estimatedtime + " Seconds"
      }
      serverQueue.songs.push(song);
      const newsong = new MessageEmbed()
        .setTitle(":notes:" + song.title)
        .setColor("#0000FF")
        .setThumbnail(thumb)
        .setURL(song.url)
        .setDescription(`\`\`\`Has been added to the Queue.\`\`\``)
        .addField("Estimated time until playing:", `\`${estimatedtime}\``, true)
        .addField("Position in queue", `**\`${serverQueue.songs.length - 1}\`**`, true)
        .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
        return serverQueue.textChannel
        .send(newsong)
        .catch(console.error);
      
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);
    try {
    
      play(queueConstruct.songs[0], message, client);
    } catch (error) {
      //if an error comes log
      console.error(error);
      message.client.queue.delete(message.guild.id);
      return attentionembed(message, `Could not join the channel: ${error}`);
    }
  }
};