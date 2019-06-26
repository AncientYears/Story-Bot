const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let userTitle, userPlot, userIntro, userClimax, userConclusion;

    let filter = m => m.author.id == message.author.id;

    let createStory = new discord.RichEmbed()
    .setAuthor('Create A New Title', client.user.displayAvatarURL)
    .setDescription('Create a new title for your story (make this brief and catchy!)')
    .setColor('GREEN')

    message.channel.send(createStory).then((msg) => {

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {

            createStory.setAuthor('Create A New Plot', client.user.displayAvatarURL),
            createStory.setDescription('Write a new plot for your story (bear in mind the character limit is 2000!)')
            msg.edit(createStory).catch(e => console.log(e))

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => { 

        msg.edit(createStory).catch(e => console.log(e))
            createStory.setAuthor('Create A New Introduction', client.user.displayAvatarURL),
            createStory.setDescription('Write a new introduction to your story (bear in mind the character limit is 2000!)')

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected => {

        msg.edit(createStory).catch(e => console.log(e))
        createStory.setAuthor('Create A New Climax', client.user.displayAvatarURL),
        createStory.setDescription('Write a new climax to your story (bear in mind the character limit is 2000!)'),

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected => {

        msg.edit(createStory).catch(e => console.log(e))
            createStory.setAuthor('Create A New Conclusion', client.user.displayAvatarURL),
            createStory.setDescription('Write a new conclusion to your story (bear in mind the character limit is 2000!)')
        msg.edit(createStory).catch(e => console.log(e))

        message.channel.awaitMessages(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected => {

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
}).catch(e => console.log(e))
}).catch(e => console.log(e))
}).catch(e => console.log(e))
}).catch(e => console.log(e))
}).catch(e => console.log(e))
        })
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