const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(conf.footer).setColor(client.randomColor()).setTimestamp();
  if(!ayar.banciRolleri) return; //message.channel.send(embed.setDescription("Sunucuda herhangi bir `YASAKLAMA(BAN)` rolü tanımlanmamış. `PANEL` komutunu kullanmayı deneyin.")).then(x => x.delete({timeout: 5000}));
  if(!ayar.banciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.react(client.emojiler.iptal); //message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "Sebep belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirttiğiniz ID'ye dair bir ban bulunamadı.")).then(x => x.delete({timeout: 5000})));
    message.react(client.emojiler.onay).catch();
    if(ayar.banLogKanali && client.channels.cache.has(ayar.banLogKanali)) client.channels.cache.get(ayar.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter(conf.footer).setDescription(`
  ${message.author} adlı yetkili \`${kisi.tag}\` adlı kullanıcının yasaklamasını kaldırdı.
    `));
  } else {
    message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
  };
};
module.exports.configuration = {
  name: "unban",
  aliases: ["yasak-kaldır"],
  usage: "unban [id] [isterseniz sebep]",
  description: "Belirtilen kişinin banını kaldırır."
};