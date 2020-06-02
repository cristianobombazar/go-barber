import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}

type IEmailReceiver = IEmailContact;
type IEmailSender = IEmailContact;

export default interface ISendMailDTO {
  to: IEmailReceiver;
  from?: IEmailSender;
  subject: string;
  template: IParseMailTemplateDTO;
}
