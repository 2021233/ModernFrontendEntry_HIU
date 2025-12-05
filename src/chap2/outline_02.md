# 2. NPM の使い方、JSX 記法、コンポーネント設計

React を使う上で必須となる「NPM」について解説します。  
また、React に採用されている「JSX 記法」と、React の特徴である「コンポーネント設計」についても解説します。

目標

-   NPM の使い方を覚える
-   JSX 記法について理解する
-   コンポーネントの概念を理解する
-   React の特徴について理解する

### 成果物

コンポーネント分けの練習をしよう。

---

## NPM について

前回 TypeScript をインストールするために使ったツール。React、Next、その周辺ライブラリやその他様々なパッケージの管理にも使う。

### node.js とは

JavaScript の実行環境のひとつ。  
通常の JavaScript はブラウザ上で実行されるが、node.js を用いることでサーバ内でも実行できる。  
最近は Bun.js など他の実行環境も登場しているが、まだ node.js が主流。

### NPM とは

JavaScript のパッケージを管理するためのツールで、簡単にいうとスマートフォンのアプリストアのような役割を担う。インストール、アンインストール、アップデートなどができる。インストールされているパッケージの情報は`package.json`と`package-lock.json`に記載され、それを共有すれば同じパッケージの同じバージョンをインストールすることができる。  
パッケージとは、ライブラリのような小さく 1 つの機能を持ったプログラムのまとまりを指す。1 つの機能しか持たないものや、目的に応じで細かく機能をカスタマイズできるライブラリもある。  
yarn など他のパッケージ管理ツールもあるが、NPM が主流。

## NPM の使い方

### `npm`コマンドの使い方

NPM は`npm`コマンドで操作する。基本的な操作は次の通り。

```bash
# 実行したディレクトリでプロジェクトを作成
# そのディレクトリ以下はすべてプロジェクト内となる
npm init

# パッケージをインストール
# パッケージのアップグレードやダウングレードも可能
npm install パッケージ名
npm install パッケージ名@バージョン

# パッケージをアンインストール
npm uninstall パッケージ名

# パッケージを検索
npm search キーワード

# インストール済のパッケージの一覧を表示
npm list
```

いくつかのコマンドは`-g`オプションを付けることでプロジェクトだけでなくコンピュータ全体を対象に実行できる。(グローバルオプション)  
グローバルにインストールしたパッケージは通常のコマンドと同じように使うことができる。

```bash
# パッケージをインストール
# パッケージのアップグレードやダウングレードも可能
npm install -g パッケージ名
npm install -g パッケージ名@バージョン

# パッケージをアンインストール
npm uninstall -g パッケージ名

# インストール済のパッケージの一覧を表示
npm list -p
```

### `npx`コマンドの使い方

`npx`コマンドはパッケージを一度インストールして実行し、終了したらパッケージをアンインストールするコマンド。  
フレームワークがセットアップ用のコマンドが使えるパッケージを配布していることがある。そのような実行だけするパッケージに使われる。

```bash
# 例としてNext.jsのセットアップコマンド
# latestは最新バージョンのこと
npx create-next-app@latest
```

## コンポーネントについて

### コンポーネントとは

React において、コンポーネントと「UI 上の細かい部品」を指す。例えば、ボタン、画像、リストのアイテム、ヘッダー、フッターなどが該当する。

### JSX 記法とは

React ではコンポーネントの記述に JSX 記法という HTML のような記法を用いる。  
従来の React 要素の記法は JSX 記法に比べて長く直感的ではなかった。

```typescript
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me")
```

JSX 記法 を使うことで HTML と同様に書くことができる。

```typescript
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```

JSX は HTML にはない独自ルールがいくつかあるためエラー時はよく確認すること。

```typescript
// クラスはclassNameにしないとエラー
<p className="bodyText">hoge</p>

// 空要素はセルフクロージングしないとエラー
<img src="./images/card_thumbnail.gif" />

// 改行を含む場合は丸括弧()で囲う
const wrapText = (
    <div className="wrap">
        <span>
            hogehoge<br />
            fugafuga
        </span>
    </div>
);

// 文字列と数字以外の値は波括弧{}で囲う

// 文字列と数字の場合
<img src="./main.svg" width=468 height=360 />

// 他の型の値や関数や変数の場合
<button
    disabled={true}
    onClick={() => console.log("fire")}
>
    {label}
</button>
```

また、要素はひとつの値として扱われ、1 つの要素のかたまりでないといけない。  
そのため１つの要素にまとめるために`div`などで囲われることがあるが、余計な要素を増やしたくない場合はフラグメント(無名要素)を使うこともできる。フラグメントはレンダリングされるときは要素が何も作られない。

