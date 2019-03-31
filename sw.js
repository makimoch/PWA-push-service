// sw.js
// ServiceWorker側のコード

// pushイベント
// … プッシュでメッセージを受信した時に発生
self.addEventListener('push', event => {
  // 受信したメッセージ
  const pushMessage = event.data.text();

  // 通知の表示
  const title = 'プッシュ通知を受信しました';
  const options = { body: pushMessage };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// notificationclickイベント
// … 通知をクリックした時に発生
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});