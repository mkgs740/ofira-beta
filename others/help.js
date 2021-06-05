const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: `help`,
  description: `Gives you a list of all help Commands`,
  aliases: ["h","commands"],
  cooldown: 3,
  edesc: "Type help to get a short preview of all Commands, Type help <COMMANDNAME> to get extended information about this one command!",
  async execute(message, args, client) {
    const embed = new MessageEmbed()
    .setColor("#0000FF")
    .setTitle(`Hey, This is ${message.guild.me.displayName}! A discord bot which aims to proivde rich quality music to everyone.`)
    .setAuthor(`${message.guild.me.displayName} - Help Menu`, message.guild.me.user.avatarURL())
    .addFields(
      { name: '• config [1]', value: '`setprefix,`', inline: false },
      { name: '• Filters [14]', value: '`bassboost,` `8D,` `vaporwave,` `nightcore,` `phaser,` `tremolo,` `vibrato,` `surrounding,` `pulsator,` `subboost,` `chorus,` `karaoke,` `sofa,` `desilencer,` `clear,`', inline: false },
      { name: '• Music [18]', value: '`play,` `join,` `leave,` `loop,` `lyrics,` `move,` `nowplaying,` `pause,` `queue,` `remove,` `search,` `shuffle,` `skip,` `stop,` `volume,` `filter,`', inline: false },
      { name: '• Utility [4]', value: '`help,` `invite,` `uptime,` `ping,`', inline: false }
      )
    .setThumbnail(client.user.displayAvatarURL())
          message.channel.send(embed);
       }
}
