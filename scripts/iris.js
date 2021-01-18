function __cs(val, col) {
    return "<span style='color:" + col + "'>" + val + "</span>"
}

function parseWord(word, color) {
    var w = document.querySelector("#body-log").innerHTML.replaceAll(word, `<span style="color:${color}">${word}</span>`);
    document.querySelector("#body-log").innerHTML = w;
}

function parseMultWord(word, colors) {
    var W = word.split('');
    var cw = ``;
    for (var i = 0; i < W.length; i++) {
        cw += `<span style="color:${colors[i]}">${W[i]}</span>`;
    }
    var w = document.querySelector("#body-log").innerHTML.replaceAll(word, cw);
    document.querySelector("#body-log").innerHTML = w;
}

function parseWordChain(words) {
    var wks = Object.keys(words);
    var wvs = Object.values(words);
    for (var i = 0; i < wks.length; i++) {
        this.parseWord(wks[i], wvs[i]);
    }
}

function parseMultChain(words) {
    var wks = Object.keys(words);
    var wvs = Object.values(words);
    for (var i = 0; i < wks.length; i++) {
        this.parseMultWord(wks[i], wvs[i]);
    }
}
export { __cs, parseWord, parseMultWord, parseWordChain, parseMultChain };
