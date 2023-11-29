import nodemailer from 'nodemailer';
import type { Request, Response} from "express"

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: true,
    auth: {
        user: 'leads@sellickelectric.com',
        pass: `${process.env.REACT_APP_MAIL_APP_PASS}`,
    },
});

export async function sendEmail({ name, email, phone, address, workProposal }: any) {
    const message = {
        from: 'leads@sellickelectric.com',
        to: 'leads@sellickelectric.com',
        subject: 'New Lead From Website',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            Work Proposal: ${workProposal}
        `,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
                reject('Failed to send email');
            } else {
                console.log('Email sent successfully:', info.response);
                resolve('Email sent successfully');
            }
        });
    });
}

export const mailer = async (req: Request, res: Response) => {
    try {
        await sendEmail(req.body);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}
