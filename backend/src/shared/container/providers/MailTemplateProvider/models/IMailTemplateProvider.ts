import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(template: IParseMailTemplateDTO): Promise<string>;
}
