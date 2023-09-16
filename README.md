# Personnel Manager

Final Project for CS50 course.

## Video Demo

[Watch on Youtube](https://www.youtube.com/watch?v=yEev31JfG9s)

## Description

"Personnel Manager" is a web application I made for local Medical Center. It's built with Next.JS - a javascript framework and SQLite3.

This app helps Medical Center's management to see how busy the doctors are and helps avoid mistakes while giving assignments to doctors.

## To initialize project localy

Install all dependencies by running `pnpm install`, if you don't use pnpm, I think `npm install` should also work.

In .env file - set `NEXTAUTH_SECRET` to result of this command:

```bash
openssl rand -base64 32
```

Setup database file by running:

```bash
sqlite3 -init ./src/db/create.sql ./src/db/data.db .quit
```
