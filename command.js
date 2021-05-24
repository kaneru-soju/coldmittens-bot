// require the config.json file to grab the prefix
const { prefix } = require('./config.json');

// allows exporting of values from modules
module.exports = (client, aliases, callback) => {
    // makes sure commands are strings
    if (typeof aliases === 'string') {
        aliases = [aliases];
    }

    // when the client is ready
    client.on('message', message => {
        const { content } = message;    

        // log to the console each command that is run and callback to execute the command
        aliases.forEach(alias => {
            const command = `${prefix}${alias}`;

            if (content.startsWith(`${command} `) || content === command) {
                console.log(`Running the command ${command}`);
                callback(message);
            }
        });
    });
}