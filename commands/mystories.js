const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')

storyStorage = []

module.exports.run = async (client, message, args, pool) => {
    if (!args[0]) { 
        let myStoriesEmbed = new discord.RichEmbed()
        myStoriesEmbed.setAuthor(message.author.username, message.author.displayAvatarURL)
        myStoriesEmbed.setColor('GREEN')

        pool.query(`SELECT * FROM stories`, function (error, results, fields) {
            if(error) throw error;
            for(i = 0; i < results.length; i++){
                if(results[i].id == message.author.id){
                    if(results[i].storyJSON){
                        let storyObj = JSON.parse(results[i].storyJSON.split(","))
                        for(i = 0; i < storyObj.length; i++) {
                            storyStorage.push(storyObj[i])
                        }
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
}

module.exports.help = {    
    name: 'mystories',
    }