import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SesMailProvider from '@shared/container/providers/MailProvider/implementations/SesMailProvider';
import { container } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import mailConfig from '@config/mail';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SesMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
