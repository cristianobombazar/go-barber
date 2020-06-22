import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';
import Notification from '../../infras/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationRepository {
  // eslint-disable-next-line prettier/prettier
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipientId });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;