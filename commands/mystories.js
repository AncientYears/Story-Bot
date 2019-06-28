const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')


module.exports.run = async (client, message, args, pool) => {
    if (!args[0]) { 
        let myStoriesEmbed = new discord.RichEmbed()
        myStoriesEmbed.setAuthor(message.author.username, message.author.displayAvatarURL)
        myStoriesEmbed.setColor('GREEN')

        pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) {
            if(error) throw error;
            let storyStorage = []
            for(i = 0; i < results.length; i++){
                if(results[i].storyJSON){
                    let storyObj = JSON.parse(results[i].storyJSON.split(","))
                    for(i = 0; i < storyObj.length; i++) {
                        storyStorage.push(storyObj[i])
                    }
                }
                
            }
            for(i = 0; i < storyStorage.length; i++){
                myStoriesEmbed.addField(storyStorage[i].title, storyStorage[i].plot)
                console.log(storyStorage[i])
            }
            message.channel.send(myStoriesEmbed)
            
        })
    }
    if(args[0]){
        let specificStoryEmbed = new discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor('GREEN')
        pool.query(`SELECT * FROM stories WHERE id = '${message.author.id}'`, function (error, results, fields) {
            if(error) throw error;
            let storyStorage = []
            for(i = 0; i < results.length; i++){
                if(results[i].storyJSON){
                    let storyObj = JSON.parse(results[i].storyJSON.split(","))
                    for(i = 0; i < storyObj.length; i++) {
                        storyStorage.push(storyObj[i])
                    }   
                }
                
            }
            for(i = 0; i < storyStorage.length; i++){
                if(storyStorage[i].title == args[0]){   
                    specificStoryEmbed.addField('Introduction: ', storyStorage[i].introduction)
                    specificStoryEmbed.addField('Climax: ', storyStorage[i].climax)
                    specificStoryEmbed.addField('Conclusion: ', storyStorage[i].conclusion)
                }
            }
            message.channel.send(specificStoryEmbed)
            
        })
    }
}

module.exports.help = {    
    name: 'mystories',
    }