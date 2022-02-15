import nodemailer from 'nodemailer'
require('dotenv').config();

class MailService {
   transporter;

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: 587,
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
         },

      })
  }
  
  
   async sendActivationMail(to: string, link: string) {
      await this.transporter.sendMail({
         from: process.env.SMTP_USER,
         to,
         subject: `Account activation on ${process.env.API_URL}`,
         text: '',
         html: `
            <div>
               <h1>Follow the link to activate the account.</h1>
               <a href="${link}">${link}</a>
            </div>
         `
      })
   }
}

export default new MailService();