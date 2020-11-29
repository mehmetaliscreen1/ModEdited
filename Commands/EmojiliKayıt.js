const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');


module.exports.execute = async (client, message, args, ayar, emoji) => {

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(conf.footer).setColor(client.randomColor()).setTimestamp();
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.react(client.emojiler.iptal); //message.channel.send(embed.setDescription(`Kayıt komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let yazilacakIsim;
    if (db.get(`ayar.isim-yas`)) {
      let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
      let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
      if(!isim || !yaş) return message.channel.send(embed.setDescription("İsim bilgileri yanlış.!")).then(x => x.delete({timeout: 5000}));
      yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
    }

  message.channel.send(embed.setDescription(`
  ${uye} adlı kullanıcı erkek ise ${client.emojis.cache.get("776534266896449566")} emojisine, kız ise ${client.emojis.cache.get("776534550993436683")} emojisine basmalısın.
  `)).then(async mesaj => {
    await mesaj.react("776534266896449566");
    await mesaj.react("776534550993436683");

    const erkekemoji = (reaction, user) =>
      reaction.emoji.id === "776534266896449566" && user.id === message.author.id;
    const kadinemoji = (reaction, user) =>
      reaction.emoji.id === "776534550993436683" && user.id === message.author.id;

    const erkek = mesaj.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = mesaj.createReactionCollector(kadinemoji, { time: 10000 });

    erkek.on("collect", async striga => {
      mesaj.reactions.removeAll();
      mesaj.react(client.emojiler.onay);
      uye.roles.set(ayar.erkekRolleri);
      uye.setNickname(yazilacakIsim);
      mesaj.edit(embed.setDescription(`
${uye} kullanıcısına <@&775409865576677417>, <@&775405259841339406>, <@&775405285590171691> rolleri verildi.
Kullanıcının ismi \`${yazilacakIsim}\` olarak ayarlandı.
      `))

    });

    kadin.on("collect", async striga => {
      mesaj.reactions.removeAll();
      mesaj.react(client.emojiler.onay);
      uye.roles.set(ayar.kizRolleri);
      uye.setNickname(yazilacakIsim);
      mesaj.edit(embed.setDescription(`
${uye} kullanıcısına <@&775409957704433664>, <@&775405183114543144>, <@&775405234134188076> rolleri verildi.
Kullanıcının ismi \`${yazilacakIsim}\` olarak ayarlandı.
            `))
    });
  });

};
module.exports.configuration = {
    name: "kaydet",
    aliases: ['k', 'kayıt'],
    usage: "kayıt [üye]",
    description: "Emojili kayıt."
};