```typescript
// 1つの要素のかたまりでないとエラー
const alertText = <div><span>hoge</span></div>;

// 要素が2つあるのでエラー
const icon = (
        <img src="./img/icon.png" />
        <span>icon<span>
    );

// フラグメントを使うと1つの要素のかたまりとして扱える
// 実際にはimg要素とspan要素のみレンダリングされる
const icon = (
        <>
            <img src="./img/icon.png" />
            <span>icon<span>
        </>
    );
```

### コンポーネントを作る

コンポーネントは慣習として関数記法で作成する。  
関数名に頭文字大文字でコンポーネント名を、return に表示する内容を記述する。

```typescript
export default function SubmitButton(): JSX.Element {
    return (
        <button className="btn w60p textM submit" type="submit">
            <span>送信</span>
        </button>
    )
}
```

アロー関数の場合は以下のように書く。

```typescript
const Logomark = (): JSX.Element => {
            return (
                <a href="/">
                <img src="./image/main_logo.png" alt="logo image" width="64" height="64">
            </a>
        )
    }
```

返り値の型は`JSX.Element`とする。  
他に`React.Element`などがあるが、型エラーが出たときに変更して試すことある程度で基本は`JSX.Element`でよい。

```typescript
// JSXを読み込む
import { JSX } from "react"

// 型を指定する
function Card(): JSX.Element {
    // 省略
}
```

前述の通り JSX はひとつの値として扱われるため変数に入れることもできるが、その場合は props や children を受け取れずコンポーネントとして呼び出すことができない。

```typescript
// 前に記載の2つのコンポーネントは以下のように呼び出せる。
<SubmitButton />
<Logomark />

// JSXを入れた変数を作る
const Button = <button className="goHome" onClick={() => console.log("goHome")}>ホームに戻る</button>;

// 変数はコンポーネントとして呼び出せない
{ Button }
```

### コンポーネントに値や関数を渡す(props)

React には、コンポーネントは呼び出すときに値や関数を受け取りコンポーネント内で使うことができる props(プロップス)というしくみがある。
props は関数の引数として定義し、呼び出すときは HTML 要素の属性のように値や関数を渡すことができる。

```typescript
// 関数の引数として宣言
// 宣言は波括弧の中にprops名をカンマ区切りで並べる
// 型はオブジェクトの記法
function UserButton({
        src,
        onClickAction,
    }:{
        src:string;
        onClickAction: () => void;
    }){
        // 省略
    }

// コンポーネントに属性のように渡す
<UserButton src="./image/default_icon.png" onClickAction={() => router.push("/profile")}>
```

### コンポーネントに子コンポーネントを渡す(chilren)

コンポーネントでレイアウトを定義して子コンポーネント渡したい場面は多く存在する。  
そういった場合には React の機能のひとつである`children`props を使う。

コンポーネントを呼び出すとき、そのコンポーネントの開始タグと終了タグの間に記述したものは`children`という名前付きの props としてコンポーネント側で受け取ることができる。

```typescript
// コンポーネントの開始タグと終了タグの間に要素を記述
<Button>
    <a href="/mypage">マイページ</a>
</Button>

// コンポーネントではchildrenとして受け取る
function Button({children}: {children: JSX.Element}):JSX.Element {
        return (
            <div class="button">
                {children}
            </div>
        )
    }

// 複数のコンポーネントを渡す場合
<MenuList>
    <a href="/home">ホーム</a>
    <a href="/about">チームについて</a>
    <a href="/contact">問い合わせ</a>
</MenuList>

// 複数要素を安全に処理する
import { React } from 'react';
function MenuList({children}) {
    return (
        <ul className="menuList">
            {
                React.Children.map((children, child) => (
                    <li>{child}</li>
                ));
             }
        </ul>
    );
}

// 配列化して処理する
import { React } from 'react';
function MenuList({children}) {
    const elements = React.Children.toArray(children);
    return (
        <ul className="menuList">
            {
                elements.map(e => (
                    <li>{e}</li>
                ));
             }
        </ul>
    );
}

// フラグメントを使って複数の要素を渡す
<MenuList>
    <>
        <li><a href="/home">ホーム</a></li>
        <li><a href="/about">チームについて</a></li>
        <li><a href="/contact">問い合わせ</a></li>
    </>
</MenuList>

// childrenは単一の要素の扱いなので特に処理を加えなくてよい
function MenuList({children}) {
    return (
        <ul className="menuList">
             {children}
        </ul>
    );
}
```

