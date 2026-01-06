# 6. React.jsのサンプル

React Hookを用いてReactのサンプルを作り、感覚を覚えよう。

---

## サンプルの準備

前回と同様にコマンドでアプリを作る。

```bash
npx create-react-router react-hook-sample
```

## React Routerのサンプル：ホームページ

各サンプルのページへ遷移できるホームページを作成する。  
各サンプルのページからホームページへ戻るルートも作成する。

## useStateのサンプル：カウンター

+ボタンで数字が1増え、-ボタンで数字が1減るカウンターを作成する。  
カウントの管理にstateを用いる。  

## useEffectのサンプル：カウンター

useStateのサンプルで作成したカウンターにuseEffectのサンプルを追加する。  
useEffectの依存配列のバリエーションを全て使用して挙動の違いを確認する。
