
const Handler = Object.create(null);


Handler.submit_highscore = function (request_object) {
    var scoreboard = [];
    scoreboard.push({
        "player": request_object.player,
        "score": request_object.score
    });
    return Promise.resolve(scoreboard);
};



Handler.empty_history = function () {
    var scoreboard = [];
    return Promise.resolve(scoreboard);
};



export default Object.freeze(Handler);
