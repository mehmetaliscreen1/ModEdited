const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");

module.exports.execute = (client, message, args, ayar, emoji) => {

   let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   let reason = args.splice(1).join(" ") || `Sebep belirtilmedi.`;
   let kullanıcılar = await qdb.get(`forceban_${message.guild.id}`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
  
  if(args[0] === "liste") {
    message.channel.send(new MessageEmbed().setColor(client.randomColor()).setFooter(conf.footer).setTimestamp().addField(`${kullanıcılar ? kullanıcılar.map(x => x.slice(1)).join('\n') : "Bulunamadı!"}`))
    return
  } 
  if(!kullanıcı || isNaN(kullanıcı) || kullanıcı.length > 20 || kullanıcı.length < 10) return message.reply(`${client.emojis.cache.get(client.emojiler.iptal)} açılmaz ban olarak etiketlenecek kullanıcının ID numarasını girmelisin.`)
  if(kullanıcılar && kullanıcılar.some(id => `k${kullanıcı}` === id)) {
    db.delete(`forceban_${message.guild.id}`, `k${kullanıcı}`)
      kullanıcılar.forEach(v => {
      if (!v.includes(`k${kullanıcı}`)) {
        db.push(`forceban_${message.guild.id}`, v)
      }
      })
    message.guild.unban(kullanıcı)
    message.channel.send(`**${kullanıcı}** ID'li kullanıcı artık sunucuya girebilecek!`)
  } else {
    await db.push(`forceban_${message.guild.id}`, `k${kullanıcı}`)
    if(message.guild.members.has(kullanıcı)) {
      await message.guild.members.cache.get(kullanıcı).send(`\`${message.guild.name}\` sunucusundan kalıcı olarak yasaklandın!`)
      await message.guild.ban(kullanıcı, {reason: "Forceban"})
    }
    message.channel.send(`**${kullanıcı}** ID'li kullanıcı artık sunucuya giremeyecek!`)
  }
};

module.exports.configuration = {
  name: "acilmazban",
  aliases: ["aban","açılmazban","açılmaz-ban","acilmazban"],
  usage: "acilmazban [üye]",
  description: "Açılmayan ban atar."
};

client.on("guildMemberAdd", async(member) => {
  let djstürkiye = await db.get(`forceban_${member.guild.id}`)
  if(djstürkiye && djstürkiye.some(id => `k${member.user.id}` === id)) {
    try {
  member.ban({reason: 'Forceban'})
    } catch(err) { console.log(err) }
  }
})