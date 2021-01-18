import { alg, bp } from './core.js'
let equipment = [];
let wearLimit = {};
let combatStats = {
    armor: 0,
    damage: 0,

    block: 0,
    dodge: 0,
    crit: 0
};

function setArmor(armor) {
    var k = Object.keys(armor);
    var v = Object.values(armor);
    for (var i = 0; i < k.length; i++) {
        wearLimit[k[i]] = v[i];
    }
}

function updateStats() {
    combatStats = {
        armor: 0,
        damage: 0,

        block: 0,
        dodge: 0,
        crit: 0
    };
    for (var i = 0; i < equipment.length; i++) {
        if (bp.Items[equipment[i]].armor) {
            combatStats.armor += bp.Items[equipment[i]].armor;
        }
        if (bp.Items[equipment[i]].damage) {
            combatStats.damage += bp.Items[equipment[i]].damage;
        }
        if (bp.Items[equipment[i]].block) {
            combatStats.block += bp.Items[equipment[i]].block;
        }
        if (bp.Items[equipment[i]].dodge) {
            combatStats.dodge += bp.Items[equipment[i]].dodge;
        }
        if (bp.Items[equipment[i]].crit) {
            combatStats.crit += bp.Items[equipment[i]].crit;
        }
    }
}

function add(eq) {
    equipment.push(eq);
    wearLimit[bp.Items[eq].slot]--;
    updateStats();
}

function remove(eq) {
    alg.rem(equipment, eq);
    wearLimit[bp.Items[eq].slot]++;
    updateStats();
}

export { equipment, wearLimit, setArmor, add, remove, combatStats };
