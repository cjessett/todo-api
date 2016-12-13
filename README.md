# todo-api
This is a simple API that uses [socket.io](http://socket.io) to persit data to RethinkDB in realtime.
Make sure you are running the [client](https://github.com/cjessett/todo-client) app for the nice views.

`npm install`

install rethinkdb on your machine
For OSX users:

`brew update && brew install rethinkdb`

start a rethink instance

`rethinkdb`

visit localhost:8080 in your browser and make sure a database called 'test' has been created

then create a table called 'Todo'

run the node server

`npm start`
