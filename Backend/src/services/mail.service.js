import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

transporter
    .verify()
    .then(() => {
        console.log("Ready to send emails");
    })
    .catch((err) => {
        console.error("Error setting up email transporter:", err);
    });

export async function sendEmail({ to, subject, html, text }) {
    const info = await transporter.sendMail({
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text,
    });

    console.log("Email sent:", info.messageId);
}