import { alg, body, words, nav, anvil } from './core.js'
import { getCurrentRoom } from './navigator.js';

let inventory = [],
    Items = {},
    options = {};

function createItem(name, stats) {
    Items[name] = stats;
    if (
        stats.type !== "food" &&
        stats.type !== "drink" &&
        stats.type !== "equipment" &&
        stats.type !== "element" &&
        stats.type !== "misc"
    ) {
        body.log("ItemDict NameError: the 'createItem()' function can only handle item types of ['food','drink','equipment','useless','element']")
    }
}

function setOptions(o) {
    var k = Object.keys(o);
    var v = Object.values(o);
    for (var i = 0; i < k.length; i++) {
        options[k[i]] = v[i];
    }
}

function add(item) {
    if (typeof item === 'string') {
        inventory.push(item);
    }
    if (typeof item === 'object') {
        for (var i = 0; i < item.length; i++) {
            inventory.push(item[i])
        }
    }
}

function remove(item) {
    alg.rem(inventory, item);
}

function removeAll() {
    inventory = [];
}

function run(com) {
    //show the player's inventory
    if (alg.matchArr(words.inventory, com.all)) {
        if (inventory.length > 0) {
            body.logln(`You are carrying (${inventory.length}/${options.capacity||20}):<br>- ${inventory.join('<br>- ')}`)
        } else {
            body.logln("You aren't carrying anything.");
        }
    }

    //interacting
    if (alg.matchArr(words.look, com.first)) {
        if (com.splt.length > 1) {
            let item = alg.searchArr(inventory, com.last);
            if (item) {
                if (Items[item].description) {
                    body.logln(Items[item].description)
                } else {
                    body.logln(`Error: Item "${item}" does not have the "description" attribute set.`)
                }
            } else {
                body.logln("You don't have that.")
            }
        }
    }

    if (alg.matchArr(words.eat, com.first)) {
        let item = alg.searchArr(inventory, com.last);
        if (item) {
            if (Items[item].type === "food") {
                alg.rem(inventory, item)
                if (Items[item].use) {
                    if (typeof Items[item].use === "string") {
                        body.logln(Items[item].use);
                    }
                    if (typeof Items[item].use === "function") {
                        Items[item].use()
                    }
                } else {
                    body.logln("You eat the " + item);
                }
            } else {
                body.logln("That's not edible.")
            }
        } else {
            body.logln("You don't have that.")
        }
    }

    if (alg.matchArr(words.drink, com.first)) {
        let item = alg.searchArr(inventory, com.last);
        if (item) {
            if (Items[item].type === "drink") {
                alg.rem(inventory, item)
                if (Items[item].use) {
                    if (typeof Items[item].use === "string") {
                        body.logln(Items[item].use);
                    }
                    if (typeof Items[item].use === "function") {
                        Items[item].use()
                    }
                } else {
                    body.logln("You drink the " + item);
                }
            } else {
                body.logln("That's not drinkable.")
            }
        } else {
            body.logln("You don't have that.")
        }
    }

    if (alg.matchArr(words.use, com.first)) {
        let item = alg.searchArr(inventory, com.last);
        if (item) {

            if (Items[item].type !== "equipment") {
                alg.rem(inventory, item)
                if (Items[item].use) {
                    if (typeof Items[item].use === "string") {
                        body.logln(Items[item].use);
                    }
                    if (typeof Items[item].use === "function") {
                        Items[item].use()
                    }
                } else {
                    body.logln("You use the " + item + " (" + Items[item].type + ")");
                }
            } else {
                body.log("You can't 'use' equipment.  Try equipping it.")
            }
        } else {
            body.logln("You don't have that.")
        }
    }

    if (alg.matchArr(words.wear, com.first)) {
        let item = alg.searchArr(inventory, com.last);
        if (item) {
            if (Items[item].type === "equipment") {
                if (anvil.wearLimit[Items[item].slot] > 0) {
                    anvil.add(item)
                    alg.rem(inventory, item)
                    body.logln("Equipped.")
                } else {
                    let remItem = "";
                    for (var d = 0; d < anvil.equipment.length; d++) {
                        if (Items[anvil.equipment[d]].slot === Items[item].slot) {
                            remItem = anvil.equipment[d];
                        }
                    }
                    let rs = alg.gramarr([Items[remItem].slot]);
                    let reg = /s/;
                    if (reg.test(rs.split('')[rs.length - 1])) {
                        body.logln("You will have to remove some " + Items[remItem].slot + " before you equip that.")
                    } else {
                        body.logln("You will have to remove " + alg.gramarr([Items[remItem].slot]) + " before you equip that.")
                    }

                }
            } else {
                body.logln("You can't equip that.")
            }
        } else {
            body.logln("You don't have that.")
        }
    }

    if (alg.matchArr(words.remove, com.first)) {
        let item = alg.searchArr(anvil.equipment, com.last);
        if (item) {
            anvil.remove(item)
            add(item)
            body.logln("Removed.")
        } else {
            body.logln("That's not a piece of your equipment")
        }
    }

    //taking, dropping
    if (alg.matchArr(words.drop, com.first)) {
        if (com.last !== "all") {
            let item = alg.searchArr(inventory, com.last);
            if (item) {
                alg.rem(inventory, item);
                for (var i = 0; i < nav.rooms.length; i++) {
                    if (nav.position.x === nav.rooms[i].x && nav.position.y === nav.rooms[i].y) {
                        nav.rooms[i].items.push(item)
                    }
                }
                body.logln("Dropped.")
            } else {
                body.logln("You don't have that.")
            }
        } else {
            for (var J = 0; J < inventory.length; J++) {
                for (var n = 0; n < nav.rooms.length; n++) {
                    if (nav.position.x === nav.rooms[n].x && nav.position.y === nav.rooms[n].y) {

                        nav.rooms[n].items.push(inventory[J])
                    }
                }
            }
            removeAll()
            body.log("All Items Dropped");
        }
    }

    if (alg.matchArr(words.take, com.first)) {
        for (var r = 0; r < nav.rooms.length; r++) {
            if (nav.position.x === nav.rooms[r].x && nav.position.y === nav.rooms[r].y) {
                let item = alg.searchArr(nav.rooms[r].items, com.last);
                if (item) {
                    alg.rem(nav.rooms[r].items, item)
                    add(item);
                    body.log("Taken.");
                } else {
                    body.log("That isn't here.")
                }
            }
        }
    }

    if (alg.matchArr(words.equipment, com.all)) {
        if (anvil.equipment.length > 0) {
            body.log("You are wearing: ");
            body.log("- " + anvil.equipment.join('<br>- '))
        } else {
            body.log("You aren't wearing anything.  Quick, hide before someone sees you!")
        }
    }

}


export { inventory, createItem, run, setOptions, add, remove, removeAll, Items };
