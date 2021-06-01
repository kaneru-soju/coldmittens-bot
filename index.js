// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// require the config.json file to grab our token and command prefix
const config = require('./config.json');

const command = require('./command.js');

// when the client is ready, run this code
client.on('ready', () => {
    console.log('The client is ready!');

    // commands that make the bot respond with Pong
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong');
    });

    // command that tells the bot to display the number of members in the server
    command(client, 'serverinfo', (message) => {
        // obtain guild object through destructuring of message
        const { guild } = message;

        // obtain name, region, memberCount, owner, and afkTimeout from guild object
        const { name, region, memberCount, owner, afkTimeout } = guild;
        const icon = guild.iconURL();

        // builds the embedded message
        const embed = new Discord.MessageEmbed()
        .setTitle(`Server info for ${name}`)
        .setThumbnail(icon)
        .addFields(
            {
                name: 'Region',
                value: region,
            },
            {
                name: 'Members',
                value: memberCount,
            },
            {
                name: 'Owner',
                value: owner.user.tag,
            },
            {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
            }
        )

        // sends the embedded message
        message.channel.send(embed);
    });

    // command that clears a channel of its messages (user needs admin permissions)
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            });
        };
    });

    // allows user to change the activiy status of the bot
    command(client, 'status', (message) => { 
        const content = message.content.replace('!status ', '');
        
        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        });
    });

    // fortune cookie command - picks a random fortune from a folder and displays it
    command(client, 'openfortune', (message) => {
        let member = message.author;
        number = 21;
        imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;

        const attachment = new Discord.MessageAttachment('./fortunes/fortune' + imageNumber + '.png', 'fortune' + imageNumber + '.png');

        const embed = new Discord.MessageEmbed()
        .setColor('#f1d37b')
        .setTitle(`${member.username}'s fortune is... `)
        .attachFiles(attachment)
        .setImage('attachment://fortune' + imageNumber + '.png')
        
        message.channel.send( {files: ['./cookies/fcookie.png']} );
        message.channel.send( {files: ['./cookies/fcookie_open.png']} );
        message.channel.send(embed);
    });

    // misfortune cookie command - picks a random misfortune from a channel and displays it
    command(client, 'openmisfortune', (message) => {
        let member = message.author;
        number = 25;
        imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;

        const attachment = new Discord.MessageAttachment('./fortunes/misfortune' + imageNumber + '.png', 'misfortune' + imageNumber + '.png');

        const embed = new Discord.MessageEmbed()
        .setColor('#4b4464')
        .setTitle(`${member.username}'s misfortune is... `)
        .attachFiles(attachment)
        .setImage('attachment://misfortune' + imageNumber + '.png')

        message.channel.send( {files: ['./cookies/mfcookie.png']} );
        message.channel.send( {files: ['./cookies/mfcookie_open.png']} );
        message.channel.send(embed);
    })
});

// login to Discord with your app's token
client.login(config.token);
