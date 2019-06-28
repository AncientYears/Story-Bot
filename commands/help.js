const discord = module.require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let helpEmbed = new discord.RichEmbed()
    .setAuthor('Help', client.user.displayAvatarURL)    
    .setColor('GREEN')
    .addField('To view the stored stories, use ?story ', "***THIS IS WIP AND YOU SHOULDN'T USE THIS YET!***")
    .addField('To create your own story, use: ', '?createstory')
    .addBlankField()
    .addField('The format is by pasting parts of the story in order: ', 'Title, Plot, Introduction, Climax, Conclusion.')
    .addBlankField()
    .addField('To ping, use: ', '?ping')

    message.channel.send(helpEmbed)
    }
}

module.exports.help = {    
    name: 'help',
    }