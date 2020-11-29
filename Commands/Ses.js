const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

module.exports.execute = (client, message, args, ayar, emoji) => {

 let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.react("772540868996759643");
  if(!uye.voice.channel) return message.react("772540868996759643");
let selfMt = uye.voice.selfMute ? "mikrofonu **kapalı**" : "mikrofonu **açık**";
let selfDf = uye.voice.selfDeaf ? "kulaklığı **kapalı.**" : "kulaklığı **açık**.";
  let embed = new MessageEmbed()
  .setColor("010000")
  .setFooter(conf.footer)
  .setDescription(`
  ${uye} adlı kullanıcı şu anda \`${message.guild.channels.cache.get(uye.voice.channelID).name}\` adlı ses kanalında ayrıca ${selfMt}, ${selfDf}
  `)
	message.channel.send(embed);
};
module.exports.configuration = {
    name: "voice",
    aliases: ["ses"],
    usage: "ses [üye]",
    description: "Belirtilen üyenin ses bilgilerini gönderir.."
};