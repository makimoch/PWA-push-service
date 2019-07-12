// APIからアクセストークンを受け付ける
//省略

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post("/bot/webhook", line.middleware(line_config), (req, res, next) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  res.sendStatus(200);

  // すべてのイベント処理のプロミスを格納する配列。
  let events_processed = [];

  // イベントオブジェクトを順次処理。
  req.body.events.forEach(event => {
    // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
    if (event.type == "message" && event.message.type == "text") {
      // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
      if (event.message.text == "こんにちは") {
        // replyMessage()で返信し、そのプロミスをevents_processedに追加。
        events_processed.push(
          bot.replyMessage(event.replyToken, {
            type: "text",
            text: "これはこれは"
          })
        );
      }
    }
  });

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(events_processed).then(response => {
    console.log(`${response.length} event(s) processed.`);
  });
});
// // app.js
// // HTMLから読み込むコード

// // Promiseを多用するので、async functionの即時関数で囲う
// (async function () {
//   // チェックボックスとテキストエリア
//   const checkbox = document.getElementById('checkbox');
//   const textarea = document.getElementById('textarea');

//   // コピーした公開鍵（Base64形式）
//   const publicKey = 'BBNkpJ9fObqmyPWw-_DbuPbWwe8ATx7vLruUu0J75Bo0Kl_8t0vXJGu7tIeBVveSwKn6fJwGRjfTGaVgnZqeIRo';
//   // Base64形式の文字列からUint8Arrayに変換する関数
//   // http://bit.ly/2Cmpxvd
//   function urlB64ToUint8Array(base64String) {
//     // 文字長が4の倍数に満たない場合、「=」で埋める
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     // URL用に+, /の代わりに-, _を使っているので戻す
//     const base64 = (base64String + padding)
//       .replace(/\-/g, '+')
//       .replace(/_/g, '/');
//     // Base64からバイナリ文字列へ変換
//     const rawData = window.atob(base64);
//     // バイナリ文字列をUint8Arrayに変換
//     const outputArray = new Uint8Array(rawData.length);
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
//   // Uint8Arrayに変換した公開鍵
//   const applicationServerKey = urlB64ToUint8Array(publicKey);

//   if (!('serviceWorker' in navigator && 'PushManager' in window)) {
//     console.log('ServiceWorkerとPush APIに非対応');
//     return;
//   }

//   // sw.jsをServiceWorkerとして登録
//   let reg;
//   try {
//     // ServiceWorkerRegistrationオブジェクトを返す
//     reg = await navigator.serviceWorker.register('sw.js');
//   } catch (err) {
//     console.log('ServiceWorker登録失敗', err);
//     return;
//   }

//   // プッシュ通知の購読を開始
//   async function startSubscription() {
//     const options = {
//       userVisibleOnly: true,
//       // 公開鍵
//       applicationServerKey
//     };
//     try {
//       // ユーザーが許可すると
//       // PushSubscriptionオブジェクトを返す
//       const subscription
//         = await reg.pushManager.subscribe(options);
//       // 本来はXMLHTTPRequset等でサーバに共有する
//       textarea.value = JSON.stringify(subscription);
//       checkbox.checked = true;
//     } catch (err) {
//       checkbox.checked = false;
//       checkbox.disabled = true;
//     }
//   }

//   // プッシュ通知の購読を解除
//   async function stopSubscription() {
//     const subscription = await reg.pushManager.getSubscription();
//     if (subscription) {
//       subscription.unsubscribe();
//     }
//     checkbox.checked = false;
//     textarea.value = '';
//   }

//   // 既にプッシュ通知を購読しているか
//   const subscription = await reg.pushManager.getSubscription();
//   if (subscription !== null) {
//     // 購読済みの場合
//     // チェックボックスを有効にし、PushSubscriptionをテキストエリアに表示
//     checkbox.checked = true;
//     textarea.value = JSON.stringify(subscription);
//   }
//   // チェックボックスをクリック時に購読状態を切り替える
//   checkbox.addEventListener('click', event => {
//     if (event.target.checked) {
//       startSubscription();
//     } else {
//       stopSubscription();
//     }
//   });
//   // チェックボックスを有効にする
//   checkbox.disabled = false;
// })();
