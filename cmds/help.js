const discord = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  description: "HELP.JS",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`Help Documents Overview:`)
    .setDescription("**Commands**\n\n```start, reroll, end```\n[Invite me](https://dsc.gg/giveaway.bot.2.0) | [Support Server](https://discord.gg/fuxyw3sAT6)")
    .setColor("#ffffff")
    .setImage("https://cdn.discordapp.com/attachments/933745764142829588/937547255890718780/standard.gif")
    .setFooter(`Giveawy Boat`)
  .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed)
    
  
  }
}