# HTML/CSS/JS 練習問題 - STEP4

## 概要

1. 下記スクリーンショットを参考に、STEP3で改造したHTML/CSSに追加実装する
1. 改造対象
    1. HTML = sample.html
    1. CSS = sample.css
    1. JavaScript = sample.app.js / sample.lib.js

<br>

## 仕様

### HTML/CSS

1. 送信ボタンの改造
    1. class属性に「btn-send」を追加
1. ボタンを３種類追加
    1. 初期化ボタン
        1. 色・枠線：slategray
        1. class属性：btn-init
    1. 保存ボタン
        1. 色・枠線：forestgreen
        1. class属性：btn-save
    1. 復元ボタン
        1. 色・枠線：orangered
        1. class属性：btn-load
1. ボタンに関するCSSの見直し（重複定義ある場合）

<br>

### JavaScript

追加した各ボタンの処理を実装する。

1. 初期化ボタン
    1. 左ボックスのリセット（初期化状態にする）
    1. 右ボックスのリセット（初期化状態にする）
    1. 保存データのクリア
1. 保存ボタン
    1. 入力データの保存
        1. セッションストレージ
        1. キー「sample-data」
    1. 画面のクリア
    1. 左ボックスに処理結果メッセージの表示
1. 復元ボタン
    1. セッションストレージ内のデータを取得
    1. 復元可能かチェックする
    1. 復元できない時はエラーメッセージを表示（色：crimson）
    1. 復元できる時は画面に反映する
    1. 復元結果をメッセージ表示する
    1. セッションストレージをクリアする

<br>

### スクリーンショット

![左ボックス](/assets/step4-01.jpg)

<br>

### ソースコード

sample.app.js
```javascript
'use strict';

/**
 * クライアントアプリケーション
 */
const App = {
  data: new SendData(),       // データ・プロパティ
  guide: MessageArea.Left,    // ガイド・プロパティ
  mesg: MessageArea.Right,    // メッセージ・プロパティ
  form: RequestData,          // フォーム・プロパティ
  lbl: ResultLabel,           // ラベル・プロパティ
  out: ResultData,            // 結果出力・プロパティ
  send: null,
  init: null,
  save: null,
  load: null,
  key: '',

  /**
   * 実行準備をする関数
   */
  doSetup() {
    // 名前・入力バインド
    App.form.Name.addEventListener('change', () => {
      App.data.Name = App.form.Name.value;
    });

    // メール：入力バインド
    App.form.Mail.addEventListener('change', () => {
      App.data.Mail = App.form.Mail.value;
    });

    // 年齢：入力バインド
    App.form.Age.addEventListener('change', () => {
      App.data.Age = App.form.Age.value;
    });
  },

  /**
   * 入力データを結果出力エリアに出力する
   */
  doSend() {
    const checked = Util.validate(App.data);
    if (!checked.stat) {
      Util.setGuideText('error-mesg', checked.text);
      return;
    }

    Util.setGuideText('guide-text', '次の情報を入力して下さい：');

    App.lbl.Name.textContent = '送信された名前';
    App.lbl.Mail.textContent = '送信されたメール';
    App.lbl.Age.textContent = '送信された年齢';

    App.out.Name.textContent = App.data.Name;
    App.out.Mail.textContent = App.data.Mail;
    App.out.Age.textContent = App.data.Age;

    Util.setResultMessage('success-mesg', '送信されました');

    App.form.Name.value = '';
    App.form.Mail.value = '';
    App.form.Age.value = '';
  },

  /**
   * 画面を初期化状態にする
   */
  doInit() {
    //
  },

  /**
   * 入力データをセッションストレージに保存する
   */
  doSave() {
    //
  },

  /**
   * セッションストレージに保存したデータを画面に復元する
   */
  doLoad() {
    //
  }
};

// クライアントアプリケーションの準備
App.doSetup(App.doSend);
```
