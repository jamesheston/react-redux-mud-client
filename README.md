# React Redux MUD Client

This browser-based MUD client was made specifically for [MUME](http://mume.org/), but should be trivial to adapt to other MUDs.

It was built on top of create-react-app, so React handles rendering the UI. The state is managed by Redux. Websockets are used to wrap the http requests to and from the MUD server into a stream that can be consumed by JavaScript in the browser.


Quick Start
-----------
```
git clone <url>
cd <dir>
npm install
# open a 2nd terminal tab and run the following to start the proxy localhost server which wraps the MUD server's output in websockets
npm run server
# back in 1st terminal run the following to start the application
npm start
```

Current Features
----------------
* ANSI color rendering
* double-clicking on history window focuses user input bar and selects text
* command stacking with semicolon delimiter, e.g. `open exit north;north;close exit south`
* user input history scrolling with up and down arrows when user input bar is focused 
* autosaves History Window messages, user input commands, and other session data every second to that data isn't lost when browser window closes. Your old session should automatically reload with history intact next time you visit site.


