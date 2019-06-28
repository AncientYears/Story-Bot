// requiring packages
const Discord = require('discord.js');
const fs = require('fs')
let mysql= require('mysql');

const client = new Discord.Client(); // bot user
client.commands = new Discord.Collection() // command collection

let prefix = '?' // prefix duh

let pool = mysql.createPool({ // mysql connection pool
  host     : require(`./config/token.js`).host,
  user     : require(`./config/token.js`).user,
  password : require(`./config/token.js`).password,
  database : require(`./config/token.js`).database
})


fs.readdir("./commands/", (err, files) => { // reading cmd folder
  if(err) confirm.error(err); // error checking
  let jsfiles = files.filter(f => f.split(".").pop() === "js"); // find command files
  if(jsfiles.length <= 0) { // check if there are commands
      console.log("No commands to load!");
      return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => { // loop through each command to load them
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      client.commands.set(props.help.name, props);
  });
});

client.on(`ready`, () => { // bot ready event
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`message`, message => { // bot message event
  if(message.author.bot) return; // dont reply to bot messages

    pool.query(`SELECT * FROM stories`, function (error, results, fields) { // connect to database table
      if (error) throw error; 

      if(!results.includes(message.author.id)) { // check if user id is stored, if not store it.
        pool.query(`INSERT IGNORE INTO stories SET id = '${message.author.id}'`);
      }
  })  


  if (!message.content.startsWith(prefix)) return; // prefix checker
  
	let args = message.content.slice(prefix.length).trim().split(/ +/); // command arguments
	let cmdname = args.shift().toLowerCase(); // command string
  let cmd = client.commands.get(cmdname) // actual command

  if(cmd) { // check if user ran a legit command
    cmd.run(client, message, args, pool); // export arguments
    }

});

client.login(require(`./config/token.js`).discordToken); // secret token stuff