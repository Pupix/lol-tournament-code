# lol-tournament-code
This is an utility module that allows the creation of custom games for tournament purposes. It provides the possibility to receive the in game statistics, after the game has eneded, to a specified URL.

## Download
lol-tournament-code is installable via:

- [GitHub](https://github.com/Pupix/lol-tournament-code) `git clone https://github.com/Pupix/lol-tournament-code.git`
- [bower](http://bower.io/): `bower install lol-tournament-code`
- [npm](https://www.npmjs.com/): `npm install lol-tournament-code`

## Quick Examples
```js
opt = {
  name: 'TournamentGame'
}

tournmentCode(opt)
// => "pvpnet://lol/customgame/joinorcreate/map11/pick6/team5/specDROPINONLY/eyJuYW1lIjoiVG91cm5hbW5ldEdhbWUiLCJleHRyYSI6IiJ9"

opt = {
  name: '3v3Tournament',
  password: 'qweasdzxc',
  map: 10,
  type: 6,
  size: 3,
  spectators: 'DROPINONLY',
  reportURL: 'https://example.com/game-reports',
  extra: 'This was an awesome tournmanet'
}

tournmentCode(opt)
// => "pvpnet://lol/customgame/joinorcreate/map10/pick6/team5/specDROPINONLY/eyJuY…YzVG91cm5hbWVudCIsImV4dHJhIjoiVGhpcyB3YXMgYW4gYXdlc29tZSB0b3Vybm1hbmV0In0="
```

## Usage

### node
```js
var tournamentCode = require('lol-tournament-code');

tournamentCode({name: 'TournamentGame'});
// => "pvpnet://lol/customgame/joinorcreate/map11/pick6/team5/specDROPINONLY/eyJuYW1lIjoiVG91cm5hbW5ldEdhbWUiLCJleHRyYSI6IiJ9"
```
#### browser

You can either import the .js files or import the .html file

__HTML Import__
```html
<link rel="import" href="bower_components/lol-tournament-code.html">
<script>
  LoL.tournamentCode({name: 'TournamentGame'});
  // => "pvpnet://lol/customgame/joinorcreate/map11/pick6/team5/specDROPINONLY/eyJuYW1lIjoiVG91cm5hbW5ldEdhbWUiLCJleHRyYSI6IiJ9"
</script>
```
__Script__ 
```html
<script src="bower_components/expandjs/dist/expandjs.min.js"></script>
<script src="bower_components/lol-tournament-code/dist/lol-tournament-code.min.js"></script>

<script>
  LoL.tournamentCode({name: 'TournamentGame'});
  // => "pvpnet://lol/customgame/joinorcreate/map11/pick6/team5/specDROPINONLY/eyJuYW1lIjoiVG91cm5hbW5ldEdhbWUiLCJleHRyYSI6IiJ9"
</script>
```
## Documentation
The generator works based on a configuration object with various options passed to it.

### opt.name
This is the name of the lobby that will be shows in the custom games list. This is only required option.

### opt.password
The password of the lobby, it's recommended to set one so random players don't access your lobby via the `Custom Game` iterface of the game client.

### opt.map
The map ID where the game will be played, it defaults to the new Summoner's Rift. Possible IDs are the following:
- __1__: `Summoner's Rift (Summer)`
- __2__: `Summoner's Rift (Autumn)`
- __3__: `Proving Grounds`
- __4__: `Twisted Treeline`
- __8__: `Crystal Scar`
- __10__: `Twisted Treeline (New)`
- __11__: `Summoner's Rift (New)`
- __12__: `Howling Abyss`

### opt.type
The game type to be palyed, it defaults to `Tournament Draft`. Possible IDs are the following:
- __1__: `Blind Pick`
- __2__: `Draft Mode`
- __4__: `All Random`
- __6__: `Tournament Draft`

### opt.size
The maximum number of players allowed for each team in the game to be played. Valid values are from `1` throgh `5`.

### opt.spectators
Option defining if if the game can be spectated or not. Possible values are:
- __'NONE'__: `Nobody can spectate the game`
- __'DROPINONLY'__: `Only members of the lobby can spectate the game`
- __'FRIENDS'__: `Only friends of the players can spectate the game`
- __'ALL'__: `Everybody can spectate the game`

### opt.report
An URL where to receive a game report after the game is over.

### opt.extra
Any message you may want to be appended to the game report that will be sent.
