// Socket.io events for changefeed
// socket-events.js

export default function(socket, entityName) {
	return function(rows) {
		rows.each(function(err, row) {
			if (err) { return console.log(err); }
			else if (row.new_val && !row.old_val) {
				socket.emit("INSERT_" + entityName, row.new_val);
			}
			else if (row.new_val && row.old_val) {
				socket.emit("UPDATE_" + entityName, row.new_val);
			}
			else if (row.old_val && !row.new_val) {
				socket.emit("DELETE_" + entityName, { id: row.old_val.id });
			}
		});
	};
};
