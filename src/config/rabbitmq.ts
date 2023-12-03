// rabbitmq.ts
import * as amqp from 'amqplib';

export async function connectToRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
}
