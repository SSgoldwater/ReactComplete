var repl = require("repl");
var pg = require('pg');
var config = require('./config.js');

var replServer = repl.start({
  prompt: "react-console > ",
  eval: myEval
})

var client = new pg.Client({ database: config.database });
client.connect(function(err) {
  if (err) throw err;
});

function myEval(cmd, context, filename, callback) {
  if (cmd == bye) {
    console.log("ok bye");
    replServer.exit();
  } else {
    callback(null, "no");
  }
}

replServer.defineCommand('createTable', {
  help: 'Get all ToDos',
  action(name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    var a = name;
    this.displayPrompt();
  }
});

replServer.defineCommand('ToDo.getAll', {
  help: 'Get all ToDos',
  action() {
    var _this = this;
    this.lineParser.reset();
    this.bufferedCommand = '';
    client.query("SELECT * FROM todos", function(err, result) {
      if (err) {
        throw err;
      } else {
        console.log(result.rows);
        _this.displayPrompt();
      }
    });
  }
});
