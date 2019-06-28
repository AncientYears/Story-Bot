const discord = module.require("discord.js")

module.exports.run = async (client, message, args, pool) => {
    if (!args[0]) { // command ran by itself

        let filter = m => m.author.id == message.author.id; // filter

        let createStory = new discord.RichEmbed() // embed
            .setAuthor('Create A New Title', client.user.displayAvatarURL)
            .setDescription('Create a new title for your story (make this brief and catchy!)')
            .setColor('GREEN')
        message.channel.send(createStory) // send embed

        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }) // await messages :) 
            .then(collected => {
                let mappedTitle = collected.map(message => message.content).join()  // Record their answer & use later.

                createStory.setAuthor('Create A New Plot', client.user.displayAvatarURL),
                    createStory.setDescription('Write a new plot for your story (bear in mind the character limit is 2000!)')
                message.channel.send(createStory)


                message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }) // await messages :) 
                    .then(collected => {
                        mappedPlot = collected.map(message => message.content).join()  // Record their answer & use later.

                        createStory.setAuthor('Create A New Introduction', client.user.displayAvatarURL),
                            createStory.setDescription('Write a new introduction to your story (bear in mind the character limit is 2000!)')
                        message.channel.send(createStory)

                        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }) // await messages :) 
                            .then(collected => {
                                let mappedIntro = collected.map(message => message.content).join()  // Record their answer & use later.


                                createStory.setAuthor('Create A New Climax', client.user.displayAvatarURL),
                                    createStory.setDescription('Write a new climax to your story (bear in mind the character limit is 2000!)'),
                                    message.channel.send(createStory)

                                message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }) // await messages :) 
                                    .then(collected => {
                                        let mappedClimax = collected.map(message => message.content).join()  // Record their answer & use later.

                                        createStory.setAuthor('Create A New Conclusion', client.user.displayAvatarURL),
                                            createStory.setDescription('Write a new conclusion to your story (bear in mind the character limit is 2000!)')
                                        message.channel.send(createStory)

                                        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] }) // await messages :) 
                                            .then(collected => {
                                                let mappedConclusion = collected.map(message => message.content).join() // Record their answer & use later.

                                                let createStoryEmbed = new discord.RichEmbed() // inform user of their success in story creation.
                                                    .setAuthor('Author', message.author.displayAvatarURL)
                                                    .addField('Title: ', mappedTitle)
                                                    .addField('Plot: ', '\n' + mappedPlot)
                                                    .addField('Introduction: ', '\n' + mappedIntro)
                                                    .addField('Climax: ', '\n' + mappedClimax)
                                                    .addField('Conclusion: ', '\n' + mappedConclusion)
                                                    .setDescription('?story <story> - Views a story\n?createstory - Creates a story')
                                                    .setColor('GREEN')
                                                message.channel.send(createStoryEmbed) // Informed..

                                                var story = { // the recorded story.
                                                    "author": message.author.tag,
                                                    "title": mappedTitle,
                                                    "plot": mappedPlot,
                                                    "introduction": mappedIntro,
                                                    "climax": mappedClimax,
                                                    "conclusion": mappedConclusion,
                                                }
                                                pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) { // database query to find user stories
                                                    if (error) throw error;

                                                    let currentStory = results[0].storyJSON // find their story.
                                                    currentStory = JSON.parse(currentStory) // parse it

                                                    if (currentStory === null) {
                                                        // they have no story
                                                        // stringify story and send to database
                                                        let storyString = JSON.stringify(story)
                                                        return pool.query(`UPDATE stories SET storyJSON = '${storyString}' WHERE id = '${message.author.id}'`)
                                                    } else {
                                                        // they already have a story
                                                        let newStorArray = []
                                                        newStorArray.push(currentStory, story) // Push the old and new stories into array.
                                                        let merged = [].concat.apply([], newStorArray); // Flattens array into one object.
                                                        let newJSON = JSON.stringify(merged) // Stringify array
                                                        return pool.query(`UPDATE stories SET storyJSON = '${newJSON}' WHERE id = '${message.author.id}'`) // Send to database
                                                    }
                                                })
                                                 // Some error catching below here.
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