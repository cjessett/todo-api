import Server from 'socket.io'
import r from 'rethinkdb'
import changefeedSocketEvents from './socket-events'

let io = new Server().attach(8090)

r.connect({ db: 'test' })
.then(function(connection) {
	console.log('connected to DB')

	io.on('connection', function (socket) {
		console.log('connected to client')
		// insert new todos
		socket.on('todo:client:insert', function(todo) {
			r.table('Todo').insert(todo).run(connection);
		});

		// update todo
		socket.on('todo:client:update', function(todo) {
			var id = todo.id;
			delete todo.id;
			r.table('Todo').get(id).update(todo).run(connection);
		});

		// delete todo
		socket.on('todo:client:delete', function(todo) {
			var id = todo.id;
			delete todo.id;
			r.table('Todo').get(id).delete().run(connection);
		});

		// emit events for changes to todos
		r.table('Todo').changes({ includeInitial: true, squash: true }).run(connection)
		.then(changefeedSocketEvents(socket, 'TODO'));
	});
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!');
	console.log(error);
});
