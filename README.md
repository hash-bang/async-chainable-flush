async-chainable-flush
=====================
Plugin for [async-chainable](https://github.com/hash-bang/async-chainable) that flushes various output streams before continuing.

This is mainly useful for CLI based scripts which need to ensure `process.stdout` + `process.stderr` have output their contents before exiting.


```javascript
var asyncChainable = require('async-chainable');
var asyncChainableFlush = require('async-chainable-flush');

asyncChainable()
	.use(asyncChainableFlush)

	.then(function(next) {
		for (var i = 0; i < 1000; i++) {
			console.log('I =', i);
		}
		next();
	})
	.flush() // Assumes process.stdout + process.stderr if nothing is specified
	.end();
```


API
===
The async-chainable-flush API exposes a single API call `flush()` which can take any number of streams to wait for before continuing. If no streams are specified `process.stdout` and `process.stderr` are assumed.


```javascript
asyncChainable()
	.use(asyncChainableFlush)

	.then(function(next) {
		for (var i = 0; i < 1000; i++) {
			console.log('I =', i);
		}
		next();
	})
	.flush(process.stdout) // Only wait for process.stdout to flush before continuing
	.end();
