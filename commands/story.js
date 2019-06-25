const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let selectStoryEmbed = new discord.RichEmbed()
    .setAuthor('Stories', client.user.displayAvatarURL)    
    .addField('Story1', 'A brief summary...')
    .addField('Story2', 'A brief summary...')
    .addField('Story3', 'A brief summary...')
    .setDescription('?story <story> - Views a story\n?createstory - Creates a story')
    .setColor('GREEN')
    message.channel.send(selectStoryEmbed)    
}
}
module.exports.help = {    
    name: 'story',
    aliases: ['']
    }

    // {
    //     "author": "",
    //     "title": "", 
    //     "introduction": "",
    //     "plot": "",
    //     "climax": "",
    //     "conclusion": ""
    // }