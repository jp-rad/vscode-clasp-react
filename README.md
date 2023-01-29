# vscode-clasp-react

Running React App on Google Apps Script as a web app.  
Using `HtmlTemplateDataProvider` component, it is easy for React Apps to accept `data` pushed on `Google Apps Script`.  

**Example**
``` App.tsx
// App.tsx

import React from 'react';
import Logo from './Logo';
//import './App.css'; // ==> ../index.html
import { useData } from './providers/HtmlTemplateDataProvider';

function App() {
  const { data } = useData<GoogleAppsScript.Events.DoGet>();
  const qs = (!data) ? '(data is unset)' : (!data.queryString) ? '(empty)' : data.queryString;
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/app/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          data.queryString = '<code>{qs}</code>'
        </p>
      </header>
    </div>
  );
}

export default App;

```

## インストール

- git
- Docker
- [VS Code](https://code.visualstudio.com/download)
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Templateからリポジトリの作成

1. GitHubにログインします。
1. GitHubのリポジトリを開きます。  
https://github.com/jp-rad/vscode-clasp-react.git
1. `Use this template` をクリックし、リポジトリを作成します。  
[こちら - https://github.com/jp-rad/vscode-clasp-react/generate](https://github.com/jp-rad/vscode-clasp-react/generate)

## クローンとVS Codeの起動

1. `git clone <your GitHub Code URL>`
1. git clone したフォルダををVS Codeで開く
1. Dockerを起動する
1. VS Codeで`Reopen in Container`を実行し、Dockerコンテナーを起動する  
（初回、ダウンロードとインストールが行われるので、待つ）

## Google Apps Script の追加

[Google ドライブ](https://drive.google.com/drive/my-drive)を開き、`Google Apps Script`を追加します。

1. [Google ドライブ](https://drive.google.com/drive/my-drive)
1. `新規` > `その他` > `Google Apps Script`
1. `プロジェクトの設定`で、`スクリプト ID`をコピーする

## GASログインとGASクローン

1. VS Codeのメニュー `ターミナル` > `タスクの実行`で、`GAS login`を選択し、Googleアカウントでログインする。
1. VS Codeのメニュー `ターミナル` > `タスクの実行`で、`GAS clone`を選択し、スクリプト構成情報のクローン（取得）を開始する。
1. コピーした`スクリプト ID`の値を「Script ID」欄に貼り付け、Enterキーを押下する。
1. VS Codeのメニュー `ターミナル` > `タスクの実行`で、`GAS build to push`を選択し、ビルドとプッシュを実行する。

`Google Apps Script`を開くと、ローカルのソースコードがビルドされ、更新されていることを確認できます(洗い替え)。

## ウェブアプリのデプロイ

`Google Apps Script`で、`ウェブアプリ`をデプロイします。

1. `Google Apps Script`を開き、`デプロイ`から`新しいデプロイ`を選択する
1. `ウェブアプリ`を選択し、`デプロイ`する  
次のユーザーとして実行:「自分（your.account@example.com）」  
アクセスできるユーザー:「全員」  
1. ウェブアプリ urlにアクセスするとアプリ画面が表示される。


