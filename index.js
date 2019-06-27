const Discord = require('discord.js');
const fs = require('fs')
var mysql= require('mysql');

const client = new Discord.Client();
client.commands = new Discord.Collection()

let prefix = '?'

let pool = mysql.createPool({
  host     : require(`./config/token.js`).host,
  user     : require(`./config/token.js`).user,
  password : require(`./config/token.js`).password,
  database : require(`./config/token.js`).database
})

fs.readdir("./commands/", (err, files) => {
  if(err) confirm.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
      console.log("No commands to load!");
      return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      client.commands.set(props.help.name, props);
  });
});

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`message`, message => {
  if(message.author.bot) return;

    pool.query(`SELECT * FROM stories`, function (error, results, fields) {
      if (error) throw error;

      if(!results.includes(message.author.id)) {
        pool.query(`INSERT IGNORE INTO stories SET id = '${message.author.id}'`);
      }
  })  


  if (!message.content.startsWith(prefix)) return;
  
	let args = message.content.slice(prefix.length).trim().split(/ +/);
	let cmdname = args.shift().toLowerCase();
  let cmd = client.commands.get(cmdname)

  if(cmd) {
    cmd.run(client, message, args, pool);
    }

});

client.login(require(`./config/token.js`).discordToken);