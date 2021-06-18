
// These are the pure functions of the game
//    Most of the functions are not pure because they use variables
//    and other functions from game.js

const snk = Object.create(null);

snk.alter = function (player_name) {
    var newname = player_name.concat("sss");
    return newname;
};

export default Object.freeze(snk);


