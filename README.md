# README #

Scrape Facebook posts using Facebook API. 

This Facebook scraper is designed with functional JavaScript/TypeScript in mind. I was trying my best to get the code as functional and as functionally pure as possible.

## How to install ##
* This project is written in `TypeScript` and compiles down to JavaScript using the `tsc` command. Please make sure you have the latest TypeScript installed on your system by running:
```npm i typescript -g```

## How to use ##
* Edit `config/default.json` and enter your Facebook appId and secretId. You can generate these keys by going to https://developers.facebook.com and creating a new app. Every app has these two unique keys associated with them, simply copy and paste these keys to the config file. 
* Also in `config/default.json` specify Facebook pages and days back you wish to scrape (default is 10 days back counting from today) 
* In `config/default.json` specify target dir where Facebook posts will be stored as .json files
* Compile TypeScript source files by simply running `tsc` in the project's directory. Target JavaScript files will be saved in `/dist` directory. Posts previously downloaded (meaning having the same Facebook id) won't be overwritten.
* Run the compiled `index.js` file placed in the `dist` directory: `node dist/index` or `npm start`
* Facebook posts will be downloaded to the rootDir specified in the config file

## Final notes ##
I configured a task runner for __Visual Studio Code__ for this TypeScript project that automatically compiles your source files to JavaScript. Simply press F1 and select Tasks: _Run Task > tsc_ to run this compiler task in the background.

Have fun scraping Facebook!
