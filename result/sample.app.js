'use strict';

/**
 * クライアントアプリケーション
 */
const App = {
  data: new SendData(),       // データ・プロパティ
  default: DefaultData,       // 初期状態・プロパティ
  guide: MessageArea.Left,    // ガイド・プロパティ
  mesg: MessageArea.Right,    // メッセージ・プロパティ
  form: RequestData,          // フォーム・プロパティ
  lbl: ResultLabel,           // ラベル・プロパティ
  out: ResultData,            // 結果出力・プロパティ
  send: ActionButton.Send,    // 送信ボタン・プロパティ
  init: ActionButton.Init,    // 初期化ボタン・プロパティ
  save: ActionButton.Save,    // 保存ボタン・プロパティ
  load: ActionButton.Load,    // 復元ボタン・プロパティ
  key:  'sample-data',        // 保存キー

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

    // アクションボタン・送信イベントハンドラー
    App.send.addEventListener('click', (evt) => {
      App .doSend();
    });

    // アクションボタン・初期化イベントハンドラー
    App.init.addEventListener('click', (evt) => {
      App.doInit();
    });

    // アクションボタン・保存イベントハンドラー
    App.save.addEventListener('click', (evt) => {
      App.doSave();
    });

    // アクションボタン・復元イベントハンドラー
    App.load.addEventListener('click', (evt) => {
      App.doLoad();
    });
  },

  /**
   * 入力データを結果出力エリアに出力する
   */
  doSend() {
    // 入力チェック
    const checked = Util.validate(App.data);
    if (!checked.stat) {
      Util.setGuideText('error-mesg', checked.text);
      return;
    }

    // データの送信
    Util.setResult({
      lbl: {
        name: '送信された名前',
        mail: '送信されたメール',
        age:  '送信された年齢',
      },
      data: {
        name: App.data.Name,
        mail: App.data.Mail,
        age:  App.data.Age,
      }
    });

    // メッセージのクリアと設定
    Util.setGuideText('guide-text', App.default.Guide);
    Util.setResultMessage('success-mesg', '送信されました');

    // データのリセット
    App.data.reset();

    // 画面のクリア
    Util.resetFormData();
  },

  /**
   * 画面を初期化状態にする
   */
  doInit() {
    // 左ボックスのリセット
    Util.setGuideText('guide-text', App.default.Guide);
    Util.resetFormData();

    // 右ボックスのリセット
    Util.setResultMessage('guide-text', App.default.Mesg);
    Util.resetResultLabel();
    Util.resetResultData();

    // セッションストレージのクリア
    sessionStorage.removeItem(App.key);
  },

  /**
   * 入力データをセッションストレージに保存する
   */
  doSave() {
    // 入力チェック
    const checked = Util.validate(App.data);
    if (!checked.stat) {
      Util.setGuideText('error-mesg', checked.text);
      return;
    }

    // セッションストレージに保存する
    sessionStorage.setItem(App.key, JSON.stringify(App.data));
    Util.resetFormData();

    // メッセージの設定
    Util.setGuideText('success-mesg', 'データを保存しました：');
  },

  /**
   * セッションストレージに保存したデータを画面に復元する
   */
  doLoad() {
    // セッションストレージ内データの存在チェック
    const data = JSON.parse(sessionStorage.getItem(App.key));
    if (data == null) {
      Util.setGuideText('error-mesg', '復元対象のデータがありません：');
      return;
    }

    // 画面への設定
    App.form.Name.value = data.name;
    App.form.Mail.value = data.mail;
    App.form.Age.value  = data.age;

    //セッションストレージのクリア
    sessionStorage.removeItem(App.key);
    Util.setGuideText('success-mesg', 'データを復元しました：');
  }
};

// クライアントアプリケーションの準備
App.doSetup();