## コンポーネント設計とは

React はコンポーネントを再利用可能な UI 部品と定めているが、1 つのコンポーネントの範囲を適切に切り分けなければならない。  
コンポーネントを再利用するかは基本的に機能に注目して決定するが、部品の幅や高さやフォントサイズなどが変わってしまうと余計な条件分岐が発生してしまう可能性がある。使用箇所に応じた表示の変化は CSS で制御可能な範囲に留めてコンポーネント内に不要な処理を増やさないようにするためには、デザイン段階でコンポーネントの分割について議論することが望ましい。  
また、コンポーネントの設計は以下の基本的な指針に基づいて進めるとよい。

ここではサンプルを使って実際にコンポーネントを設計していく。  
今回は UI と API は設計済みの想定で進める。

### 1.UI をパーツごとに分ける

デザインファイルの UI をパーツごとに分けていく。  
API で受け取った値が反映される箇所を基準に 1 つのパーツとして分割する。繰り返されるパーツは 1 つずつのパーツとして区切る。

### 2.状態を必要な場所に持たせる

状態を必要以上に上のコンポーネント(親コンポーネント)に持たせてしまうと、実際に状態を持たせたかったコンポーネントの兄弟コンポーネントにも余計なレンダリングをかけてしまう。  
状態に応じて発生する再レンダリングの影響範囲を最小限に抑えたコンポーネントに状態を持たせる。

### 3.繰り返しや同じパーツをまとめる

リストのように同じパーツを繰り返したりページ内に同じボタンが複数回使われたりする場合は 1 つのコンポーネントにまとめる。リストやグリッドのように同じパーツを繰り返し使うエリアは、1 種類のコンポーネントを繰り返し表示するようにしてそれらを囲うエリアごとコンポーネントにするとよい。  
その際にコンポーネント汎用的にしすぎてはならない。あくまで同じページ内で変化する範囲に留め、他のページで利用する場合を想定して props を定義してはいけない。また、同じページ内でも変化する箇所が多いコンポーネントは、変化の少ない別々のコンポーネントとして分離する。

### 4.変化の少ないパーツをを分離する

props、state、context の変化が少ないコンポーネントはメモ化するとパフォーマンスが上がる場合があるため別のコンポーネントとして分けておく。  
React compiler を使えば適切にメモ化されるため、手動でメモ化しなくてもコンポーネントを分けておくとよい。

### 5.別ファイルに切り出す

基本的には 1 つのコンポーネントを 1 つのファイルに切り出す。メモ化のために分離したコンポーネントが非常に単純で他のファイルで使わないのであれば、複数のコンポーネントで 1 つのファイルにまとめることもある。

## コンポーネント分けのサンプル

ここからは YouTube の動画再生画面をコンポーネント分けしてみる。

### Figma の準備

1. [figma](https://www.fimga.com/)にアクセスし、ログインする。
2. 左サイドバーから「すべてのプロジェクト」>「Team project」の順で開く。
3. 「+作成」>「デザイン」の順で新しいデザインファイルを作成する。
4. [sample.png](https://github.com/2021233/IntroductionModernFrontEnd_HIU/tree/main/src/chap2/sample.pnt)をデザインファイルに貼り付ける

### 進め方

1. コンポーネントごとに長方形で囲う。(塗りなし線のみ、線の色は任意、太さは 3 くらい)
2. 子コンポーネントがある場合は長方形の内側でさらに長方形で囲う。(線の色は変える)
3. リストのように繰り返すアイテムの場合は 1 つだけ囲って残りに繰り返すような表記を入れる。
4. 分けたコンポーネントに名前をつける。

まだ細かくコンポーネントに切り分けることができそうならば、その部分だけ切り取ってコピーして再度コンポーネントに切り分けてみるとよい。

[参考画像](https://github.com/2021233/IntroductionModernFrontEnd_HIU/tree/main/src/chap2/refrence.png)

### Tips

React の環境を構築して動かす実習は次回行うが、試しに React に触ってみたい場合は以下の方法がある。

#### React 公式ドキュメントサイトで試す

[React 公式ドキュメント](https://ja.react.dev/learn/installation)のサイトには、簡単に React を試すことができるページが用意されている。  
自身のコンピュータ上に環境を構築する必要はないため、自力で React 環境を作成する自信がない場合などに触れてみるとよい。

#### React の環境を構築する

React の環境を構築するには`create-react-router`コマンドを利用する。

```bash
cd IntroductionNextjs/chap02
npx create-react-router@latest
```
