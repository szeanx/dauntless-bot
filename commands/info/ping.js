module.exports = {
    name: "ping",
    description: "Pong! Check latency",
    execute(message) {
        message.channel.send(
            `🏓 Latency is ${Date.now() - message.createdTimestamp}ms.`,
        );
    },
};
