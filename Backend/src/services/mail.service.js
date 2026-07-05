import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

export async function sendEmail({ to, subject, html, text }) {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Perplexity",
                email: "raviprajapati8545@gmail.com",
            },
            to: [
                {
                    email: to,
                },
            ],
            subject,
            htmlContent: html,
            textContent: text,
        });

        console.log("Email sent:", result);
    } catch (err) {
        console.error("Brevo Error:", err);
        throw err;
    }
}