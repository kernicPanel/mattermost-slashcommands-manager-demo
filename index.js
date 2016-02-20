'use strict';

const Hapi = require('hapi');
const commands = require('./slashCommands');

const server = new Hapi.Server({ debug: { request: ['info'] } });
server.connection({ port: 3000 });

server.route({
  method: 'POST',
  path: '/commands',
  handler: function (request, reply) {
    var user_name = request.payload.user_name;
    var trigger = request.payload.trigger_word || '/';
    var command = request.payload.command.replace(trigger, '')
    var args = request.payload.text.split(' ');

    if (!!commands[command]) {
      if (request.payload.suggest && typeof commands[command].suggestions === 'function') {
        commands[command].suggestions(user_name, args, function(err, suggestions){
          var suggestionsRes = suggestions.map(function(suggestion){
            return {
              external_management: true,
              trigger: command + ' ' + suggestion.content,
              auto_complete_desc: suggestion.description
            }
          })
          reply(suggestionsRes);
        });
      }
      else if (!!commands[command] && typeof commands[command].run === 'function') {
        commands[command].run(user_name, args, function(err, output){
          if (!!err) {
            if (!!err.join) {
              err = err.join('\n');
            }
            reply({
              username: 'slashcommands-manager',
              icon_url: 'http://media.tumblr.com/73eea773f3d6e739ba800a3317929694/tumblr_inline_mtk5zkUL0L1qersu1.png',
              response_type: 'in_channel',
              text: err
            });
            return;
          }
          if (!!output && !!output.join) {
            output = output.join('\n');
          }
          console.log('output', output);
          reply({
            username: 'slashcommands-manager',
            icon_url: 'http://www.clker.com/cliparts/n/V/7/g/M/Q/right-mark-hi.png',
            response_type: 'in_channel',
            text: output
          });
        });
      }
    }
    else {
      if (request.payload.suggest) {
        var suggestions = [];

        Object.keys(commands).sort().forEach(function(commandName) {
          var commandBody = commands[commandName];
          if (commandName.search(command) === 0) {
            suggestions.push({
              external_management: true,
              trigger: commandName,
              auto_complete_desc: commandBody.description
            });
          }
        });
        reply(suggestions);
      }
      else{
        reply({
          username: 'slashcommands-manager',
          icon_url: 'http://media.tumblr.com/73eea773f3d6e739ba800a3317929694/tumblr_inline_mtk5zkUL0L1qersu1.png',
          response_type: 'in_channel',
          text: 'Command ' + command + ' unknown.'
        });
      }
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    // reply('Mattermost Slashcommands demo');
    reply('Mattermost Slashcommands demo');
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

