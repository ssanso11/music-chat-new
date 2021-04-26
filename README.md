# MusicChat

MusicChat aims to make online music lessons easier. Now ported over to Typescript, Next.js, and GraphQL! The old repository (using MERN stack) can be found [here](https://github.com/ssanso11/WebChatApp). Still very much a work in progress :)

## Installation

This project depends on a node package manager such as [Yarn](https://classic.yarnpkg.com/en/) to install the required Typescript packages. It also use [PostgresSQL](https://www.postgresql.org/) as the main database and [Redis](https://redis.io/) to store cookies. All of these technologies can be easily installed using [Homebrew](https://brew.sh/) for MacOS, or by following through the installation guide on their respective websites.

To install the required Typescript dependecies, run

```bash
yarn install
```

inside both the `/backend` and `/frontend` directories.

## Development

### Backend

1. Local development starts by running

```bash
yarn watch
```

inside of the backend directory. If everything compiles correctly, this should create a `/dist` directory.

2. Next, run

```
redis-server
```

to start the redis server. If you want, you can also run

```
redis-cli ping
```

which should output `PONG` after the server starts working

3. After the redis server is up, run

```
yarn dev
```

which should start the backend server on `localhost:4000`

## Frontend

4. Once your backend server is properly running, you can start the Next.js frontend server with

```
yarn dev
```

This will start spin up an instance of the site on `localhost:3000`
