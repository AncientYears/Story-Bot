const discord = module.require("discord.js")

module.exports.run = async (client, message, args, pool) => {
    if (!args[0]) {  // Command ran by itself
        let myStoriesEmbed = new discord.RichEmbed() // embed
        myStoriesEmbed.setAuthor(message.author.username, message.author.displayAvatarURL)
        myStoriesEmbed.setColor('GREEN')

        pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) { // Searching user stories
            if(error) throw error; // Error catching
            let storyStorage = [] 
            for(i = 0; i < results.length; i++){ // Loop through each result
                if(results[i].storyJSON){ // Check for stories
                    let storyObj = JSON.parse(results[i].storyJSON.split(",")) // Parse user stories
                    for(i = 0; i < storyObj.length; i++) { // Loop through parsed-user stories
                        storyStorage.push(storyObj[i]) // Push them into storage array
                    }
                }
                
            }
            for(i = 0; i < storyStorage.length; i++){ // Loop through storage array
                myStoriesEmbed.addField(storyStorage[i].title, storyStorage[i].plot) // Add embed field
            }
            message.channel.send(myStoriesEmbed) // Send.
            
        })
    }
    if(args[0]){ // If first argument ?mystories @user
        let specificStoryEmbed = new discord.RichEmbed() // embed
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor('GREEN')
        pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) { // Search user stories
            if(error) throw error; // Error handling
            let storyStorage = [] // story storage
            for(i = 0; i < results.length; i++){ // loop through search results
                if(results[i].storyJSON){ // Check for stories
                    let storyObj = JSON.parse(results[i].storyJSON.split(",")) // Parse user stories
                    for(i = 0; i < storyObj.length; i++) { // Loop through parsed user stories
                        storyStorage.push(storyObj[i]) // Push them into storage array
                    }   
                }
                
            }
            for(i = 0; i < storyStorage.length; i++){ // Loop through storage array
                if(storyStorage[i].title == args[0]){ // Check if argument matches story title, if it does show story!
                    specificStoryEmbed.addField('Introduction: ', storyStorage[i].introduction)
                    specificStoryEmbed.addField('Climax: ', storyStorage[i].climax)
                    specificStoryEmbed.addField('Conclusion: ', storyStorage[i].conclusion)
                }
            }
            message.channel.send(specificStoryEmbed) // Send the story!
            
        })
    }
}

module.exports.help = {    
    name: 'mystories',
    }