import notifee from '@notifee/react-native';
import { getItemFromAsync } from '../hooks/requests';
import * as RootNavigation from '../routes/navigation';

export function routeNoti(payload) {
  const { type, dateComment, dateLike, followMap } = payload;
  switch (type) {
    case 'comment':
      RootNavigation.push('DateComment', {
        title: dateComment.date.title,
        dateId: dateComment.date.id,
        mainImg: dateComment.date.mainImg,
        createdAt: dateComment.date.createdAt,
        from: 'noti',
      });
      break;

    case 'commentMention':
      RootNavigation.push('DateComment', {
        title: dateComment.date.title,
        dateId: dateComment.date.id,
        mainImg: dateComment.date.mainImg,
        createdAt: dateComment.date.createdAt,
        from: 'noti',
      });
      break;

    case 'like':
      RootNavigation.push('DateDetail', {
        dateId: dateLike.date.id,
        title: dateLike.date.title,
      });
      break;

    case 'follow':
      RootNavigation.push('User', {
        userId: followMap.follower.id,
        nickname: followMap.follower.nickname,
      });
      break;

    default:
      break;
  }
}

export async function notiToScreen(data) {
  const userId = await getItemFromAsync('userId');
  const { receiver, payload } = data;
  if (userId !== receiver.id) return;
  notifee.decrementBadgeCount();
  routeNoti(payload);
}

export async function getToken() {
  const idToken = await getItemFromAsync('idToken');
  return idToken;
}
