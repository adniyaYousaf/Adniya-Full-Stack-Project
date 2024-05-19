## Setting up the project 🧰

We have set up an initial project for you to help with some of the complexities of the assessment. This project requires Node.JS version 20 or later. Make sure you have at least Node version 20 running:

```sh
node -v
```

The version number should be `v20.6.0` or higher:

```
v20.8.0
```

If this is lower, like `v18.18.2`, or `v20.5.5` you will need to install a more recent version of Node.JS. Refer to the [node installation guides](https://nodejs.org/en/download/package-manager) for your operating system. For Ubuntu based systems [NodeSource](https://github.com/nodesource/distributions) is usually a good way to do it.

Once you have confirmed that your node version is recent enough you can install the requirements. Change directory to the root of your monorepo. Then run the following commands:

```sh
npm install
```

Then to start up your frontend and backend locally, you can run

```sh
npm run dev
```

To confirm your server is running go to

```url
http://127.0.0.1:3100/health
```

in your browser. If the server is running you'll see a message saying

```json
OK
```

## Before you commit your changes

Read this [article on .gitignore](https://sabe.io/blog/git-ignore-node_modules). We have set up a basic `.gitignore` file for you.

## Frontend setup

Since we are using a monorepo, you can launch the frontend the same way you launch the backend. Run the following command in the root of your repo:

```sh
npm run dev
```

The code you put under `client/src` will then be accessible on http://localhost:3000

## Monorepo

The project is set up to run as a monorepo, where both the [`client`](../../client/) and [`server`](../../server/) source code live in the same git repository and are linked together. When using monorepos, there is some boilerplate code required to make sure both the frontend and the backend application can work at the same time and are accessible on the same URL. To kickstart your development we have set up this boilerplate code for you already. Feel free to look at the code, but generally you won't need to edit them if you follow the proposals in this guide.

If you are interested you can read more about what they do in the following places:

- [Client vite settings](../client/vite.config.js)
- [Server frontend middleware](../server/app.js)
