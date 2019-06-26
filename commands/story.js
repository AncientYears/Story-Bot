const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')
let allStories = require('./createstory').stories

module.exports.run = async (client, message, args) => {
    if (!args[0]) { 
    let selectStoryEmbed = new discord.RichEmbed()
    .setAuthor('Stories', client.user.displayAvatarURL)    
    .setColor('GREEN')

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

    // {
    //     "author": "",
    //     "title": "", 
    //     "introduction": "",
    //     "plot": "",
    //     "climax": "",
    //     "conclusion": ""
    // }