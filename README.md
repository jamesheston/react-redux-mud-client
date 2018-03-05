# React Redux MUD Client

This browser-based MUD client was made specifically for [MUME](http://mume.org/), but should be trivial to adapt to other MUDs.

It was built on top of create-react-app, so React handles rendering the UI. The state is managed by Redux. Websockets are used to wrap the http requests to and from the MUD server into a stream that can be consumed by JavaScript in the browser.

Quick Start
-----------
```
git clone https://github.com/jamesheston/react-redux-mud-client
cd react-redux-mud-client
npm install
# open a 2nd terminal tab and start the proxy server between websockets and the MUD server:
npm run server
# back in 1st terminal run this to start the web app:
npm start
```
Current Features
----------------
* ANSI color rendering
* user defined **aliases** and **triggers** 
* command stacking with semicolon delimiter, e.g. `open exit north;north;close exit south`
* user input command history - scroll history with up and down arrows when input bar is focused