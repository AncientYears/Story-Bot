const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 

    let csTitle = new discord.RichEmbed()
    .setAuthor('Create A New Title', client.user.displayAvatarURL)
    .addField('Create a new title for your story (make this brief and catchy!)')
    .setColor('GREEN')
    message.channel.send(csTitle)

    let filter = m => m.content.startsWith('?title');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userTitle)

    let csPlot = new discord.RichEmbed()
    .setAuthor('Create A New Plot', client.user.displayAvatarURL)
    .addField('Write a new plot for your story (keep this brief!)')
    .setColor('GREEN')
    message.channel.send(csPlot)

    filter = m => m.content.startsWith('?plot');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userPlot)
    
    let csIntro = new discord.RichEmbed()
    .setAuthor('Create A New Introduction', client.user.displayAvatarURL)
    .addField('Write a new introduction to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csIntro)
    
    filter = m => m.content.startsWith('?intro');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userIntro)

    let csClimax = new discord.RichEmbed()
    .setAuthor('Create A New Climax', client.user.displayAvatarURL)
    .addField('Write a new climax/middle to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csClimax)

    filter = m => m.content.startsWith('?climax');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userClimax)
    
    let csConclusion = new discord.RichEmbed()
    .setAuthor('Create A New Conclusion', client.user.displayAvatarURL)
    .addField('Write a new conclusion to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csConclusion)

    filter = m => m.content.startsWith('?conclusion');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userConclusion)

    let createStoryEmbed = new discord.RichEmbed()
    .setAuthor('Title: ', message.author.displayAvatarURL)    
    .addField('Plot: ', '\n' + userPlot)
    .addField('Introduction: ', '\n' + userIntro)
    .addField('Climax: ', '\n'+ userClimax)
    .addField('Conclusion: ', '\n' + userConclusion)
    .setDescription('?story <story> - Views a story\n?createstory - Creates a story')
    .setColor('GREEN')
    message.channel.send(createStoryEmbed)



       
}
}
module.exports.help = {    
    name: 'createstory',
    aliases: ['cs']
    }

    // {
    //     "author": "",
    //     "title": "", 
    //     "introduction": "",
    //     "plot": "",
    //     "climax": "",
    //     "conclusion": ""
    // }