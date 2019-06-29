const discord = module.require("discord.js")

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
                let mappedTitle = collected.map(message => message.content).join()
                if (mappedTitle.length > 100) return message.reply('Title too long, Max 100 characters!')
                createStory.setAuthor('Create A New Summary', client.user.displayAvatarURL),
                    createStory.setDescription('Write a new summary for your story (bear in mind the character limit is 1000!)')
                message.channel.send(createStory)


                message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
                    .then(collected => {
                        mappedPlot = collected.map(message => message.content).join()
                        if (mappedPlot.length > 1000) return message.reply('Summary too long, Max 1000 characters!')

                        createStory.setAuthor('Create A New Introduction', client.user.displayAvatarURL),
                            createStory.setDescription('Write a new introduction to your story (bear in mind the character limit is 1000!)')
                        message.channel.send(createStory)

                        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
                            .then(collected => {
                                let mappedIntro = collected.map(message => message.content).join()
                                if (mappedIntro.length > 1000) return message.reply('Introduction too long, Max 1000 characters!')


                                createStory.setAuthor('Create A New Climax', client.user.displayAvatarURL),
                                    createStory.setDescription('Write a new climax to your story (bear in mind the character limit is 1000!)'),
                                    message.channel.send(createStory)

                                message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
                                    .then(collected => {
                                        let mappedClimax = collected.map(message => message.content).join()
                                        if (mappedClimax.length > 1000) return message.reply('Climax too long, Max 1000 characters!')

                                        createStory.setAuthor('Create A New Conclusion', client.user.displayAvatarURL),
                                            createStory.setDescription('Write a new conclusion to your story (bear in mind the character limit is 1000!)')
                                        message.channel.send(createStory)

                                        message.channel.awaitMessages(filter, { max: 1, time: 300000, errors: ['time'] })
                                            .then(collected => {
                                                let mappedConclusion = collected.map(message => message.content).join()
                                                if (mappedConclusion.length > 1000) return message.reply('Conclusion too long, Max 1000 characters!')

                                                let createStoryEmbed = new discord.RichEmbed()
                                                    .setAuthor('Author', message.author.displayAvatarURL)
                                                    .addField('Title: ', mappedTitle)
                                                    .addField('Plot: ', '\n' + mappedPlot)
                                                    .addField('Introduction: ', '\n' + mappedIntro)
                                                    .addField('Climax: ', '\n' + mappedClimax)
                                                    .addField('Conclusion: ', '\n' + mappedConclusion)
                                                    .setDescription('?story @user - Views all users stories!\n?story @user <story> - Views someones story\n?createstory - Creates a story')
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
                                                console.log(story)
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
                                                        let newJSON = JSON.stringify(merged)
                                                        return pool.query(`UPDATE stories SET storyJSON = '${newJSON}' WHERE id = '${message.author.id}'`)
                                                    }
                                                })

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