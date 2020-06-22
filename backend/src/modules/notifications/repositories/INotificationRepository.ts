import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infras/typeorm/schemas/Notification';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
