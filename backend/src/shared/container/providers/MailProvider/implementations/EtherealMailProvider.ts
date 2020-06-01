import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {

  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }


  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'GoBarber Team <cristiaano.bombazar@gmail.com>',
      to,
      subject: 'Recovery your password',
      text: body,
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
