const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let userTitle, userPlot, userIntro, userClimax, userConclusion;

    let filter = m => m.author.id == message.author.id;

    let createStory = new discord.RichEmbed()
    .setAuthor('Create A New Title', client.user.displayAvatarURL)
    .addField('Create a new title for your story (make this brief and catchy!)')
    .setColor('GREEN')

    message.channel.send(createStory).then((msg) => {

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected = userTitle),

        msg.edit(
            setAuthor('Create A New Plot', client.user.displayAvatarURL),
            setDescription('Write a new plot for your story (bear in mind the character limit is 2000!)')),

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected = userPlot),

        msg.edit(
            setAuthor('Create A New Introduction', client.user.displayAvatarURL),
            setDescription('Write a new introduction to your story (bear in mind the character limit is 2000!)')),

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected = userIntro),

        msg.edit(
        setAuthor('Create A New Climax', client.user.displayAvatarURL),
        setDescription('Write a new climax to your story (bear in mind the character limit is 2000!)')),

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected = userClimax),

        msg.edit(
            setAuthor('Create A New Conclusion', client.user.displayAvatarURL),
            setDescription('Write a new conclusion to your story (bear in mind the character limit is 2000!)')),

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected = userConclusion)
    
    })


    let createStoryEmbed = new discord.RichEmbed()
    .setAuthor('Author: ', message.author.displayAvatarURL) 
    .addField('Title: ', userTitle)   
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