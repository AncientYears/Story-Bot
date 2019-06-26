const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 

    let csTitle = new discord.RichEmbed()
    .setAuthor('Create A New Title', client.user.displayAvatarURL)
    .addfield('Create a new title for your story (make this brief and catchy!)')
    .setColor('GREEN')
    message.channel.send(csTitle)

    const filter = m => m.content.startsWith('?title');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userTitle)

    let csPlot = new discord.RichEmbed()
    .setAuthor('Create A New Plot', client.user.displayAvatarURL)
    .addfield('Write a new plot for your story (keep this brief!)')
    .setColor('GREEN')
    message.channel.send(csPlot)

    const filter = m => m.content.startsWith('?plot');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userPlot)
    
    let csIntro = new discord.RichEmbed()
    .setAuthor('Create A New Introduction', client.user.displayAvatarURL)
    .addfield('Write a new introduction to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csIntro)
    
    const filter = m => m.content.startsWith('?intro');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userIntro)

    let csClimax = new discord.RichEmbed()
    .setAuthor('Create A New Climax', client.user.displayAvatarURL)
    .addfield('Write a new climax/middle to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csClimax)

    const filter = m => m.content.startsWith('?climax');
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected = new userClimax)
    
    let csConclusion = new discord.RichEmbed()
    .setAuthor('Create A New Conclusion', client.user.displayAvatarURL)
    .addfield('Write a new conclusion to your story (bear in mind the character limit is 2000!)')
    .setColor('GREEN')
    message.channel.send(csConclusion)

    const filter = m => m.content.startsWith('?conclusion');
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