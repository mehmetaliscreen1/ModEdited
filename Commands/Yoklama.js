const { MessageEmbed } = require("discord.js");
const conf = require("../ayarlar.json");

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(conf.footer).setColor(client.randomColor()).setTimestamp();
  if(!ayar.sahipRolu) return; //message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!message.member.roles.cache.has(ayar.sahipRolu)) return message.react(client.emojiler.iptal); //message.channel.send(embed.setDescription(`Yoklama komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  if(!message.member.voice || message.member.voice.channelID != ayar.toplantiSesKanali) return;
  
  let members = message.guild.members.cache.filter(member => member.roles.cache.has(ayar.katildiRolu) && member.voice.channelID != ayar.toplantiSesKanali);
  members.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.remove(ayar.katildiRolu).catch();
    }, index * 1250)
  });
  let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(ayar.katildiRolu) && !member.user.bot)
  verildi.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.add(ayar.katildiRolu).catch();
    }, index * 1250)
  });
  message.channel.send(embed.setDescription(`
  **${verildi.size}** kadar kişiye katıldı rolü verilip **${members.size}** kadar kişiden alındı!
  `)).catch();
};
module.exports.configuration = {
  name: "yoklama",
  aliases: ['katıldı'],
  usage: "yoklama",
  description: "Katıldı rolü dağıtır."
};