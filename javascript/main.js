var GAME_MAP_WIDTH = 25,
    GAME_MAP_HEIGHT = 25,
    PLAYER_START_POSITION = {x: 5, y: 5},
    KEY_COMMANDS = {
        'c': 'chopTree',
        'g': 'getItem',
        'f': 'lightFlame',
        'w': 'placeWall',
        'd': 'placeDoor'
    },
    ammonitePos = {x: 8, y: 8}
    ;

function populateMap(map) {
    var river = {
        start: {x: 8, y: -1},
        path: 'r r r u r r u u u r u r r r u'.split(' ')
    };
    var trees = [
        {x: 1, y: 1},
        {x: 12, y: 13},
        {x: 12, y: 14},
        {x: 11, y: 13},
        {x: 8, y: 4},
        {x: 8, y: 5},
        {x: 9, y: 7},
        {x: 10, y: 6},
        {x: 11, y: 6},
        {x: 10, y: 7},
        {x: 11, y: 7},
        {x: 11, y: 5},
        {x: 12, y: 8},
        {x: 13, y: 5}
    ];
    var apples = [ {x: 6, y: 6} ];

    map.drawRiver(river.start, river.path);

    trees.forEach(function(position) {
        map.get(position).addItem(Tree.create());
    });

    apples.forEach(function(position) {
        map.get(position).addItem(Apple.create());
    });
}

function populateDialogue(htmlView) {
    setTimeout(function() {
        htmlView.addDialogue('player', 'where am I..');
    }, 1500);

    setTimeout(function() {
        htmlView.addDialogue('player', 'hello?');
    }, 5000);

    setTimeout(function() {
        htmlView.addDialogue('player', 'this place fuckin sucks');
    }, 15000);

    setTimeout(function() {
        htmlView.addDialogue('ammonite', 'wonk');
    }, 7500);
}

function attachKeyboardInput(keyboardInput, game) {
    for (key in KEY_COMMANDS) {
        var player = game.player;
        var callback = player[KEY_COMMANDS[key]].bind(player);
        keyboardInput.bindKey(key, callback);
    }

    ['left', 'right', 'up', 'down'].forEach(function(dir) {
        keyboardInput.bindKey(dir, function() {
            game.tryCreatureMove(game.player, dir);
        });
    });
}

function main() {
    var htmlView = HtmlView.create();
    var game = Game.create(htmlView);
    var keyboardInput = KeyboardInput.create();

    attachKeyboardInput(keyboardInput, game);

    game.start();
    keyboardInput.startListening();

    htmlView.populateKeybar(KEY_COMMANDS);
    populateMap(game.map);
    populateDialogue(htmlView);
}
