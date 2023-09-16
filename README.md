# Personnel Manager (Final Project for CS50)

[Youtube presentation](https://youtube.com)

"Personnel Manager" is a web application made for my local Medical Center. It's built with Next.JS - a javascript framework.

This app helps Medical Center's management to see how busy the doctors are and helps avoid mistakes while giving assignments to doctors.

## To initialize project localy

Install all dependencies by running 'pnpm install', if you don't use pnpm, I think 'npm install' should also work.

In .env file - set NEXTAUTH_SECRET to result of this command "openssl rand -base64 32".

Setup database file by runnin 'sqlite3 -init ./src/db/create.sql ./src/db/data.db .quit'
