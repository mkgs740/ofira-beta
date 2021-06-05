const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { play } = require("../include/play")
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);


module.exports = {
  name: "filter",
  description: "Set Audio - Effects",
  aliases: ["f"],
  cooldown: 3,
  edesc: `Type this Command to change the current audio effect - style \nUsage: ${PREFIX}filter <Filtertype>`,

  async execute(message, args, client) {
    if (!message.guild) return;
    const { channel } = message.member.voice;
    const queue = message.client.queue.get(message.guild.id);
    message.react(approveemoji).catch(console.error);
    if (message.channel.activeCollector)
      return attentionembed(message, "There is a search active!");
    if (!message.member.voice.channel)
      return attentionembed(message, "Please join a Voice Channel first")
    if (queue && channel !== message.guild.me.voice.channel)
      return attentionembed(message, `You must be in the same Voice Channel as me`);
    const filters = [
      'bass=g=20,dynaudnorm=f=200',
      'apulsator=hz=0.08',
      'aresample=48000,asetrate=48000*0.8',
      'aresample=48000,asetrate=48000*1.25',
      'aphaser=in_gain=0.4',
      'tremolo',
      'vibrato=f=6.5',
      'surround',
      'apulsator=hz=1',
      'asubboost',
      'chorus=0.5:0.9:50|60|40:0.4|0.32|0.3:0.25|0.4|0.3:2|2.3|1.3',
      'stereotools=mlev=0.015625',
      'sofalizer=sofa=/path/to/ClubFritz12.sofa:type=freq:radius=2:rotation=5',
      'silenceremove=window=0:detection=peak:stop_mode=all:start_mode=all:stop_periods=-1:stop_threshold=0',
      "remove",
    ];
    let varforfilter; let choice;
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;
        break;
      case "8D":
        varforfilter = 1;
        break;
      case "vaporwave":
        varforfilter = 2;
        break;
      case "nightcore":
        varforfilter = 3;
        break;
      case "phaser":
        varforfilter = 4;
        break;
      case "tremolo":
        varforfilter = 5;
        break;
      case "vibrato":
        varforfilter = 6;
        break;
      case "surrounding":
        varforfilter = 7;
        break;
      case "pulsator":
        varforfilter = 8;
        break;
      case "subboost":
        varforfilter = 9;
        break;
      case "chorus":
        varforfilter = 10;
        break;
      case "karaoke":
        varforfilter = 11;
        break;
      case "sofa":
        varforfilter = 12;
        break;
      case "desilencer":
        varforfilter = 13;
        break;
      case "clear":
        varforfilter = 14;
        break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(new MessageEmbed()
        .setColor("#0000FF")
        .setTitle("Not a valid Filter, use one of those:")
        .setDescription(`
        \`bassboost\`
        \`8D\`
        \`vaporwave\`
        \`nightcore\`
        \`phaser\`
        \`tremolo\`
        \`vibrato\`
        \`surrounding\`
        \`pulsator\`
        \`subboost\`
        \`chorus\`
        \`karaoke\`
        \`sofa\`
        \`desilencer\`
        \`clear\`   ---  removes all filters`)
        .setFooter(`Example: ${PREFIX}filter bassboost`)
        )
        break;
    }
    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    try {
      const song = queue.songs[0];
      message.channel.send(new MessageEmbed()
      .setColor("#0000FF")
      .setAuthor("Applying: " + args[0], "https://media.discordapp.net/attachments/819179592706162749/821694151216857128/Music.gif","https://discord.com/api/oauth2/authorize?client_id=792627126037774336&permissions=8&scope=bot")).then(msg =>{
        msg.delete({timeout: 2000});
      })
      play(song, message, client, choice);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};