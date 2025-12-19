# 前回のあらすじ

- TypeScriptの型システムについて
- NPMの使い方について
- Reactコンポーネントについて

前回のフィードバックを受け、少し方針を変更します。  

- git操作を扱わないことにします。各自でローカルに講座用のディレクトリを作り、その中で作業してください。  
- サンプルの作成はハンズオンで行います。毎回宿題は出さず、講座内で完了するようにします。  

---

# 3. React Hook と CSS

React コンポーネントのロジックにおいて重要なHookについて解説します。
また、React における CSS の扱い方について解説します。

目標

-   React Hook について理解する
-   CSS フレームワークの導入方法について理解する
-   メジャーな CSS フレームワークについて知る

## Hook とは

React の特徴として Hook という機能がある。  

```typescript
export function Counter() {
    // ここに処理を書く
    return (
        <div>
            <button>+</button>
            <span>0</span>
            <button>-</button>
        </div>
    );
}
```

Hook とは、React の機能を関数コンポーネントで扱うことができるようにしたもの。Hook の登場前はクラスコンポーネントでしか利用できなかった機能が、Hook が登場したことで関数コンポーネントで記述することが主流になった。  
Hook を用いることで以下のような機能が利用できる。

-   ライフサイクル：コンポーネントが描画される各段階で処理を行う
-   状態管理：ある値の変化毎にコンポーネントを再描画する
-   メモ化：値やコンポーネントの描画結果を保存して使い回す

など

Hook は React コンポーネントのトップレベルか後述するカスタム Hook の中でのみ呼び出せる。つまり、コンポーネントに直接記述する処理でのみ使用可能で、`if`文や`for`文の中では呼び出せない。また、関数の中でも呼び出すことができない。

Hook は慣習的に`useXxx`という`use`に頭文字が大文字の単語を続ける命名規則になっている。

### 状態管理

状態管理とは、アプリケーションの状態を管理することを指す。例えば、ボタンのオン/オフ、`input`要素に入力されている内容、データベースから取得した値を表示するカードの数などが状態(status)にあたる。これらの状態に関わる値を管理することで UI の変更を行う。  
高機能なライブラリを使った状態管理も行えるが、基本的には React Hook の`useState`で事足りる。  
`useState`は状態自体と状態を変更する専用の関数を作成する。その関数で状態を変更すると UI の変更が発生する。

```typescript
import { JSX, useState }from 'react';

function Counter(): JSX.Element {
    // 状態と変更関数を作成
    // 慣習的に［〇〇, set〇〇］の組み合わせ
    const ［conut, setCount］= useState<number>(0);

    //set関数のコールバック関数には直前の値が入る
    function increment() {
        setCount(oldCount => oldCount + 1);
    }

    function decrement() {
        setCount(oldCount => oldCount - 1);


    }

    return (
        <div className="counter>
            <button onClilk={increment}>+1</button>
            <span></span>
            <button onClick={decrement}>-1</button>
        </div>
    );
}
```

`useState`で作成した状態は、専用の set 関数以外で変更しても UI の変更が発生しない。  
また、専用の set 関数を実行しても次のレンダリングまでは状態が変化しない。一連の処理の中で変更後の状態の値を複数回利用したい場合は、値を別途作成して該当箇所と set 関数で利用する。

```
// 変更後の状態の値を別途作成
const newCount = count + 1;

// 別の処理で利用
// 例えばapiに値を渡す
fetch(`https://example.com/api/count?visitor=${newCount}`);

// set関数で状態を更新
setCount(newValue);
```

### ライフサイクル

ライフサイクルとは、コンポーネントが読み込まれて描画されてから破棄されるまでの一連の流れを指す。
React コンポーネントのライフサイクルは以下の 3 つのタイミングから成る。

-   マウント時:コンポーネントが作られたとき
-   更新時: コンポーネントの UI に変更が加えられたとき
-   アンマウント時: コンポーネントが画面から表示されなくなった(破棄された)とき
    React Hook の`useEffect`は、上記の各タイミングで処理を行うことができる。  
    `useEffect`はよく`useState`と組み合わせて使われる。

```typescript
import { JSX, useState, useEffect } from 'react';

