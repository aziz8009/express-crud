// emailService.ts
import nodemailer from 'nodemailer';

export class ConsumerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'smtp', // e.g., 'gmail'
            host: 'azmi.tech',
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: 'aziz@azmi.tech',
                pass: 'Mabdulaziz@2014Tix',
            },
        });

    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'aziz@azmi.tech',
            to,
            subject,
            text,
        };

        return this.transporter.sendMail(mailOptions);
    }

}
