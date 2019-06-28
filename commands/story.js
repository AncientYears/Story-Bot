const discord = module.require("discord.js")

let storiesJSON = require('../stories.json')
let allStories = require('./createstory').stories

module.exports.run = async (client, message, args, pool) => {
  if (!args[0]) {
    let selectStoryEmbed = new discord.RichEmbed()
    message.channel.send(selectStoryEmbed).then(embedMessage => {
    pool.query(`SELECT * FROM stories`, function (error, results, fields) {
      if (error) throw error;

      for (i = 0; i < results.length; i++) {

        if (results[i].storyJSON) {

          let storyJSON = results[i].storyJSON
          let parsedStory = JSON.parse(storyJSON)

          for (inner = 0; inner < parsedStory.length; inner++) {
            if (selectStoryEmbed.fields.length > 3) {
              console.log(parsedStory[inner].title)
              embedMessage.react("▶")
              let filter = (reaction, user) => {
                return ['◀', '▶'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            embedMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '▶') {
          let reacted = reaction.users.find(user => user.id === message.author.id)

              for (inin = 0; inin < 3; inin++) {
              selectStoryEmbed.fields[inin].name = `${parsedStory[inner].title}`
              selectStoryEmbed.fields[inin].value = `${parsedStory[inner].plot}`
              embedMessage.edit(selectStoryEmbed)
              }
              reaction.remove(reacted.id)
              embedMessage.react("◀")
        }
        else {
            message.reply('Foward');
        }
    })
    .catch(collected => {
    });

            } else {
            selectStoryEmbed.addField(parsedStory[inner].title, parsedStory[inner].plot)
            selectStoryEmbed.setAuthor('Stories', client.user.displayAvatarURL)
            selectStoryEmbed.setColor('GREEN')
            embedMessage.edit(selectStoryEmbed)
          }
          }
        }
      }
    });
    })

  } if(args[0]){
    let specifiedAuthor = message.guild.members.get(args[0])
    console.log(specifiedAuthor)
    let specificStoryEmbed = new discord.RichEmbed()

    .setAuthor(specifiedAuthor.user.username + "'s stories", specifiedAuthor.user.displayAvatarURL)
    .setColor('GREEN')
    console.log(args[0])
    pool.query(`SELECT * FROM stories WHERE id = '${args[0]}'`, function (error, results, fields) {
        if(error) throw error;
        let storyStorage = []
        for(i = 0; i < results.length; i++){
            if(results[i].storyJSON){
                let storyObj = JSON.parse(results[i].storyJSON.split(","))
                for(i = 0; i < storyObj.length; i++) {
                    console.log(storyObj[i])
                    storyStorage.push(storyObj[i])
                }   
            }
            
        }
        for(i = 0; i < storyStorage.length; i++){
            if(args[0]){   
                specificStoryEmbed.addField(storyStorage[i].title, storyStorage[i].plot)
            }
        }
        message.channel.send(specificStoryEmbed)
        
    })
}
}



module.exports.help = {
  name: 'story',
}

