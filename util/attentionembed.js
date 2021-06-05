const { MessageEmbed } = require("discord.js");
const { denyemoji } = require(`../config.json`);
module.exports = {
 async  attentionembed(message, titel) {

    try{
      await message.reactions.removeAll();
       await message.react(denyemoji);
      }catch{
        }

    let resultsEmbed = new MessageEmbed()
      .setTitle(":x: " + titel)
      .setColor("#0000FF")
      
      message.channel.send(resultsEmbed);
    return;

  }
};
