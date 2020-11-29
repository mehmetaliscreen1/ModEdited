const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const conf = require('../ayarlar.json');

// module.exports.onLoad = (client) => {}
module.exports.execute = (client, message, args, ayar, emoji) => {

  
  const embed = new MessageEmbed().setTimestamp().setColor(client.randomColor()).setFooter(conf.footer);
  message.channel.send(embed.setDescription(`
Sunucumuzda toplam ${client.emojiSayi(`${message.guild.memberCount}`)} adet üye bulunmaktadır.
Sunucumuzda toplam ${client.emojiSayi(`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`)} adet aktif üye bulunmaktadır.
Sunucumuzda toplam ${message.guild.members.cache.filter(m => m.user.username.includes(ayar.tag)).size} adet taglı üye bulunmaktadır.
    `));



};

module.exports.configuration = {
    name: "say",
    aliases: ["count"],
    usage: "say",
    description: "Sunucu sayımı."
};