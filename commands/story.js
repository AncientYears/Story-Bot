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

  } if(args[1]){
    let b = 0;
    let userID = args[0].split("@").pop()
    userID = userID.split(">").shift()
    console.log(userID)
    let specifiedAuthor = message.guild.members.get(userID)
    console.log(specifiedAuthor)
    let specificStoryEmbed = new discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor(args[1], specifiedAuthor.user.displayAvatarURL)
    pool.query(`SELECT * FROM stories WHERE id = '${userID}'`, function (error, results, fields) {
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
                  if(storyStorage[i].title == args[1]){   
                      specificStoryEmbed.addField('Introduction: ', storyStorage[i].introduction)
                      specificStoryEmbed.addField('Climax: ', storyStorage[i].climax)
                      specificStoryEmbed.addField('Conclusion: ', storyStorage[i].conclusion)
                  }
                  else{
                    b = b + 1;
                  }
              }
              if(b = storyStorage.length){
                specificStoryEmbed.addField('Could not find that story!', 'Sorry!')
              }
              message.channel.send(specificStoryEmbed)
              
          })
      
  }
  else if(args[0]){
    let userID = args[0].split("@").pop()
    userID = userID.split(">").shift()
    userID = userID.split("!").pop()
    console.log(userID)
    let specifiedAuthor = message.guild.members.get(userID)
    console.log(specifiedAuthor)
    let specificStoryEmbed = new discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor(specifiedAuthor.user.username + "'s stories", specifiedAuthor.user.displayAvatarURL)
    pool.query(`SELECT * FROM stories WHERE id = '${userID}'`, function (error, results, fields) {
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

