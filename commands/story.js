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

  } else if (args.join(' ')) {
    // Search for the story in the json file 
    console.log(storiesJSON)
    message.channel.send(args.join(' '))
  }
}

module.exports.help = {
  name: 'story',
}

