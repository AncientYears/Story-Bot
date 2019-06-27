const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

let allStories = [];


module.exports = { stories: allStories }

module.exports.run = async (client, message, args, pool) => {
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
                                                    .setAuthor('Author', message.author.displayAvatarURL)
                                                    .addField('Title: ', mappedTitle)
                                                    .addField('Plot: ', '\n' + mappedPlot)
                                                    .addField('Introduction: ', '\n' + mappedIntro)
                                                    .addField('Climax: ', '\n' + mappedClimax)
                                                    .addField('Conclusion: ', '\n' + mappedConclusion)
                                                    .setDescription('?story <story> - Views a story\n?createstory - Creates a story')
                                                    .setColor('GREEN')
                                                message.channel.send(createStoryEmbed)

                                                var story = {
                                                    "author": message.author.tag,
                                                    "title": mappedTitle,
                                                    "plot": mappedPlot,
                                                    "introduction": mappedIntro,
                                                    "climax": mappedClimax,
                                                    "conclusion": mappedConclusion,
                                                }

                                                
                                                pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) {
                                                    if (error) throw error;
                                                
                                                let currentStory = results[0].storyJSON
                                                currentStory = JSON.parse(currentStory)

                                                if (currentStory === null) {
                                                    let storyString = JSON.stringify(story)
                                                    return pool.query(`UPDATE stories SET storyJSON = '${storyString}' WHERE id = '${message.author.id}'`)
                                                } else {
                                                    
                                                    let newStorArray = []
                                                    newStorArray.push(currentStory, story)
                                                    let merged = [].concat.apply([], newStorArray);
                                                    console.log(merged)
                                                    let newJSON = JSON.stringify(merged)
                                                    console.log(newJSON)
                                                    return pool.query(`UPDATE stories SET storyJSON = '${newJSON}' WHERE id = '${message.author.id}'`)
                                                }

                                            //    let newStory = story.concat(currentStory)
                                             //   let storyJSON = JSON.stringify(newStory)

                                                //pool.query(`UPDATE stories SET storyJSON = '${storyJSON}' WHERE id = '${message.author.id}'`)
                                                //pool.query(`UPDATE stories SET storyJSON = '${storyJSON}' WHERE id = '${message.author.id}'`);
                                                    
                                                })
                                                //allStories.unshift(story)

                                            }).catch(e => message.reply('Time is up, you can find your draft using ?mystories') && console.log(e))
                                    }).catch(e => message.reply('Time is up, you can find your draft using ?mystories') && console.log(e))
                            }).catch(e => message.reply('Time is up, you can find your draft using ?mystories') && console.log(e))
                    }).catch(e => message.reply('Time is up, you can find your draft using ?mystories') && console.log(e))
            }).catch(e => message.reply('Time is up, you can find your draft using ?mystories') && console.log(e))
    }
}
module.exports.help = {
    name: 'createstory'
}