const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(conf.footer).setColor(client.randomColor()).setTimestamp();
  if(!ayar.muteRolu || !ayar.muteciRolleri) return; //message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!ayar.muteciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.react(client.emojiler.iptal); //message.channel.send(embed.setDescription(`Temp Mute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return; //message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempmute`) || [];
  let sure = args[1];
  let reason = args.splice(2).join(" ") || `Sebep belirtilmedi.`;
  if(!sure || !ms(sure)) return message.channel.send(embed.setDescription("Süre bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
  await uye.roles.add(ayar.muteRolu).catch();
  if (!muteler.some(j => j.id == uye.id)) {
    jdb.push(`tempmute`, {id: uye.id, kalkmaZamani: Date.now()+ms(sure)})
    kdb.add(`kullanici.${message.author.id}.mute`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "MUTE",
      Sebep: reason,
      Zaman: Date.now()
    });
  };
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${sure}** boyunca **${reason}** nedeniyle mutelendi!`)).catch();
  if(ayar.muteLogKanali && client.channels.cache.has(ayar.muteLogKanali)) client.channels.cache.get(ayar.muteLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${sure}** boyunca **${reason}** nedeniyle mutelendi!`)).catch();
};
module.exports.configuration = {
  name: "tempmute",
  aliases: ['tempsusturmak', 'sürelimute', 'geçici-mute'],
  usage: "tempmute [üye] [süre] [sebep]",
  description: "Belirtilen üyeyi süreli muteler."
};