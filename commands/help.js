const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let helpEmbed = new discord.RichEmbed()
    .setAuthor('Help', client.user.displayAvatarURL)    
    .setColor('GREEN')
    .addField('To view the stored stories, use: ', '?story')
    .setDescription('Sorted by new (fetched from database)')
    .addField('To create your own story, use: ', '?createstory')
    .setDescription('The format is by pasting parts of the story in order,\nTitle, Plot, Introduction, Climax, Conclusion.')
    .addField('To ping, use: ', '?ping')
    .setDescription('Testing purposes.')

    message.channel.send(helpEmbed)
    }
}

module.exports.help = {    
    name: 'help',
    }