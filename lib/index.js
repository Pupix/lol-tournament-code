/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    var load = require('xp-load'),
        XP = load(require('expandjs'), 'XP'),

        /**
         * The list of available map IDs
         *
         * 1: Summoner's Rift (Summer)
         * 2: Summoner's Rift (Autumn)
         * 3: Proving Grounds
         * 4: Twisted Treeline
         * 8: Crystal Scar
         * 10: Twisted Treeline (New)
         * 11: Summoner's Rift(New)
         * 12: Howling Abyss
         *
         * @type {number[]}
         * @private
         */
        maps = [1, 2, 3, 4, 8, 10, 11, 12],

        /**
         * The list of available game types
         *
         * 1: Blind Pick
         * 2: Draft Mode
         * 4: All Random
         * 6: Tournament Draft
         *
         * @type {number[]}
         * @private
         */
        types = [1, 2, 4, 6],

        /**
         * Number of possible players in each team
         *
         * @type {number[]}
         * @private
         */
        sizes = [1, 2, 3, 4, 5],

        /**
         * List of possible spectator restriction
         *
         * ALL: Everybody can spectate the game
         * NONE: Nobody can spectate the game
         * FRIENDS: Only friends of the players can spectate the game
         * DROPINONLY: Only people present in the lobby can spectate the game
         *
         * @type {string[]}
         * @private
         */
        spectators = ['ALL', 'NONE', 'NONE', 'FRIENDS', 'DROPINONLY'];

    /**
     * Creates a tournament code
     *
     * @method generate
     * @param {Object} opt
     *  @param {String} opt.name - The name of the lobby
     *  @param {String} [opt.password = ''] - The password of the lobby
     *  @param {Number} [opt.map = 11] - The ID of the map to be played
     *  @param {Number} [opt.type = 6] - The game type of the game to be played
     *  @param {Number} [opt.size = 5] - The size of the teams
     *  @param {String} [opt.spectators = 'DROPINONLY] - Which persons can spectate the game
     *  @param {String} [opt.report] - URL where to receive a report info after the game is over
     *  @param {String} [opt.extra = ''] - Any extra details to be sent to the reportURL
     * @returns string
     * @throws
     */

    function generate(opt) {
        var code,
            encoded;

        //Checking
        XP.assertArgument(XP.isObject(opt), 1, 'Object');
        XP.assert(opt.name, function () { throw new XP.RequiredError('name'); });

        //Assigning
        opt.map      = XP.includes(maps, XP.toNumber(opt.map)) ? opt.map : 11;
        opt.type     = XP.includes(types, XP.toNumber(opt.type)) ? opt.type : 6;
        opt.size   = XP.includes(sizes, XP.toNumber(opt.size)) ? opt.size : 5;
        opt.spectators = XP.includes(spectators, opt.spectators) ? opt.spectators : 'DROPINONLY';
        opt.extra      = opt.extra || '';

        //Encoding
        encoded =  JSON.stringify({
            name: opt.name,
            extra: opt.extra,
            password: opt.password,
            report: opt.report
        });
        encoded = new Buffer(encoded).toString('base64');

        //Creating
        code = 'pvpnet://lol/customgame/joinorcreate/map' + opt.map +
                '/pick' + opt.type +
                '/team' + opt.size +
                '/spec' + opt.spectators +
                '/' + encoded;

        return code;
    }

    if (XP.isBrowser()) {
        global.LoL = global.LoL || {};
        global.LoL.tournamentCode = generate;
    } else {
        module.exports = generate;
    }

}());