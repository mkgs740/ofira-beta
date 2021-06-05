const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Invite the bot to your server.",
  execute(message, client) {

    let inviteEmbed = new MessageEmbed()
      .setTitle("ADD ME TO IN YOU'RE SERVER")
      .setDescription("MADE WITH LOVE BY [SAURABH-777](https://github.com/SAURABH-777)")
      .setColor("#0000FF")
      .setAuthor("${client.user.username}")
      .setThumbnail(message.guild.iconURL())
      .addField(`INVITE ME FOLLOWING LINK`, 'https://discord.com/oauth2/authorize?client_id=${msg.client.user.id}&permissions=8&scope=bot', true)

    inviteEmbed.setTimestamp();

    return message.channel.send(inviteEmbed).catch(console.error);
  }
};
