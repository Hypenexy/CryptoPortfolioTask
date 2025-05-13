const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'crypto-portfolio',
    brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'crypto-portfolio-group' });

async function sendMessage(topic, message) {
    await producer.connect();
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}:`, message);
    await producer.disconnect();
}

async function consumeMessages(topic, callback) {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const parsedMessage = JSON.parse(message.value.toString());
            console.log(`Message received from topic ${topic}:`, parsedMessage);
            callback(parsedMessage);
        },
    });
}

module.exports = {
    sendMessage,
    consumeMessages,
};