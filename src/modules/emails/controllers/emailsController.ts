
import { Request, Response } from 'express';
import { connectToRabbitMQ } from '../../../config/rabbitmq';

export class EmailsController {

    async sendEmail(req: Request, res: Response) {
        try {
            const { to, subject, message } = req.body;

            if (!to || !subject || !message) {
                return res.status(400).json({ message: 'Missing required parameters', status: false, data: null });
            }

            const { channel } = await connectToRabbitMQ();
            const emailQueue = 'email_queue';

            // Send email message to RabbitMQ
            channel.sendToQueue(emailQueue, Buffer.from(JSON.stringify({ to, subject, message })));

            res.status(200).json({ message: 'Email sent successfully', status: true });

        } catch (error: any) {

            res.status(500).json({ message: error.message, status: false });
        }
    }
}