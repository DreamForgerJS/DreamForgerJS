import { alg, body, words } from './core.js'

let rooms = [],
    globalMap = [],
    roomStats = {},
    position = { x: 1, y: 1 },
    options = {},
    exits = [];




function createRooms(rs) {
    roomStats = rs;
}

function setPosition(x, y) {
    position.x = x;
    position.y = y;
}

function Room(stats) {
    this.x = stats.x;
    this.y = stats.y;
    this.type = stats.type;
    this.description = roomStats[this.type];
    this.items = [];
}

function createWorld(bitmap) {
    globalMap = bitmap;
    for (var y = 0; y < globalMap.length; y++) {
        for (var x = 0; x < globalMap[y].length; x++) {
            if (globalMap[y][x] !== " ") {
                rooms.push(new Room({
                    x: x,
                    y: y,
                    type: globalMap[y][x]
                }))
            }
        }
    }
}

function placeItem(x, y, item) {
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].x === x && rooms[i].y === y) {
            rooms[i].items.push(item);
        }
    }
}

function getCurrentRoom() {
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].x === position.x && rooms[i].y === position.y) {
            return rooms[i];
        }
    }
}

function locationStats() {
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].x === position.x && rooms[i].y === position.y) {
            if (options.showExits) {
                if (rooms[i].items.length > 0) {
                    body.log(rooms[i].description + "<br>You can see " + alg.gramarr(rooms[i].items))
                } else {
                    body.log(rooms[i].description)
                }
            } else {
                if (rooms[i].items.length > 0) {
                    body.logln(rooms[i].description + "<br>You can see " + alg.gramarr(rooms[i].items))
                } else {
                    body.logln(rooms[i].description)
                }
            }
        }
    }

    if (options.showExits) {
        exits = [];
        if (position.y !== 0 && globalMap[position.y - 1][position.x] !== " ") {
            exits.push(options.north || 'North')
        }
        if (position.x !== globalMap[position.y].length && globalMap[position.y][position.x + 1] !== " ") {
            exits.push(options.east || 'East')
        }
        if (position.y !== globalMap.length && globalMap[position.y + 1][position.x] !== " ") {
            exits.push(options.south || 'South')
        }
        if (position.x !== 0 && globalMap[position.y][position.x - 1] !== " ") {
            exits.push(options.west || 'West')
        }
        body.logln(("Obvious Exits: " || options.exitMessage) + exits.join(', '))
    }
}

function setOptions(o) {
    var k = Object.keys(o);
    var v = Object.values(o);
    for (var i = 0; i < k.length; i++) {
        options[k[i]] = v[i];
    }
}

function run(com) {
    if ((alg.matchArr(words.go, com.first) && alg.matchArr(words.north, com.last)) || alg.matchArr(words.north, com.all)) {
        if (globalMap[position.y - 1][position.x] !== " ") {
            body.log(options.goNorth || "You go north")
            position.y--;
            locationStats();
        } else {
            body.logln(options.cantGoNorth || "You can't go north.")
        }
    } else if ((alg.matchArr(words.go, com.first) && alg.matchArr(words.south, com.last)) || alg.matchArr(words.south, com.all)) {
        if (globalMap[position.y + 1][position.x] !== " ") {
            body.log(options.goSouth || "You go south")
            position.y++;
            locationStats();
        } else {
            body.logln(options.cantGoSouth || "You can't go south.")
        }
    } else if ((alg.matchArr(words.go, com.first) && alg.matchArr(words.east, com.last)) || alg.matchArr(words.east, com.all)) {
        if (globalMap[position.y][position.x + 1] !== " ") {
            body.log(options.goEast || "You go east" || options.goEast)
            position.x++;
            locationStats();
        } else {
            body.logln(options.cantGoEast || "You can't go east.")
        }
    } else if ((alg.matchArr(words.go, com.first) && alg.matchArr(words.west, com.last)) || alg.matchArr(words.west, com.all)) {
        if (globalMap[position.y][position.x - 1] !== " ") {
            body.log(options.goWest || "You go west")
            position.x--;
            locationStats();
        } else {
            body.logln(options.cantGoWest || "You can't go west.")
        }
    }
    if (alg.matchArr(words.look, com.all)) {
        locationStats();
    }
}

export { createRooms, createWorld, setOptions, run, locationStats, setPosition, rooms, position, placeItem, getCurrentRoom };