function FixedUserMenuButton(
    { userId }:{ userId: string }
): JSX.Element {
    const [user, setUser] =
        setState<{name: string, icon: string} ｜ {}>({});

    useEffect(() => {
        // マウント時、更新時の処理
        fetch(`https://example.com/user/${userId}`)
            .then(res => {
                const json = res.json;
                setUser({name: json.name, icon: res.icon});
            );
        function scrollHandler(){
            console.log("scroll");
        }
        window.addEventListener("scroll", scrollHandler);

        return (() => {
            // アンマウント時の処理
            window.removeEventListener(scroll, scrollHandler;)
        });
        // 第二引数の配列によって更新時の実行頻度が変わる
    }, [userId]);

    //省略
}
```

`useEffect`は第二引数によって更新時の処理を行うかどうかが変わる。この引数を「依存配列」とよぶ。
e

```
// なし: 更新の度に実行
useEffect(() => {/* 省略 */});

// 空の配列: マウント時のみ実行
useEffect(() => {/* 省略 */}, []);

// 配列: 配列内の値が変更されたときに実行
useEffect(() => {/* 省略 */}, [id, name]);
```

アンマウント時の処理として、`useEffect`を使用するコンポーネント内の処理によってそのコンポーネント以外に与えた影響を元に戻す必要がある。  
例のコードでは表示しているページ全体に対してスクロールされたときに行う処理を登録している。別のページに遷移したなどでこのコンポーネントが表示されなくなった場合、登録した処理を解除しなければ何度も同じコンポーネントが表示されたときに同じ処理が何度も登録されてしまい、処理によってはページの動作が遅くなったりブラウザの動作が停止したりする。

公式ドキュメントに`useEffect`は「コンポーネントを外部システムと同期させる Hook」とあり、それ以外の目的の場合は`useEffect`はおそらく不要であると記載されている。また、`useEffect`内で利用するロジックはコンポーネントの表示に伴って実行したいもののみを残すべきであり、ボタン押下時など異なるタイミングのものは削除するべきとされている。初学者が`useEffect`の思想を正確に捉えるのは難しいため躓くポイントとなる。  
加えて、`useEffect`の第二引数に与えた値を`useEffect`内で変更してしまうとコンポーネントの更新が無限に発生するエラーとなるため注意が必要。

### メモ化

メモ化とは、連続して同じ結果になる処理を複数回行うことを避けるために、処理の結果を保存して使い回すしくみを指す。
React では以下のメモ化機能が提供されている。

-   `React.memo`: コンポーネントをメモ化する
-   `useMemo`: 関数の処理結果をメモ化する
-   `useCallback`: 関数自体をメモ化する

実は、現在の React では開発者が手動でメモ化する必要はほぼない。  
React compiler というツールを使えば作成したアプリを自動で最適化できる。その際に必要に応じてメモ化が行われるため、開発時に手動でメモ化する必要はほぼない。

メモ化は全ての処理に行えばよいとは限らない。連続して同じ結果に成ることが多く、パフォーマンスに影響のある場合にのみ行うべきである。  
メモ化するべきではない処理をメモ化した場合、処理結果を保存するため却ってパフォーマンスが悪くなってしまう。  
そういった人為的なミスを防ぐためにもメモ化は React compiler に任せ、デバッグに障る部分のみ手動でメモ化するのがよいだろう。

### カスタム Hook

複数のコンポーネントで同じ処理を行いたい場合がある。React では共通した処理を開発者が独自の Hook として再利用できる「カスタム Hook」というしくみを用意している。  
カスタム Hook は必ず`useXxx`のように`use`に頭文字が大文字の単語を続けて命名する必要がある。

カスタム Hook は任意の引数を取ることができ、任意の値を返してよい。(`useEffect`のように何も返さなくてもよい)

```javascript
import { useState, useEffect } from "react"

// オンライン状態を判別するカスタムHook
export function useOnlineStatus() {
    // カスタムHook内ではReact Hookを呼び出せる
    const [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
        }
        function handleOffline() {
            setIsOnline(false)
        }
        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)
        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])
    return isOnline
}
```

---

## React でのスタイリング

React でスタイリングを行う方法は以下が挙げられる。  
これらにはそれぞれメリットとデメリットがある。

-   アプリケーション全体に反映される CSS を作成する  
    利点: パフォーマンスがよい、学習コストが低い、CSS の機能が全て利用できる  
    弱点: スタイルやクラス名の衝突が起きる、別途クラス命名規則などが必要
-   コンポーネントごとにインラインスタイルを使用する  
    利点: スタイルやクラス名の衝突を避けられる、学習コストが低い  
    弱点: パフォーマンスが悪い、使用できる CSS の機能が少ない
-   CSS フレームワークを導入する  
    利点: パフォーマンスや開発効率が向上する  
    弱点: 学習コストが高い、細かいスタイルの調整が難しい

基本的には CSS フレームワークを導入することが多い。特に Tailwind CSS や bootstrap は利用率が高くチートシートも存在しているため、学習おいてして損はない。

それぞれのデメリットを打ち消し合うように、方法をうまく組み合わせて使うのがよい。  
CSS フレームワークで全体のスタイリングを行い、細かい調整はインラインスタイルなどで上書きするのが主流。

### アプリケーション全体に反映される CSS

CSS ファイルを別途作成し、ルートコンポーネントのファイルでインポートする。

```typescript
import "./style.css"
```

JSX ではクラス名を`className`Props で指定する。

```jsx
<div className="rect rect-black" />
```

CSS 自体は通常のものと変わりないが、全ての CSS を一元管理する必要がありメンテナンスの難易度は上がる。

### インラインスタイル

```jsx
<img src="hoge.png" alt="icon" style="width: auto; height: 30vh;">
<p style={{fontSize: 36, margin: "0 10%"}}>hoge</p>
```

のように要素に`style`Props に記述する。その際、プロパティ名に入っている`-`の代わりに単語の頭文字を大文字にする。(キャメルケースとよぶ。)また、px 単位の指定は単位なしの数字型、それ以外は単位まで含めて文字列型で記述する。  
HTML のインライン CSS と同様にアニメーションなど一部の機能を使うことができず、他 CSS よりも管理がしづらい。

### CSS module

インポートしたコンポーネントでのみ有効な CSS。

通常の CSS に`.module.css`拡張子をつけることで作成できる。

インポートは以下のように行う。

```typescript
import styles from "./styles.module.css"
```

クラス名の指定は`className`Props にインポートした`styles`のプロパティを渡す。

```jsx
<p className={styles.bodyText}>本文</p>
```

CSS の記述は通常通りであるため、疑似クラス、疑似セレクタ、アニメーションなどが利用できる。  
CSS module は古い技術であるため、近い将来廃止される可能性がある。メインでの使用は避け、インライン CSS で実現できないスタイルの適用に用いるのがよい。

### Tailwind CSS

Tailwind CSS は、予めひとつのプロパティだけが指定され、いくつかの値を持つバリエーションのクラス名が用意されている。それらのクラス名を組み合わせてスタイリングする。

```jsx
<img src="/img/logo.png" alt="logo" width="64" height="64" className="size-48 shadow-xl rounded-md">
```

これで実際には次のスタイルが当てられる。

```css
 {
    width: 12rem;
    height: 12rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 /
                    0.1);
    border-radius: 0.375rem;
}
```

ルートコンポーネントに読み込むだけで利用でき、ほとんどのプロパティがサポートされ、疑似要素や疑似セレクタも指定できる。また、用意されていない値を自由に指定できる機能もある。

### Bootstrap

Bootstrap は、対応したプロパティが指定されたクラス名を組み合わせてスタイリングを行う。使い方自体は Tailwind CSS に似ているが、クラスの扱いが異なる。

Tailwind CSS ではクラス名とプロパティがほとんど等しい。CSS プロパティの代わりにクラスを指定する。
Bootstrap ではクラスにある程度のスタイルが当てられている。また、クラス名はプロパティを表すものではなく、スタイルを表すものとなっている。当てたいスタイルをクラスを組み合わせて実装する。

[参考記事](https://zenn.dev/yamap_web/articles/a2d4d213d4eb48)

