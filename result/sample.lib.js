'use strict';

/**
 * 入力データ格納クラス
 */
class SendData
{
    /**
     * コンストラクタ
     */
    constructor() {
      this.reset();
    }

    // データリセット
    reset() {
      this.name = '';
      this.mail = '';
      this.age = -1;
    }

    // アクセッサ：名前
    set Name(value) {
      this.name = value;
    }
    get Name() {
      return this.name;
    }

    // アクセッサ：メール
    set Mail(value) {
      this.mail = value;
    }
    get Mail() {
      return this.mail;
    }

    // アクセッサ：年齢
    set Age(value) {
      this.age = value;
    }
    get Age() {
      return this.age;
    }
}

// デフォルト情報
const DefaultData = {
  Guide:  '次の情報を入力して下さい：',
  Mesg:   '送信データを待っています：',
  Label:  '？？？',
  Text:   'xxxxx',
  Number: 'nnn',
};

// 入力フォームオブジェクト
const RequestData = {
  Name: document.getElementById('simple-form-name'),
  Mail: document.getElementById('simple-form-mail'),
  Age: document.getElementById('simple-form-age'),
};

// 結果出力ラベルオブジェクト
const ResultLabel = {
  Name: document.getElementById('result-name-label'),
  Mail: document.getElementById('result-mail-label'),
  Age: document.getElementById('result-age-label'),
};

// 結果出力オブジェクト
const ResultData = {
  Name: document.getElementById('result-name'),
  Mail: document.getElementById('result-mail'),
  Age: document.getElementById('result-age'),
};

// メッセージエリアオブジェクト
const MessageArea = {
  Left: document.getElementById('from-message'),
  Right: document.getElementById('result-mesg'),
};

// アクションボタンオブジェクト
const ActionButton = {
  Send: document.getElementsByClassName('btn')[0],
  Init: document.getElementsByClassName('btn')[1],
  Save: document.getElementsByClassName('btn')[2],
  Load: document.getElementsByClassName('btn')[3],
};

/**
 * ユーティリティオブジェクト
 */
const Util = {
  /**
   * 入力データのチェック
   * @param {SendData} data 
   * @returns 入力結果を示すオブジェクト
   * {text:エラーメッセージ, stat:結果(true|false)}
   */
  validate(data) {
    if (data.Name.length === 0) {
      return {
        text: '名前が入力されていません', 
        stat: false
      };
    }

    if (data.Mail.length === 0) {
      return {
        text: 'メールが入力されていません', 
        stat: false
      };
    }

    if (data.Age < 0) {
      return {
        text: '年齢が入力されていません', 
        stat: false
      };
    }

    return {
      text: '', 
      stat: true
    };
  },

  /**
   * ガイドテキストを所定の場所に出力する
   * @param {String} mode 出力テキストの色を示すclass属性値
   * @param {String} text 出力テキスト
   */
  setGuideText(mode, text) {
    MessageArea.Left.textContent = text;
    MessageArea.Left.setAttribute('class', mode);
  },

  /**
   * フォーム画面のリセット
   */
  resetFormData() {
    RequestData.Name.value = '';
    RequestData.Mail.value = '';
    RequestData.Age.value = '';
  },

  /**
   * 結果メッセージを所定の場所に出力する
   * @param {String} mode 出力テキストの色を示すclass属性値
   * @param {String} text 出力テキスト
   */
  setResultMessage(mode, text) {
    MessageArea.Right.textContent = text;
    MessageArea.Right.setAttribute('class', mode);
  },

  /**
   * 送信結果の出力
   * @param {*} resp 送信データ 
   */
  setResult(resp) {
    ResultLabel.Name.textContent = resp.lbl.name;
    ResultData.Name.textContent = resp.data.name;

    ResultLabel.Mail.textContent = resp.lbl.mail;
    ResultData.Mail.textContent = resp.data.mail;

    ResultLabel.Age.textContent = resp.lbl.age;
    ResultData.Age.textContent = resp.data.age;
  },

  /**
   * 結果出力ラベルのリセット
   */
  resetResultLabel() {
    ResultLabel.Name.textContent = DefaultData.Label;
    ResultLabel.Mail.textContent = DefaultData.Label;
    ResultLabel.Age.textContent = DefaultData.Label;
  },

  /**
   * 送信結果データのリセット
   */
  resetResultData() {
    ResultData.Name.textContent = DefaultData.Text;
    ResultData.Mail.textContent = DefaultData.Text;
    ResultData.Age.textContent = DefaultData.Number;
  }
};