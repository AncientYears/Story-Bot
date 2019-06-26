const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 

    let filter = m => m.author.id == message.author.id;

    let createStory = new discord.RichEmbed()
    .setAuthor('Create A New Title', client.user.displayAvatarURL)
    .setDescription('Create a new title for your story (make this brief and catchy!)')
    .setColor('GREEN')
    message.channel.send(createStory)    

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
            let mappedTitle = collected.map(message => message.content)

            createStory.setAuthor('Create A New Plot', client.user.displayAvatarURL),
            createStory.setDescription('Write a new plot for your story (bear in mind the character limit is 2000!)')
            message.channel.send(createStory)    
            

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(collected => { 
            mappedPlot = collected.map(message => message.content)
            
            createStory.setAuthor('Create A New Introduction', client.user.displayAvatarURL),
            createStory.setDescription('Write a new introduction to your story (bear in mind the character limit is 2000!)')
            message.channel.send(createStory)    

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
            let mappedIntro = collected.map(message => message.content)

        
            createStory.setAuthor('Create A New Climax', client.user.displayAvatarURL),
            createStory.setDescription('Write a new climax to your story (bear in mind the character limit is 2000!)'),
            message.channel.send(createStory)    

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
            let mappedClimax = collected.map(message => message.content)

            createStory.setAuthor('Create A New Conclusion', client.user.displayAvatarURL),
            createStory.setDescription('Write a new conclusion to your story (bear in mind the character limit is 2000!)')
            message.channel.send(createStory)    

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
            let mappedConclusion = collected.map(message => message.content)

                


    let createStoryEmbed = new discord.RichEmbed()
    .setAuthor('Author: ', message.author.displayAvatarURL) 
    .addField('Title: ', mappedTitle)   
    .addField('Plot: ', '\n' + mappedPlot)
    .addField('Introduction: ', '\n' + mappedIntro)
    .addField('Climax: ', '\n'+ mappedClimax)
    .addField('Conclusion: ', '\n' + mappedConclusion)
    .setDescription('?story <story> - Views a story\n?createstory - Creates a story')
    .setColor('GREEN')
    message.channel.send(createStoryEmbed)

}).catch(e => message.reply('Time is up, you can find your draft using ?mystories'))
}).catch(e => message.reply('Time is up, you can find your draft using ?mystories'))
}).catch(e => message.reply('Time is up, you can find your draft using ?mystories'))
}).catch(e => message.reply('Time is up, you can find your draft using ?mystories'))
}).catch(e => message.reply('Time is up, you can find your draft using ?mystories'))
}
}
module.exports.help = {    
    name: 'createstory'
    }

    // {
    //     "author": "",
    //     "title": "", 
    //     "introduction": "",
    //     "plot": "",
    //     "climax": "",
    //     "conclusion": ""
    // }