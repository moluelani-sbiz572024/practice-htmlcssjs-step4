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
➡️ 参考：[hints/sample.app.js](/hints/sample.app.js)

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
