import * as alg from './alg.js'
import * as iris from './iris.js'
import $ from './query.js'
import body from './body.js'
import DreamForger from './dreamforger.js'
import * as nav from './navigator.js'
import * as bp from './backpack.js'
import * as anvil from './anvil.js'
const words = {
    //moving
    "go": ["go", "walk", "move", "journey", "progress"],
    "north": ["n", "north", "forwards", "f"],
    "south": ["s", "south", "backwards", "b"],
    "east": ["e", "east", "right", "r"],
    "west": ["w", "west", "left", "l"],
    //looting
    "take": ["take", "grab", "steal", "loot"],
    "drop": ["drop", "throw", "toss", "abandon"],
    "give": ["give", "donate", "offer"],
    //combat/Equipment
    "attack": ["assault", "beat", "pound", "strike", "ambush", "smash", "kill", "crush", "destroy", "fight"],
    "flee": ["flee", "run", "escape"],
    "wear": ["wear", "equip", "put on"],
    "remove": ["remove", "take off", "unequip"],
    //communications
    "talk": ["talk", "speak", "curse", "ask"],
    "say": ["say", "shout", "scream", "whisper"],
    //currency
    "buy": ["buy", "purchase"],
    "sell": ["sell", "trade"],
    //stats (for viewing inventory, equipment, etc)
    "inventory": ["inventory", "inv", "i"],
    "equipment": ["equipment", "eq", "armor", "clothes"],
    "stats": ["stats", "statistics"],
    //interacting with objects
    "open": ["open"],
    "look": ["look", "examine", "see", "read", "inspect"],
    "use": ["use", "make use of", "interact", "interact with"],
    "eat": ["eat", "chew", "gulp", "ingest"],
    "drink": ["drink", "swallow"],
    //misc commands
    //for dropping all things in your inventory, taking all things in a location/room, etc.
    "all": ["all", "everything"],
    "make": ["make", "craft", "create"],
    "quests": ["quests", "jobs", "work", "tasks"],
}
export { DreamForger, body, alg, iris, words, nav, bp, anvil };
