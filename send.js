import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend('re_5ppbjvPL_L7p7ZZDacffgRBC2UR7B9wWv');

async function sendMail() {
  try {
    const data = await resend.emails.send({
      from: 'Anant <noreply@xryptt.com>', // use your verified domain
      to: ['anantbansal05@gmail.com'],
      subject: 'Hello from Localhost',
      html: '<strong>This email was sent from localhost using Resend API 🚀</strong>',
    });

    console.log('Mail sent successfully:', data);
  } catch (error) {
    console.error('Error sending mail:', error);
  }
}


sendMail();
