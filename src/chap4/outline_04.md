# 4. ページ遷移

ページ遷移の実装方法について、React と Next での違いに触れながら解説します。加えて、ページ遷移の実現方法についても解説します。

## 目標

-   ページ遷移の実装の特徴について理解する
-   ページ遷移の実現方法である SPA、MPA と CSR、SSR について理解する

## 成果物

ReactとNextでページ遷移のサンプルをつくろう。

# ページのレンダリング

Web アプリケーションのページの生成には主に 2 つの方法がある。要件に応じて使い分けたり組み合わせたりする必要がある。

## CSR

CSR は「クライアントサイドレンダリング」の略で、サーバーは JavaScript を返しクライアントのブラウザで実行する。リクエストに対してファイルを返すだけのサーバーでも実現できページ生成処理がブラウザで完結するためサーバーの負荷が軽いが、クライアント側の初期表示が遅く SEO に弱い。  
SPA は CSR を用いる。

## SSR

SSR は「サーバーサイドレンダリング」の略で、サーバー側で HTML を生成して返す。クライアントは HTML を取得するので初期表示が早く SEO にも強いが、node.js に対応したサーバーが必要な上リクエストの度に HTML を生成するため、サーバの負荷が重くページ遷移が遅くなる。  
MPA は基本的に SSR を用いる。部分的に CSR を利用できる場合もある。App Router は部分的な CSR に対応している。

## CSR と SSR の組み合わせ

不特定多数のユーザが使うなどでパフォーマンスやユーザ体験を重視する Web アプリケーションの場合は CSR を用いるのがよい。その中で、SEO 対策を施したり初期表示を速めたり多くのデータ取得を実行したりしたいページだけ SSR を用いる。  
一方で社内アプリケーションのように特定のユーザしか使わない場合は CSR だけを用いて問題ない。

# SPA と MPA

Web アプリケーションが複数のページを扱う方法は SPA と MPA の 2 つがある。Web アプリケーションのパフォーマンスに大きく関わるため、要件に合った方法を選ぶ必要がある。

## SPA とは

1 枚の Web ページのみを持ち、中身を JavaScript で入れ替える構成を「SPA(シングルページアプリケーション)」という。  
SPA の初期表示は、取得した JavaScript を実行して空の Web ページのコンテンツを全て生成するという方法をとる。また、ページ遷移も同様に、ページの再読み込みの代わりに URL に対応したコンテンツを JavaScript で生成する。  
ページ遷移ごとに Web ページを取得しないため、ページ遷移の処理が速くサーバ負荷が軽いという利点がある。一方で初期表示で全ページ分の JavaScript を取得するため、初期表示が遅く SEO に不利という弱点がある。

## MPA とは

通常の Web サイトと同様に複数の Web ページを持つ構成を「MPA(マルチページアプリケーション)」という。  
MPA の初期表示は、サーバから Web ページを取得して表示する方法をとる。また、ページ遷移も同様に、URL に対応した Web ページを取得して表示する。  
初期表示が速く SEO に有利という利点がある。一方でページ遷移ごとに Web ページを取得するためページ遷移の処理が遅くサーバ負荷が重いという弱点がある。

# ページ遷移について

Web アプリケーションのページ遷移や URL とコンポーネントを対応付けることを「ルーティング」とよぶ。また、対応付けした URL を「ルート」とよぶ。

## React のページ遷移

React は UI ライブラリであり、ページ単体の UI を構成することのみを担う。そのため、React 単体ではアプリケーション内でのページ遷移の機能を持たない。ライブラリを導入することで React で SPA を構築することができる。

## React Router

URL に対応するコンポーネントを指定することで React アプリケーションを SPA 化することができる。  
今回は React Router v7 を扱う。

### セットアップ

React Router を導入するは以下のコマンドを使用する。

```bash
# はじめからReact Routerを導入する
npx create-react-router@latest react-router-app
# 既存のReactアプリケーションにReact Routerを導入する
npm install react-router-dom
```

### ルーティング

ルーティングは`app/routes.ts`で行う。

```typescript
import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    // /に対応するルート
    index("./routes/home.tsx"),
    // /contactに対応するルート
    route("/contact", "./routes/contact.tsx"),
] satisfies RouteConfig;
```

### ネストされたルート

例えば`/mypage`内に`/mypage/settings`と`/mypage/profile`があり、各ページにアクセスすると画面の一部が変わるだけだとする。この場合、`/mypage/settings`と`/mypage/profile`が`/mypage`の中に属することを`Route`で表現する。

