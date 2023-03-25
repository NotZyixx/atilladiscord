const fs = require('fs');

module.exports = {
  name: 'top-server',
  description: 'En çok oy alan sunucuları sıralar.',
  execute(message, args) {
    let database = { db: [] };
    if (fs.existsSync('./database.json')) {
      database = JSON.parse(fs.readFileSync('./database.json'));
    }

    const serverList = database.db.sort((a, b) => b.serverVotePoints - a.serverVotePoints).slice(0, 10); // En çok oy alan 10 sunucuyu sıralar
    let response = `<:2617connectionicon:1087458425799192636> **${message.author.tag}** en çok oy alan **10** sunucu listelendi: \n\n`;

    serverList.forEach((server, index) => {
      let emoji = '';
      if (index === 0) {
        emoji = '<:8863guildownerdarktheme:1087458427569193000>';
      } else if (index === 1) {
        emoji = '<:3053paidsubscription:1087458430412923044>';
      } else if (index === 2) {
        emoji = '<:1979freesubscriptiondark:1087458433801932871>';
      } else if (index === 3) {
        emoji = '<:5961freesubscriptionwhite:1087458436175908906>';
      }
      response += `${emoji} **${index + 1}.** **${server.serverID || 'ID Belirlenemedi'}** idli server, Oy sayısı: **${server.serverVotePoints}** \n`;
    });

    message.channel.send(response);
  }
};