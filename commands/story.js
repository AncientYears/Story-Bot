const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')
let allStories = require('./createstory').stories

module.exports.run = async (client, message, args, pool) => {        
    if (!args[0]) { 
        let selectStoryEmbed = new discord.RichEmbed()
        pool.query(`SELECT * FROM stories`, function (error, results, fields) {
            if (error) throw error;
            console.log(results.length)

            for (i = 0; i <= results.length; i++) {
            let storyJSON = results[i].storyJSON
            let storyObj = JSON.parse(storyJSON)
            selectStoryEmbed.addField('wip', 'wip')
        }
            selectStoryEmbed.setAuthor('Stories', client.user.displayAvatarURL)    
            selectStoryEmbed.setColor('GREEN')

        })


    allStories.forEach(function(item, index, array) {
        selectStoryEmbed.addField(array[index].title, array[index].author)
        console.log(allStories)
    })

    message.channel.send(selectStoryEmbed)    
} else if(args.join(' ')) {
    // Search for the story in the json file 
    console.log(storiesJSON)
    message.channel.send(args.join(' '))
}
}

module.exports.help = {    
    name: 'story',
    }