```typescript
import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

export default [
    // 共有するレイアウト 親
    route("mypage", "./mypage-layout.tsx", [
        // 入れ替わるコンポーネント 子
        // この場合のindexは/mypageに対応付けられる
        index("./mypage.tsx"),
        route("settings", "./settings.tsx"),
        route("profile", "./profile.tsx"),
    ]),
] satisfies RouteConfig;
```

レイアウト内に入れ替わるコンポーネントを配置するには`Outlet`コンポーネントを使用する。

```typescript
import { JSX } from "react"
import { Outlet } from "react-router-dom"

export default function Mypage(): JSX.Element {
    return (
        <div>
            <h1>MyPage</h1>
            {/* URLに対応してコンポーネントが入れ替わる */}
            <Outlet />
        </div>
    )
}
```

### レイアウトルート

ネストされていない URL のページで共通のレイアウトを使う場合、ネストされたルーティングのようにレイアウトを共有するページを設定できる。このとき、URL はネストされない。

```typescript
import {
    type RouteConfig,
    route,
    layout,
    index,
} from "@react-router/dev/routes";

export default [
    layout("./marketing/layout.tsx", [
        {/* /に対応 */}
        index("./marketing/home.tsx"),
        {/* /contactに対応 */}
        route("contact", "./marketing/contact.tsx"),
    ])
] satisfies RouteConfig;
```

## ルートプレフィックス

ネストしたすべての子のルートに共通の接頭辞を付けることができる。ネストしたルートのように親のルートを作らず、レイアウトルートのようにレイアウトを共有しない。

```typescript
import {
    type RouteConfig,
    route,
    index,
    prefix,
} from "@react-router/dev/routes";

export default [
    {/* /projectsは作成されない */}
    ...prefix("projects", [
        {/* /projectsはここで作成される */}
        index("./projects/home.tsx"),
        route("contact", "./marketing/contact.tsx")
    ])
] satisfies RouteConfig;
```

### 動的ルーティング

URL の指定に`:パラメータ名`を用いることで URL から変化する値を取得できる。

```typescript
import {
    type RouteConfig,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    layout("./projects/project-layout.tsx", [
        route(":pid", "./projects/project.tsx"),
        route(":pid/edit", "./projects/edit-project.tsx"),
    ]),
] satisfies RouteConfig;
```

値は`prams`props で受け取ることができる。

```typescript
import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {
    // loaderという名前の非同期コンポーネントを作ると読み込み中に表示させることができる
}

export default function Project({
    params,
}: Route.ComponentProps) {
    const { id } = params;
    // 省略
}
```

URL から受け取るパラメータは複数設定できる。

```typescript
route("c/:categoryId/p/:productId", "./product.tsx"),
```

パラメータに`?`を付けるとパラメータをオプショナル(値がない場合も受け入れる)にできる

```typescript
route(":lang?/categories", "./categories.tsx")
```

### 存在しないルート

URL の指定に`*`を使うと他に設定したルートに一致しない URL すべてに対応するルートを作成できる。

```typescript
import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    // 設定していない/user/に続くパターンに対応
    route("user/*", "default.tsx"),
    // 設定していないすべてのパターンに対応
    route("*", "not-found.tsx"),
] satisfies RouteConfig;
```

`*`にあたるパスはコンポーネントに`params`を通して渡される。  
このとき、`*`は変数名として使うことができないため、名前を変える必要がある。一般的には`splat`と名付けられる。

```typescript
export function NotFound({ params }: Route.LoaderArgs) {
    const { "*": splat } = params
}
```

### ページ遷移

ページ遷移には主に`<NavLink>`、`<Link>`、`redirect`を用いる。

#### `<NavLink>`

`<NavLink>`はアクティブ状態と保留状態をレンダリングできる。

```typescript
import { NavLink } from "react-router"

export function MyAppNav() {
    return (
        <nav>
            <NavLink to="/" end>
                ホーム
            </NavLink>
            <NavLink to="/trending" end>
                トレンドのコンサート
            </NavLink>
            <NavLink to="/concerts">すべてのコンサート</NavLink>
            <NavLink to="/account">アカウント</NavLink>
        </nav>
    )
}
```

`<NavLink>`は現在の状態に応じて自動で class 名をレンダリングする。

```css
a.active {
    color: red;
}

a.pending {
    animate: pulse 1s infinite;
}

a.transitioning {
    /* css transition is running */
}
```

また、`className`props と`style`props と`children`で状態を反映できるコールバックプロパティがある。

```jsx
// className
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
>
  メッセージ
</NavLink>

// style
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  メッセージ
</NavLink>

// children
<NavLink to="/tasks">
  {({ isActive, isPending, isTransitioning }) => (
    <span className={isActive ? "active" : ""}>タスク</span>
  )}
</NavLink>
```

