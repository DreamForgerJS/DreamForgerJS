import $ from './query.js'
const body = {
    title: "DreamForger Execution Environment",
    past: ">",
    responded: false,
    fResp: function(){
      this.responded = false;
    },
    setPast: function(v){
      this.past = v;
    },
    log: function(text) {
        $("#body-log").innerHTML += text + "<br>";
        this.responded = true;
    },
    write: function(text) {
        $("#body-log").innerHTML += text;
        this.responded = true;
    },
    logln: function(text) {
        $("#body-log").innerHTML += text + "<br><br>";
        this.responded = true;
    },
    clear: function() {
        $("#body-log").innerHTML = "";
        this.responded = true;
    },
    styles: {
        textColor: "rgb(200,200,200)",
        backgroundColor: "rgb(20,20,20)",
        secondaryColor: "rgb(255,255,255)",
        textFont: "Monaco",
    }
};
export default body;