const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

module.exports.execute = (client, message, args, ayar, emoji) => {
  if(!message.member.roles.cache.has("")) return message.react("772540868996759643");
  let yazilacakIsim;
      let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
  if (isim) {
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    yazilacakIsim = `${message.member.user.username.includes("◇") ? "◇" : ("◆" ? "◆" : ("◇" || "◇"))} ${isim}`;
    if(!isim) return message.react("772540868996759643");
  }
  let embed = new MessageEmbed()
	.setColor("010000")
	.setDescription(`
Kullanıcı adınızı \`${yazilacakIsim}\` olarak ayarladım.

**◇** BOOST SAYISI: \`${message.guild.premiumSubscriptionCount}\`
**◇** BOOST LEVELI: \`${message.guild.premiumTier}\`
`)
  .setFooter(conf.footer)
	message.channel.send(embed);
  message.member.setNickname(`${yazilacakIsim}`).catch(); 
};
module.exports.configuration = {
    name: "boost",
    aliases: ["b"],
    usage: "boost [üye]",
    description: "Belirtilen üyenin avatarını gösterir."
};