#### `<Link>`

`<Link>`は状態をレンダリングしない。

```typescript
import { Link } from "react-router";

export function LoggedOutMessage() {
  return (
    <p>
      ログアウトしました。{" "しました。{" "}
      <Link to="/login">再度ログイン</Link>
    </p>
  );
}
```

#### `redirect`

ユーザの操作だけでなく処理内で別の URL に遷移できる。

```typescript
import { redirect } from "react-router"

export async function loader({ request }) {
    let user = await getUser(request)
    if (!user) {
        return redirect("/login")
    }
    return { userName: user.name }
}
```

## Next のページ遷移

Next は React に更に機能を追加したフレームワークであり、アプリケーション内のページ遷移の機能を持つ。  
Next ではバージョンによって導入されているページ遷移機能が異なる。今回は Next.js 13 以降で導入できる App Router について解説する。(Next.js の最新バージョンは 16)

## App Router

`/app`ディレクトリ内の`page.tsx`にディレクトリ構造と対応した URL が自動で生成され、Next アプリケーションを MPA 化することができる。

### セットアップ

App Router はバージョン 13 以降の next のセットアップ時に自動で導入される。

```bash
npx create-next-app@latest next-app --yes
```

### ルートレイアウト定義

`app`ディレクトリ内に必須の`layout.tsx`を作成する。これには`html`タグと`body`タグを含む必要がある。  
`layout.tsx`はすべてのページで表示されるデフォルトのレイアウトとなるため、ヘッダーやフッターを含めることもある。

```typescript
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    )
}
```

この`layout.tsx`は React Router におけるネストされたルートの親コンポーネントにあたる。

### ルーティング

`/app`内で`page.tsx`を作成すると、そのディレクトリ構造が自動で URL に反映される。例えば、`/app/contact/page.tsx`は`https://example.com/contact`にアクセスすると表示される。  
同じディレクトリ内に`page.tsx`以外のファイルがあっても`page.tsx`が表示されるため、子コンポーネントをファイル分けしても問題ない。

子コンポーネントやその他ページで使用するファイルを`page.tsx`と同じディレクトリに配置するディレクトリ構造をコロケーションという。  
一方、コンポーネントや関数などはそれぞれのディレクトリに分けるディレクトリ構造をデコロケーションという。  
どちらにもメリットとデメリットがあり、React と Next ともにどちらのディレクトリ構造を利用できるため、チームで利用しやすい方を採用するのがよい。  
(公式ドキュメントでは「どちらにせよ後々変更したくなるのだから 5 分で決めろ」と触れられている)

```
コロケーションの例
-/app
	|layout.tsx
	|page.tsx
		-/mypage
			|page.tsx
			|Button.tsx
			|Card.tsx
		-/posts
			|page.tsx
			|Card.tsx
		-/items
			|page.tsx
			|Card.tsx
```

```
デコロケーションの例
-/app
	|layout.tsx
	|page.tsx
	-/mypage
		|page.tsx
	-/posts
		|page.tsx
	-/items
		|page.tsx
-/components
	-/mypage
		|Button.tsx
		|Card.tsx
	-/posts
		|Card.tsx
	-/items
		|Card.tsx
```

### ネストされたレイアウト

App Router ではレイアウトをネストすることができる。  
例えば、全ページで表示されるヘッダーとフッターはルートレイアウトで定義し、いくつかのページで共通のレイアウトをルートレイアウトにネストさせることができる。  
以下の例では、全体のレイアウトである`/app/layout.tsx`にマイページで共通のレイアウトである`/app/mypage/layout.tsx`をネストさせている。

```
-/app
	|layout.tsx
	|page.tsx
		-/mypage
			|layout.tsx
			|page.tsx
			|Button.tsx
			|Card.tsx
			-/settings
				|page.tsx
			-/profile
				|page.tsx
			-/follower
				|page.tsx
			-/follow
				|page.tsx
```

### 動的ルーティング

ディレクトリ名を`[パラメータ名]`とすることで`page.tsx`でパラメータを受け取ることができる。
例えば、`/app/items/[id]/page.tsx`では以下のように`[id]`に入る値を受け取ることができる。

```typescript
import { JSX } from "react"

export default async function ItemDetailPage({
    params
}: {
    params: Promise<{ id: number }>
}): Promise<JSX.Element> {
    const { id } = await params
    const item = await getItem(id)

    // 省略
}
```

### ページ遷移

