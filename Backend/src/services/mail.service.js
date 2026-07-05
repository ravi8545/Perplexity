import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    family: 4,

    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },

    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,
});

transporter
    .verify()
    .then((success) => {
        console.log("Verify Success:", success);
    })
    .catch((err) => {
        console.error("Verify Error:", err);
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