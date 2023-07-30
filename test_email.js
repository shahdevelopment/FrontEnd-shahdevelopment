const nodeMailer = require('nodemailer');

require('dotenv').config()


const html = `
    <h1>Hello World</h1>
    <p>Isn't nodeamiler useful?</p>
`;

var username = process.env.user_email
var password = process.env.user_password

const transporter = nodeMailer.createTransport({
    host: 'shahdevelopment.tech',
    port: 25,
    secure: true,
    auth: {
        user: username,
        pass: password
    }
})
async function sendEmail() {
    try {
        const info = await transporter.sendMail({
            from: username,
            to: 'shahjehan-solehria@hotmail.com',
            subject: 'Test Email',
            text: 'This is a test email.',
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendEmail()
    .catch(e => console.log(e))