ページ遷移には主に`Link`コンポーネントを使う。  
Next の`Link`コンポーネントは`a`タグを拡張し効率よくページ遷移を行うことができる独自のコンポーネントとして提供されている。

```typescript
import Link from "next/link"

export default function Sample(): JSX.Element {
    return (
        <div>
            <span>mypage</span>
            <Link href="/mypage" />
        </div>
    )
}
```

# ページ遷移のサンプル

ここからは React と Next でそれぞれページ遷移のサンプルコードを作成して動かしてみる。

## ディレクトリの準備

`IntroductionNextjs/chap03`を作成する。その後、`chap03`内で React と Next のアプリケーションを作成する。  
いくつかの質問に答える対話形式で設定を行う。

```bash
# React-Routerがインストール済みのReact.jsをセットアップ
# react-sample-appという名前でプロジェクトを作成する
npx create-react-router@latest react-sample-app

# 質問は以下の通り、カーソルキーで選択
# Git管理しますか？ -> Noを選んでEnter
# 必要なNPMパッケージをインストールしてよいですか？ -> Yesを選んでEnter
```

```bash
# App Routerがインストール済みのNext.jsをセットアップ
# next-sample-appという名前でプロジェクトを作成する
npx create-next-app@latest next-sample-app

# 質問は以下の通り、カーソルキーで選択
# Nextの推奨設定を使用しますか？ -> Yesを選んでEnter
```

最終的に`chap03`内に`react-sample-app`と`next-sample-app`が作成される。  
(プロジェクト名を誤っても特に影響はないので作り直さなくてよい)  
作成されたプロジェクトの構成は以下の通り。

react-sample-app/

-   .dockerignore
-   .gitignore
-   Dockerfile
-   README.md
-   app/
-   node_modules/
-   package-lock.json
-   package.json
-   public/
-   react-router.config.ts
-   tsconfig.json

next-sample-app/

-   .gitignre
-   .next
-   README.md
-   app/
-   eslint.config.mjs
-   next-env.d.ts
-   next.config.ts
-   node_modules/
-   package-lock.json
-   package.json
-   postcss.config.mjs
-   public/
-   ts.config.json

## 初期プロジェクトを実行してみる

プロジェクトには作成した初期状態で表示されるページが用意されている。まずはそれを表示してみる。  
reactのサンプルは以下の手順で実行する。

```bash
cd react-sample-app
npm run dev
```

すると以下のような出力で止まる。

```bash
   > dev
   > react-router dev

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
```

ブラウザで`http://localhost:5173`にアクセスすると React Router のデフォルトページが表示される。  

nextのサンプルも同様の手順で実行できる。

```bash
cd ../next-sample-app
npm run dev
```

すると以下のような出力で止まる。

```bash
   ▲ Next.js 16.0.3 (Turbopack)
   - Local:         http://localhost:3000
   - Network:       http://100.90.179.39:3000
```

ブラウザで`http://localhost:3000`にアクセスすると App Router のデフォルトページが表示される。  

## React Routerのサンプル

React Routerのサンプルのソースコードは以下の構成になっている。

```
app/
| routes/ //ページを管理するディレクトリ
| | home.tsx // ホームページを表示するだけのコンポーネント
| welcome/ // ページごとにコンテンツを管理するディレクトリを作成
| | logo-dark.svg
| | logo-light.svg
| | welcome.tsx  // ホームページの本体
| app.css
| root.tsx // ルートレイアウト
| routes.ts // ルーティング定義
```

ページを増やすには`app/routes.ts`でルーティングを追加し、`routes/`にページを追加する。  
これらのページはコンポーネントを呼び出して返すだけにする。  
コンテンツは`welcome`ディレクトリのように、別のディレクトリを作成して管理する。

## App Routerのサンプル

App Routerのサンプルのソースコードは以下の構成になっている。

```
app/
| favicon.ico
| globals.css
| layout.tsx // ルートレイアウト
| page.tsx // ホームページ
```

ページを増やすにはURLと対応するディレクトリに`page.tsx`を作成する。  
これらのページもReact Routerと同様に、基本的にコンポーネントを呼び出して返すだけにする。  
このサンプルではコンテンツが`page.tsx`に含まれている。

## サンプルの最低要件

今回は簡単なプロフィールページと趣味紹介ページの2つのページを作成してもらう。  

ReactとNextのサンプルアプリのホームページに各ページへのリンクを配置し、各ページからホームページに戻れるようにすること。  
余裕があればページを増やしたりホームページを変更したりしてもよい。
また、今回はページ遷移のサンプル作成が目的のためスタイリングは行わなくてもよい。余裕があればスタイルを整えてみるとよい。

