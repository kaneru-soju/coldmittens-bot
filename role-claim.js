// require firstMessage so the bot's first msg is the role-claim msg
const firstMessage = require('./first-message')

module.exports = (client) => {
    // channel for role reacts msg to be in
    const channelID = '851291972492984370';

    // function that passes in a key that returns the emojis desired...
    const getEmoji = emojiName => 
        client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const emojis = {
        acrobat: 'acrobat',
        clown: 'clown',
        contortionist: 'contortionist',
        firebreather: 'firebreather',
        fortuneteller: 'fortune teller',
        humancannonball: 'human cannonball',
        juggler: 'juggler',
        magician: 'magician',
        tightropewalker: 'tightrope walker',
        trapezeartist: 'trapeze artist'
    }

    const reactions = []

    let emojiText = 'Add a reaction to claim a job:\n\n';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];
        emojiText += `${emoji} = ${role}\n`;
    }

    firstMessage(client, channelID, emojiText, reactions);

    const handleReaction = (reaction, user, add) => {
        if (user.id === '851291972492984370') {
            return;
        }

        const emoji = reaction._emoji.name;
        
        const { guild } = reaction.message;

        const roleName = emojis[emoji];
        if (!roleName) {
            return;
        }

        const role = guild.roles.cache.find((role) => role.name === roleName);
        const member = guild.members.cache.find((member) => member.id === user.id);

        if (add) {
            member.roles.add(role);
        } else {
            member.roles.remove(role);
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, false);
        }
    });
}