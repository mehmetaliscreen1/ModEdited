const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const db = new qdb.table("ayarlar");
const mdb = new qdb.table("level");
const sdb = new qdb.table("istatistik");
const conf = require('../ayarlar.json');
const kdb = new qdb.table("kullanici");

module.exports.execute = async(client, message, args, ayar, emoji) => {
  if(!client.kullanabilir(message.author.id)  && !message.member.roles.cache.has(ayar.enAltYetkiliRolu) && !message.member.roles.cache.has(ayar.sahipRolu) && message.member.roles.cache.has(ayar.komutCezasi) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.react(client.emojiler.iptal);

  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  
  let guild = message.guild;
  let yetkiliBilgisi = ``;
    let teyit = kdb.get(`teyit.${uye.id}`) || {};
    if(!client.kullanabilir(message.author.id) && !message.member.roles.cache.has(ayar.sahipRolu) && !ayar.teyitciRolleri.some(r => message.member.roles.cache.has(r)) && !message.member.roles.cache.has("732302944707543160") && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için yetkili olman gerekiyor.")).then(x => x.delete({timeout: 5000}));
    if(teyit){
      let erkekTeyit = teyit.erkek || 0;
      let kizTeyit = teyit.kiz || 0;
      yetkiliBilgisi += `Kullanıcının toplam **${erkekTeyit+kizTeyit}** teyiti bulundu. (**${erkekTeyit}** erkek, **${kizTeyit}** kız)`;
    }
  let victim = kullanici;
  const embed = new MessageEmbed().setTimestamp().setColor(client.randomColor().setFooter(conf.footer))
  .setDescription(yetkiliBilgisi)
    message.channel.send(embed);
};
module.exports.configuration = {
    name: `teyit`,
    aliases: [],
    usage: "teyit [üye]",
    description: "Belirtilen üyenin teyit bilgilerini gösterir."
};