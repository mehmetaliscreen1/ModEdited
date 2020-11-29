const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const conf = require('../ayarlar.json');
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");

module.exports.execute = async (client, message, args, ayar, emoji) => {
1
  if (message.member.roles.highest.position <= uye.roles.highest.position) return; //message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  args = args.filter(a => a !== "" && a !== " ").splice(1);
  let yazilacakIsim;
  if (db.get(`ayar.isim-yas`)) {
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(embed.setDescription("İsim bilgileri yanlış.!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } else {
    let isim = args.join(' ');
    if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
  };
      if (ayar.teyitsizRolleri && ayar.teyitsizRolleri.some(rol => uye.roles.cache.has(rol))) kdb.add(`teyit.${message.author.id}.erkek`, 1);
      await uye.roles.set(ayar.erkekRolleri || []).catch();
    uye.setNickname(`${yazilacakIsim}`).catch();
    if(ayar.tag && uye.user.username.includes(ayar.tag)) uye.roles.add(ayar.ekipRolu).catch();
    message.channel.send(new MessageEmbed().setColor(client.randomColor()).setFooter(conf.footer).setTimestamp().setDescription(`
${uye} adlı kullanıcıya ${uye.roles.cache.filter(a => a.name !== "@everyone").map(x => x).join(', ')} rolleri verildi.
Kullanıcının ismi \`${yazilacakIsim}\` olarak ayarlandı.
    `)).catch();
};
module.exports.configuration = {
  name: "erkek",
  aliases: ["e", "erkek", "man", "boy"],
  usage: "erkek [üye] [isim] [yaş]",
  description: "Belirtilen üyeyi erkek olarak kaydeder."
};