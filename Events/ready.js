
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const conf = require('../ayarlar.json');
const ayar = db.get('ayar') || {};
const client = global.client;
module.exports = () => {
  console.log("Bot aktif!");
  client.user.setActivity(conf.footer);
  if (ayar.botSesKanali && client.channels.cache.has(ayar.botSesKanali)) client.channels.cache.get(ayar.botSesKanali).join().catch();
}
module.exports.configuration = {
  name: "ready"
}