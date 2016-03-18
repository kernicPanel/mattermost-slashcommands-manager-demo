# mattermost-slashcommands-manager-demo
Demo for Mattermost slashcommands manager

This is a demo for https://github.com/mattermost/platform/pull/2169


WARNING : UGLY CODE

This needs love, commands classes, and complete rewriting probably in another language.

## Installation

This has been tested on Ubuntu 14.04 only.

- Install nodejs `https://nodejs.org/en/download/`
- Clone this repo `git clone git@github.com:kernicPanel/mattermost-slashcommands-manager-demo.git`
- Install dependencies `npm install`
- Kick it `node index.js`

## Matermost setup

Under Account Settings > Advanced > Preview pre-released features check `Enable external application to offer slash command autocomplete`

Under Account Settings / Integration / Slash Commands, **add only one new with this params** (others params are not needed and untested for now, and having several ones breaks everything, more known bugs below)

- check "Enable external application to offer autocomplete"
- leave trigger blank
- enter mattermost-slashcommands-manager-demo url : `yourserver.tld:3000`
- keep POST format
