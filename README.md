# スライドショー用リポジトリ

## 使い方

* HTMLプレゼンテーション用ライブラリ[reveal.js](https://revealjs.com/)を利用している。
* HTML のテンプレートエンジンは [EJS](http://ejs.co/) を利用し、`src/ejs/ejs.config.json`に設定した値を読み込みHTMLを出力している。

### 環境構築手順
npm

```
$ cd path/to/gulp-reveal.js
$ npm install
$ npm run watch
```
yarn

```
$ cd path/to/gulp-reveal.js
$ yarn install
$ yarn watch
```


[http://localhost:3000/#/](http://localhost:3000/#/)が立ち上がり、スライドショーが表示されればOK。

### ejs.config.json
```json
{
  "data": {
    "title": "スライドショー",
    "theme": "black" // デフォルトのテーマ用CSSファイル名。
  },
  "pages": [ // ページ設定
    {
      "id": "index", // 生成される HTML のファイル名とスライドの内容を記述するマークダウンのファイル名
      "title": "スライド名", // スライドショーのタイトル
      "theme": "moon" // スライドショー毎にテーマを変えたい場合はここで設定する。
    }
  ]
}
```

### スライドショーのコンテンツの作成
* `src/md`内のファイルにマークダウン形式で記述する。
* `---`でスライドを分割できる。
* 画像などの埋め込みはHTMLタグで記述する。


### 2つ目以降のスライド
* ejs.config.json のpages内に設定を追加する。

```
 ...
 "pages": [ 
    {
      "id": "index",
      "title": "スライド名",
      "theme": "moon"
    }
    {
      "id": "second", // dist内にsecond.htmlが生成される
      "title": "2つ目のスライドショー",
      "theme": "sky"
    }
  ]

```
* `src/md/`にsecond.mdを追加し、コンテンツを作成する。
* http://localhost/second.htmlで、追加したスライドショーを確認できる。

### PDF, 印刷

[http://localhost:3000/?print-pdf#/](http://localhost:3000/?print-pdf#/)にアクセスし、`Ctrl + p`でPDFでの保存、印刷ができる。
