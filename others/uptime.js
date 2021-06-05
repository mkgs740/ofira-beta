const { MessageEmbed } = require(`discord.js`);
module.exports = {
  name: `uptime`,
  description: `Gives you the uptime of the Bot`,
  aliases: [],
  cooldown: 5,
  edesc: "With that you can see how long the Bot has been running nonstop",
  execute(message, args, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    message.react("✅");
    return message.channel.send(new MessageEmbed().setColor("#0000FF").setTitle(`***${client.user.username}'s Uptime:***\n\n\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\n\``));

  }
}
