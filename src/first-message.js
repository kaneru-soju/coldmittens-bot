// function that takes in the message and the reactions (recursive)
const addReactions = (message, reactions) => {
    // removes the zero index and shifts everything to left
    message.react(reactions[0]);
    reactions.shift();

    // calls addReactions method again...
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
}

// export a function that contains a client, and id for the text channel, the actual text, and an optional list of reactions
module.exports = async (client, id, text, reactions =[]) => {
    // get the channel
    const channel = await client.channels.fetch(id);

    // get the messages from the channel
    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            // Send a new message
            channel.send(text).then(message => {
                addReactions(message, reactions);
            });
        } else {
            // Edit the existing message
            for (const message of messages) {
                message[1].edit(text);
                addReactions(message[1], reactions);
            }
        }
    });
}