import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailSender {
  private transporter: Transporter;

  constructor(private config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
      //console.log('Email sent successfully');
    } catch (error) {
      //console.error('Error sending email:', error);
      throw error;
    }
  }
}

export default EmailSender;