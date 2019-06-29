const discord = module.require("discord.js")

module.exports.run = async (client, message, args, pool) => {
  if (!args[0]) {
    /*let pageStories = []
    let pages = []
    let page = 1
    let perPage = 3
    let selectStoryEmbed = new discord.RichEmbed()
    .setColor('GREEN')

    message.channel.send(selectStoryEmbed).then(embedMessage => {

    pool.query(`SELECT * FROM stories`, function (error, results, fields) {
      if (error) throw error;
      
      for(i = 0; i < results.length; i++){
        //console.log(results[i])
        if(results[i].storyJSON){
          pages.push(JSON.parse(results[i].storyJSON.split(",")))
        }
      }
      let merged = [].concat.apply([], pages)
      for(i = perPage-3; i < perPage; i++) {
        if(merged[i]){
          selectStoryEmbed.addField(merged[i].title, merged[i].author)
        }
      }
      let pagesneeded = Math.ceil(merged.length/3)
          selectStoryEmbed.setFooter('Page: ' + page + ' of ' + (pagesneeded))
          embedMessage.edit(selectStoryEmbed)

            embedMessage.react('◀').then(r => {
              embedMessage.react('▶')
            })

            let backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id
            let forwardFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id

            let backwards = embedMessage.createReactionCollector(backwardsFilter, { time: 60000 })
            let forwards = embedMessage.createReactionCollector(forwardFilter, { time: 60000 })

            backwards.on('collect', r => {
              if (page === 1) return;
              r.remove(message.author.id)
              page--;
              perPage -= 3
              selectStoryEmbed.setFooter('Page: ' + page + ' of ' + pages.length)
              for (i = perPage-3; i < perPage; i++) {
                for (iv = 0; iv < 3; iv++) {
                  selectStoryEmbed.fields[iv].name = merged[i].title 
               selectStoryEmbed.fields[iv].value = merged[i].author

              }
              embedMessage.edit(selectStoryEmbed)
            }
            })

            forwards.on('collect', r => {
              if (page === pages.length) return;
              r.remove(message.author.id)
              page++;
              perPage += 3
              selectStoryEmbed.setFooter('Page: ' + page + ' of ' + pages.length)
              for (i = perPage-3; i < perPage; i++) {
                for (iv = 0; iv < 3; iv++) {
                  if (i < merged.length) { 
                    console.log(merged[i])
                  selectStoryEmbed.fields[iv].name = merged[i].title 
               selectStoryEmbed.fields[iv].value = merged[i].author
                  }
              }
            }
            embedMessage.edit(selectStoryEmbed)
          })
    })
    })
    */
   message.channel.send('This feature is currently in WIP and does not work.')
  }
  if (args[1]) {
    let totalargs = []
    args.forEach(element => {
      if (!(element == args[0]))
        totalargs.push(element)
    });
    let b = 0;
    let userID = args[0].split("@").pop()
    userID = userID.split(">").shift()
    let specifiedAuthor = message.guild.members.get(userID)
    let specificStoryEmbed = new discord.RichEmbed()
      .setColor('GREEN')
      .setAuthor(totalargs.join(' '), specifiedAuthor.user.displayAvatarURL)
    pool.query(`SELECT * FROM stories WHERE id = '${userID}'`, function (error, results, fields) {
      if (error) throw error;
      let storyStorage = []
      for (i = 0; i < results.length; i++) {
        if (results[i].storyJSON) {
          let storyObj = JSON.parse(results[i].storyJSON.split(","))
          for (i = 0; i < storyObj.length; i++) {
            storyStorage.push(storyObj[i])
          }
        }

      }
      for (i = 0; i < storyStorage.length; i++) {
        if (storyStorage[i].title == totalargs.join(' ')) {
          specificStoryEmbed.addField('Introduction: ', storyStorage[i].introduction)
          specificStoryEmbed.addField('Climax: ', storyStorage[i].climax)
          specificStoryEmbed.addField('Conclusion: ', storyStorage[i].conclusion)
          b = 0
        } else if (storyStorage[i] != totalargs.join(' ')) {
          b = b + 1
        }
      }
      if (b === storyStorage.length) {
        specificStoryEmbed.addField('Could not find that story!', 'Sorry!')
      }
      message.channel.send(specificStoryEmbed)

    })

  }
  else if (args[0]) {
    let userID = args[0].split("@").pop()
    userID = userID.split(">").shift()
    userID = userID.split("!").pop()
    let specifiedAuthor = message.guild.members.get(userID)
    let specificStoryEmbed = new discord.RichEmbed()
      .setColor('GREEN')
      .setAuthor(specifiedAuthor.user.username + "'s stories", specifiedAuthor.user.displayAvatarURL)
    pool.query(`SELECT * FROM stories WHERE id = '${userID}'`, function (error, results, fields) {
      if (error) throw error;
      let storyStorage = []
      for (i = 0; i < results.length; i++) {
        if (results[i].storyJSON) {
          let storyObj = JSON.parse(results[i].storyJSON.split(","))
          for (i = 0; i < storyObj.length; i++) {
            storyStorage.push(storyObj[i])
          }
        }

      }
      for (i = 0; i < storyStorage.length; i++) {
        if (args[0]) {
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

