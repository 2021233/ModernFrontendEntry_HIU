# 前回のあらすじ

- React Hook：`useState`、`useEffect`、メモ化
- ページのレンダリング方法：CSR、SSR
- Webアプリケーションの方式：SPA、MPA
- React RouterとNext(App Router)のページ遷移方法

# 5. Next.jsの特徴的機能

Nextの特徴的な機能について解説します。

目標

- サーバ関数について知る
- サーバコンポーネントについて知る
- クライアントコンポーネントについて知る

---

## サーバ関数

React や Next においてサーバで実行される関数を **サーバ関数** とよぶ。

サーバ関数は関数に「これはサーバ上で実行してください」という印(ディレクティブ)をつけることで作成できる。  
サーバ関数には以下のような利点がある。

- 処理をAPIとして公開する必要がない
    - クライアント側に処理を書く必要がない
    - 第三者に利用されるリスクを低減できる
- サーバの環境変数を利用できる
    - APIキーなどを隠せる

## サーバ関数を作成する

### ファイル全体をサーバ関数にする

ファイル全体をサーバ関数にするには、ファイルの最上部に`"use server";`ディレクティブを追加する。  
関数はすべて非同期関数である必要がある。

```typescript
"use server"

import { db } from "@/lib/db" // データベースクライアント

export async function createUser(data: { name: string; email: string }) {
    const user = await db.user.create({ data })
    return user
}
```

コンポーネントで import して利用する。

```typescript
import { createUser } from "../lib/createUser";
import { JSX } from "react";

export default function UserRegistForm(): JSX.Element {
    return (
        <form action="createUser">
            <label for="name">
                name:
                <input id="name" type="text">
            </label>
            <label for="email">
                email:
                <input id="email" type="text">
            </label>
            <button>submit</button>
        </form>
    );
}

// 通常の関数同様にも使うことができる
export default function UserRegistFormCopy(): JSX.Element {
    const handleSubmit = async (name, email) = {
        createUser(name, email).then(res => {
        if(res.ok) return res.body;
        throw new Error("failed to create user.");
        });
    };
    return (
        <form action="createUser">
            <label for="name">
                name:
                <input id="name" type="text">
            </label>
            <label for="email">
                email:
                <input id="email" type="text">
            </label>
            <button>submit</button>
        </form>
    );
};
```

### 一部の関数をサーバ関数にする

コンポーネント内の関数など特定の関数をサーバ関数にしたい場合は、関数の最上部に`"use server";`ディレクティブを追加する。  
関数は非同期関数である必要がある。

```typescript
import { JSX } from "react"
import { EditPost } from "./edit-post"

export default async function PostPage({
    params
}: {
    params: { id: string }
}): JSX.Element {
    const post = await getPost(params.id)

    async function updatePost(formData: FormData) {
        "use server"
        await savePost(params.id, formData)
    }

    return <EditPost updatePostAction={updatePost} post={post} />
}
```

---

## サーバコンポーネント

サーバコンポーネントとは、サーバ上でレンダリングされるコンポーネントを指す。サーバでコンポーネントをレンダリングし、結果をクライアントに渡す。  
サーバコンポーネントでは以下のことを行うことができる。

- データベースから直接、または API を用いてデータを取得する
- ユーザに見られてはいけない情報を使用する
    - API キーやアクセストークンなど環境変数にするようなもの
- ブラウザに送信される JavaScript を削減する

### サーバコンポーネントを作成する

Next ではすべてのコンポーネントがデフォルトでサーバコンポーネントとなる。  
明示的に作成するには、ファイルの最上部に`"use server";`ディレクティブを追加する。

```typescript
"use server"

import { JSX } from "react"
import { getUserDetail } from "@/actions/user/getUserDetail"
import { UserDtail } from "@/components/user/detail/UserDetail"

// サーバコンポーネントは非同期関数でなければならない
// サーバコンポーネントのファイルからエクスポートできるコンポーネントはdefaultの1つのみ
export default async function UserDetilPage({
    params
}: {
    params: {
        id: number
    }
}): Promise<JX.Element> {
    const { id } = await params
    const user = await getUserDetail(id)

    return <UserDetail user={user} />
}
```

### `"use server";`ディレクティブについて

前述の通り、Next は断りのない限りすべてのコンポーネントをサーバコンポーネントとして扱う。関数をサーバ関数として扱うためには必須だが、コンポーネントは必須ではない。

---

## クライアントコンポーネント

クライアントコンポーネントとは、クライアント側でレンダリングされるコンポーネントを指す。サーバ上では特に処理をせずクライアントに渡し、クライアント側の React がレンダリングする。  
クライアントコンポーネントでは以下のことができる。

- React Hooks やカスタム Hooks の利用
- クラスコンポーネントの利用
- `localStorage`や`window`などのブラウザ API の利用

コンポーネント内でも動的な動作が必要なコンポーネントのみクライアントコンポーネント化することで、クライアントへ送信される JavaScript の量を減らしつつインタラクティブな Web アプリケーションを実現できる。

### クライアントコンポーネントを作成する

クライアントコンポーネントを作成するには、ファイルの最上部に`"use client";`ディレクティブを追加する。

```typescript
"use client";

import { JSX } from "react";
import { CartItem } from "./CartItem";
import { Cart } from "@/types/cart";

export function Cart({ cart }: { Cart }): JSX.Element {
    return (
        <div class="cart_container">
            <h1>カート</h1>
            <div class="cart_item-wrapper">
                {
                    cart.items.map((item, index) => (
                        <CartItem
                            key={index}
                            item={item}
                        />
                    ))
                }
            </div>
        </div>
    );
}
```

### `"use client";`ディレクティブについて

Next は`"use client";`ディレクティブがついているコンポーネントと、そのコンポーネントがインポートして使用しているコンポーネントすべてをクライアントコンポーネントと判断する。  
そのため、サーバコンポーネントからインポートされるコンポーネントにディレクティブをつけるだけでよい。

## server-only ライブラリ

`"use server";`ディレクティブはサーバサイドでのみ実行されることを保証するものではなく、クライアントコンポーネントでインポートして使用できる。このとき、クライアントコンポーネントへは関数の中身ではなく宛先が渡されるようになっている。  
サーバ関数やサーバコンポーネントをサーバサイドでのみ実行されるように強制したい場合は、server-only ライブラリを利用する。

```bash
npm i server-only
```

サーバサイドでのみ実行させたい関数やコンポーネントに`server-only`をインポートする。

```typescript
// コンポーネントの場合
import "servsr-only"
import { JSX } from "react"

export default async function AwesomeComponent(): JSX.Element {
    return <h1>Hello world!</h1>
}
```

```typescript
// 関数の場合
import "server-only"
import { Response } from "@/types/dummy"

export default async function AwesomeFunction(): Promise<Response> {
    return fetch(
        `https://example.com/api/v1//gerstatus?accessKey=${proccess.env.ACCESS_KEY}`
    )
}
```
