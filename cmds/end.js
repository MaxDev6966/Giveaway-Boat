const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
  name: "end",
};

module.exports.run = async (client, message, args) => {
  let error = new MessageEmbed().setColor('RED').setTimestamp();
  if(!message.member.permissions.has('MANAGE_GUILD')) {
      return message.channel.send(error.setDescription('**❌ Missing Permission**'));
  };
  let gwId = args[0];
  if(!gwId) return message.channel.send(error.setDescription('**❌ Invalid Giveaway ID**'));
  let Id = client.db.fetch(`gwEnd_${message.guild.id}`);
  if(!Id) return message.channel.send(error.setDescription('**❌ Invalid Giveaway**'))
  if(Id.key == gwId) {
    let channel = Id.channel;
    let key = client.db.fetch(`gwUsers_${message.guild.id}`);
    if(!key) {
      let gwEndedEmbed = new MessageEmbed()
      .setDescription(`🎉 Prize: **${Id.prize}**\n:poop: Winner(s): **No winners!**`)
      .setColor('BLURPLE')
      .setTimestamp()
      .setFooter('Ended at');
      return message.guild.channels.cache.get(channel).messages.cache.get(gwId).edit({ embed: gwEndedEmbed }).then(() => {
        client.db.delete(`gwEntry_${message.guild.id}`),
        client.db.set(`gwReroll_${message.guild.id}`, { Set: 2 });
        client.channels.cache.get(channel).send(`Not Enough Entrants To Determine A Winner!`)
      });
    } else {
      let winners = client.db.get(`gwUsers_${message.guild.id}`)[Math.floor(Math.random()*client.db.get(`gwUsers_${message.guild.id}`).length)];
      let gwEndedEmbed = new MessageEmbed()
      .setDescription(`🎉 Prize: **${Id.prize}**\n💸 Winner(s): <@${winners}>`)
      .setColor('BLURPLE')
      .setTimestamp()
      .setFooter('Ended at');
      return message.guild.channels.cache.get(channel).messages.cache.get(gwId).edit({ embed: gwEndedEmbed }).then(() => {
        client.db.delete(`gwEntry_${message.guild.id}`),
        client.db.set(`gwReroll_${message.guild.id}`, { Set: 1 }),
        client.channels.cache.get(channel).send(`Congratulations <@${winners}>, you won the **${Id.prize}**!`)
      });
    };  
  } else {
    let embed2 = new MessageEmbed()
    .setDescription('**❌ No Giveaway Found With The ID**')
    .setColor('BLURPLE')
    .setTimestamp()
    .setFooter('Failed at');
    return message.channel.send(embed2);
  };
};