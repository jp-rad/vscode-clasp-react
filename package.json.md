# google/zx

## google/zx のインストール
`yarn add https://github.com/jp-rad/zx.git#write_and_import --dev`

> **Note**  
> npmパッケージとして公開されている バージョン 7.1.1 では、Markdownを使ったスクリプトの実行に失敗します。  
> 問題の個所は既に修正されていますが、まだ、公開されていませんので、githubのソースコードからインストールするようにします（[prepare付き](https://github.com/jp-rad/zx/blob/write_and_import/package.json#L42)）。  
>   
> [修正済みの該当箇所 - https://github.com/google/zx/blob/main/src/cli.ts#L141](https://github.com/google/zx/blob/main/src/cli.ts#L141)  
>   
> 本来は、次のコマンドでインストールします。  
> `yarn add zx --dev`  


## コマンド一覧

Google ログイン・ログアウト

- ログイン  
`npx zx package.json.md -- clasp-login`
- ログアウト  
`npx zx package.json.md -- clasp-logout`

Google Apps Script ⇒ ローカル

- クローン  
`npx zx package.json.md -- clone-apps <スクリプト ID>`
- プル (appsscript.json)  
`npx zx package.json.md -- pull-appscript`

ローカル ⇒ Google Apps Script

- ビルドとプッシュ  
`npx zx package.json.md -- build-push`

Google Apps Script エディタ

- オープン  
`npx zx package.json.md -- clasp-open`



# scriptコマンド

```javascript
const scripts = {};
const command = argv._[0];
```

## clasp-login

```javascript
scripts["clasp-login"] = async () => {
    await $`npx clasp login`;
}
```

## clasp-logout

```javascript
scripts["clasp-logout"] = async () => {
    await $`npx clasp logout`;
}
```

## clone-apps

```javascript
scripts["clone-apps"] = async () => {
    const scriptId = argv._[2] ? argv._[2] : '';
    await cleanAll();
    await $`npx clasp clone ${scriptId} --rootDir ./.apps_script`;
    await $`mv ./.apps_script/.clasp.json ./`;
    await $`cp ./.apps_script/appsscript.json ./src`;
}
```

## pull-appscript

```javascript
scripts["pull-appscript"] = async () => {
    await $`npx clasp pull`;
    await $`cp ./.apps_script/appsscript.json ./src`;
}
```

## clean

```javascript
async function cleanAll() {
    await $`mkdir -p ./.apps_script ./.build ./src`;
    await $`rm -rf ./.apps_script/* ./.build/*`;
}
scripts["clean"] = async () => {
    await cleanAll();
}
```

## build

```javascript
async function buildAll() {
    await cleanAll();
    await $`cp -r ./src/* ./.apps_script`;
    await $`rm -rf ./.apps_script/app ./.apps_script/setupTests.ts`;
    await $`npx parcel build src/index.html --no-cache --no-source-maps --dist-dir .build`;
    await $`cp ./.build/index.html ./.apps_script`;
}
scripts["build"] = async () => {
    await buildAll();
}
```

## build-push

```javascript
scripts["build-push"] = async () => {
    await buildAll();
    await $`npx clasp push`;
}
```

## clasp-open

```javascript
scripts["clasp-open"] = async () => {
    await $`npx clasp open`;
}
```

# scriptコマンドの実行

```javascript
const script = scripts[command];
if (script) {
    await script();
} else {
    console.log(`Unknown command: ${command}`);
}
```
