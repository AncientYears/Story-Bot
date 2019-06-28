const discord = module.require("discord.js")

module.exports.run = async (client, message, args) => {
    // Testing command at the start that made sure the bot is properly connected to discord
    const pingEmbed = new discord.RichEmbed()
    .setAuthor('Bot Latency', client.user.avatarURL)
    .addField('Ping', Math.round(client.ping) + 'ms');

message.channel.send(pingEmbed);
}
module.exports.help = {    
    name: 'ping',
    aliases: ['pong']
    }