// emailSenderService.ts
const { ConsumerService } = require('./consumerService');

const { connectToRabbitMQ } = require('./../config/rabbitmq');

const emailService = new ConsumerService();

async function startEmailSender() {
    const { channel } = await connectToRabbitMQ();

    const queue = 'email_queue';
    await channel.assertQueue(queue, { durable: true });

    console.log('Email Sender Service is waiting for messages. To exit press CTRL+C');

    channel.consume(queue, async (msg: any) => {
        if (msg) {
            const { to, subject, message } = JSON.parse(msg.content.toString());

            try {
                await emailService.sendEmail(to, subject, message);
                console.log(`Email sent to ${to} - Subject: ${subject}`);
            } catch (error: any) {
                console.error(`Error sending email to ${to}: ${error.message}`);
            } finally {
                channel.ack(msg);
            }
        }
    });
}

startEmailSender();
