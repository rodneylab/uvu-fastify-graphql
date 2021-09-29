<img src="./images/rodneylab-github-uvu-fastify-graphql.png" alt="Rodney Lab uvu-fastify-graphql Github banner">

<p align="center">
  <a aria-label="Open Rodney Lab site" href="https://rodneylab.com" rel="nofollow noopener noreferrer">
    <img alt="Rodney Lab logo" src="https://rodneylab.com/assets/icon.png" width="60" />
  </a>
</p>
<h1 align="center">
  uvu Fastify GraphQL
</h1>

# uvu-fastify-graphql

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/rodneylab/uvu-fastify-graphql)

Demo code for running uvu tests in a backend app. The code accompanies the <a aria-label="Open Rodney Lab blog post on using uvu for Type script A P I testing" href="https://rodneylab.com/using-uvu-typescript-api-testing/">article on using uvu for TypeScript API testing</a>. If you have any questions, please drop a comment at the bottom of that page.

## Run Development Server

In one terminal tab run:

```shell
pnpm run watch
```

then in a second tab

```shell
pnpm run dev
```

To test a GraphQL query, navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser.

## Run Tests

Stop the dev server then run

```shell
pnpm test
```

You can add additional tests under the `tests` folder.
