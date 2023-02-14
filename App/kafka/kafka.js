const {Kafka} = require("kafkajs");



////////////////////////////////////////////////////        KAFKA         ////////////////////////////////////////////////////
const run = async (socket) => {

    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092', 'localhost:9093'],

        
    })
    
    //PRODUCER
    const producer = kafka.producer({ groupId: 'test-group' })
    await producer.connect()
    await producer.send({
    topic: 'quickstart-events',
    messages: [
    { value: '---------------MESSAGE----------------' },
     ],
    })

    

    //CONSUMER
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect();
    await consumer.subscribe({ topic: 'quickstart-events', fromBeginning: true })
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          })
          socket.emit("message_from_kafka", message.value.toString())
        },
    })
}

module.exports = run;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////