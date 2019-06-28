const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')
let allStories = require('./createstory').stories

storyStorage = []

module.exports.run = async (client, message, args, pool) => {        
    if (!args[0]) { 
        let selectStoryEmbed = new discord.RichEmbed()
        pool.query(`SELECT * FROM stories`, function (error, results, fields) {
            if (error) throw error;

            for (i = 0; i < results.length; i++) {
            if(results[i].storyJSON) {

                let storyJSON = results[i].storyJSON

                let parsedStory = JSON.parse(storyJSON)

                if (parsedStory[i] !== undefined) {
                console.log(parsedStory[i])
                }
            }
            //    titles.push(parsedStory[i].title)
          //      plots.push(parsedStory[i].plot)

            //    console.log(titles)
            //    console.log(plots)
                  //  selectStoryEmbed.addField(parsedStory[i].title, parsedStory[i].plot)
                 



         //       let storyObj = JSON.parse(storyJSON)
              //  storyStorage.push((i + 1) + storyObj.title, (i + 1) + storyObj.plot)
            
        }
      //      console.log(storyStorage)
     //       selectStoryEmbed.setAuthor('Stories', client.user.displayAvatarURL)    
       //     for(i = 0; i < storyStorage.length; i++){
      //          selectStoryEmbed.addField(storyStorage[i])
        //    }
            selectStoryEmbed.setColor('GREEN')
            message.channel.send(selectStoryEmbed)    

        })

} else if(args.join(' ')) {
    // Search for the story in the json file 
    console.log(storiesJSON)
    message.channel.send(args.join(' '))
}
}

module.exports.help = {    
    name: 'story',
    }

