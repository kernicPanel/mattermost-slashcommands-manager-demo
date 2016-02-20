var slashCommands = {};

slashCommands.externalCommand = {
  description: 'externalCommand description',
  suggestions: function(user, args, cb) {
    cb(null, [
      {
        content: 'subCommand1',
        description: 'externalCommand sub command 1 description'
      },
      {
        content: 'subCommand2',
        description: 'externalCommand sub command 2 description'
      },
      {
        content: 'subCommand3',
        description: 'externalCommand sub command 3 description'
      }
    ])
  },
  run: function(user, args, cb) {
    var output = [];
    output.push('externalCommand called by ' + user + ' with args ' + args.join(' '));
    cb(null, output);
  }
};

['start', 'stop', 'reboot'].forEach(function (commandName) {
  slashCommands[commandName] = {
    description: commandName + ' description',
    suggestions: function(user, args, cb) {
      var suggestions = [];
      ['webserver', 'dbserver', 'coffeeMachine'].forEach(function (subCommandName) {
        suggestions.push({
          content: subCommandName,
          description: commandName + ' sub command  ' + subCommandName + ' description'
        });
      });
      cb(null, suggestions)
    },
    run: function(user, args, cb) {
      var output = [];
      output.push( commandName + ' called by ' + user + ' with args ' + args.join(' '));
      cb(null, output);
    }
  };
});

module.exports = slashCommands;
