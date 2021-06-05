const { MessageEmbed } = require(`discord.js`);
const { PREFIX } = require(`../config.json`);
const db = require('quick.db');

module.exports = {
  name: `prefix`,
  description: `Sets a server specific Prefix`,
  aliases: ["setprefix"],
  cooldown: 5,
  edesc: `Type this Command, to set a server specific Prefix! Usage: ${PREFIX}prefix <NEW PREFIX>`,
 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor("#0000FF")
    .setTitle(`Current Prefix: \`${prefix}\``)
    .setFooter('Please provide a new prefix')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor("#0000FF")
    .setTitle(`🚫 You don\'t have permission for this Command!`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("#0000FF")
    .setTitle(`'❗The prefix can\'t have two spaces'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor("#0000FF")
    .setTitle(`✅ Successfully set new prefix to **\`${args[0]}\`**`))
  }
}
