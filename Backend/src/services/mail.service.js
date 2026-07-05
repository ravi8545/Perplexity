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


//notes 

// "Brevo ek Email Service Provider (ESP) hai jo applications se transactional emails, jaise email verification, OTP aur password reset emails, reliably send karne ke liye use hota hai."

// Ya aur short:

// "Brevo ek email sending service hai jo API ya SMTP ke through applications se emails bhejne ke liye use hoti hai."