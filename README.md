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

Permissive MIT License
----------------------
```
Copyright (c) 2017 James Heston

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
