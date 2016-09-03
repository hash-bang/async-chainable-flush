module.exports = function(async) {
	this._plugins['flush'] = function(params) {
		var self = this;

		this.new()
			.forEach(params.streams, function(next, stream) {
				stream.write('', next);
			})
			.end(function(err) {
				self._execute(err);
			});
	};

	this.flush = function() {
		var args = Array.prototype.slice.call(arguments, 0);
		if (!args.length) args = [process.stdout, process.stderr];

		this._struct.push({
			type: 'flush',
			streams: args,
		});

		return this;
	};
};
