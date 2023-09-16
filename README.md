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

## Projects structure

This app uses NextJS's `App router`.

Folders are used to define routes. A route is a single path of nested folders, following the file-system hierarchy from the root folder down to a final leaf folder that includes a `page.ts` file

In each page we use different UI components that are imported from `src/components`

For authentication I decided to use [NextAuth](https://next-auth.js.org/getting-started/example) —  a complete open-source authentication solution for Next.js applications.

Configuration for NextAuth is in `src/app/utils/authOptions`.

If user is not logged in and tries accessing any page, he will be redirected to `/login` page.

Upon executing `signIn` function, database checks if user with such username exists, and if this user does exists, we check password provided in login form with hash of the password stored in database by using `bcrypt` — a NodeJS library for hashing and comparing passwords. If password and hash matches, we return the User object, if not - null.

After successful signin we redirect user to `/dashboard/month` and make a GET fetch request for doctors and events. After recieving data a table is being drawn.

For each date, we generate a Table data cell with events for that day.
After clicking on each cell we get different context menu, depending on kind of active events for that day and doctor.

All SQL commands are written in `src/app/utils/sqlCommands.ts`.
We run this commands on each upon action call in context menu.

I found biggest difficulities in optimising table generation, since there are so many options and a lot of JavaScript has to be loaded, making generation slow. I'm still looking for ways to make it faster.

Another problem I faced was designing database model for events, I should have created relational models, but decided to cheat a little bit and what should be relations are just JSON.stringified arrays/objects. I plan on refactoring this part later.

Right now my dashboard makes a GET fetch request every 5 seconds to get Events in case there were changes (This app is made in mind for couple of people to work with database simultaniously), but I think I should switch to WebSockets for that. I must read more about them and how to implement it.
