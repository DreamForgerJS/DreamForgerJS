import $ from './query.js'
import body from './body.js'

const DreamForger = {
    options: {
        showLastCommand: false,
        selectCommandOnSubmit: false,
        clearBodyOverflow: false,
        maxLines: 200,
        fontSize: 15,
    },
    setup: function() {
        document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${body.title} </title>
        <style>
        * {
            font-family: "Monaco", monospace;
            color: ${body.styles.textColor};
        }
        
        body {
            width: 100%;
            height: 100%;
            background: ${body.styles.backgroundColor};
            font-family: ${body.styles.textFont}, monospace;
            font-size: ${this.options.fontSize}px;
            font-weight: 20px;
        }
        
        #command-box {
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
        }
        
        #command-wrapper {
            width: 100%;
            height: 50px;
            resize: none;
            background: ${body.styles.backgroundColor};
            border: none;
            box-shadow: -2px -2px ${body.styles.secondaryColor};
            font-family: ${body.styles.textFont}, monospace;
        }
        #command {
            width: 90%;
            height: 25px;
            resize: none;
            background: ${body.styles.backgroundColor};
            border: none;
            font-family: ${body.styles.textFont}, monospace;
            outline: none;
            font-size: ${this.options.fontSize + 2}px;
        }
        #body-log {
            font-family: ${body.styles.textFont}, monospace;
            position: fixed;
            bottom: 50px;
            left: 0px;
            margin-left: 20px;
            margin-right: 20px;
            padding-bottom: 10px;
            height: auto;
            border: none;
            font-size: ${this.options.fontSize}px;
        }
        </style>
        `;
        document.body.innerHTML = `
        <div id="main">
        <div id="body-log"></div>
        <div id="command-box">
            <div id="command-wrapper"><input id="command" type="text" value=">" autocomplete="off" maxlength="50"></div>
        </div>
        </div>
        `;
        $("#command").addEventListener("keyup", function(e) {
            if (!$("#command").value.includes(">") || $("#command").value[0] !== ">") {
                var s = $("#command").value.replaceAll(">", "");
                $("#command").value = ">" + s;
            }
            if (e.keyCode === 38) {
                $("#command").value = body.past;
            }
            if (e.keyCode === 13 && $("#command").value !== ">") {
                if (!DreamForger.options.selectCommandOnSubmit) {
                    DreamForger.handleCommandsAll()
                    body.setPast($("#command").value);
                    $("#command").value = ">";
                }
                if (DreamForger.options.selectCommandOnSubmit) {
                    DreamForger.handleCommandsAll()
                    body.setPast($("#command").value);
                    $("#command").select();
                }
                if (DreamForger.options.clearBodyOverflow) {
                    if (DreamForger.options.maxLines !== "auto") {
                        var lines = $("#body-log").innerHTML.split('<br>');
                        if (lines.length > DreamForger.options.maxLines) {
                            var nl = lines.splice(lines.length - DreamForger.options.maxLines - 1, lines.length).join("<br>")
                            $("#body-log").innerHTML = nl;
                        }
                    } else {
                        DreamForger.options.maxLines = Math.floor((window.innerHeight) / DreamForger.options.fontSize);
                        var lns = $("#body-log").innerHTML.split('<br>');
                        if (lns.length > DreamForger.options.maxLines) {
                            var Nl = lns.splice(lines.length - DreamForger.options.maxLines - 1, lines.length).join("<br>")
                            $("#body-log").innerHTML = Nl;
                        }
                    }
                }
            }
        })
    },
    setOptions: function(options) {
        var o = options;
        if (o.textColor) { body.styles.textColor = o.textColor; }
        if (o.backgroundColor) { body.styles.backgroundColor = o.backgroundColor; }
        if (o.strokeColor) { body.styles.strokeColor = o.strokeColor; }
        if (o.textFont) { body.styles.textFont = o.textFont; }
        if (o.selectCommandOnSubmit) { this.options.selectCommandOnSubmit = o.selectCommandOnSubmit; }
        if (o.clearBodyOverflow) { this.options.clearBodyOverflow = o.clearBodyOverflow; }
        if (o.maxLines) { this.options.maxLines = o.maxLines; }
        if (o.fontSize) { this.options.fontSize = o.fontSize; }
        if (o.showLastCommand) { this.options.showLastCommand = o.showLastCommand; }
        if (o.title) { body.title = o.title; }
        this.setup()
    },
    setCommander: function() {
        let commandVal = $("#command").value.split('').splice(1, $("#command").value.length).join('').toLowerCase()
        let commandValSplit = commandVal.split(' ');
        let firstWord = commandValSplit[0];
        let lastWord = commandValSplit[commandValSplit.length - 1];
        let mid = commandValSplit.splice(1, commandValSplit.length - 2).join(' ');

        return ({
            all: commandVal,
            splt: commandValSplit,
            first: firstWord,
            last: lastWord,
            mid: mid,
            leftSide: firstWord + " " + mid,
            rightSide: mid + " " + lastWord
        });

    },
    handleCommands: function() {},
    handleCommandsAll: function() {
        body.fResp()
        if (this.options.showLastCommand) {
            $("#body-log").innerHTML += ("<br>" + $("#command").value + "<br><br>")
        }
        try {
            this.handleCommands();
        } catch (err) {
            body.log(err)
        }
        if (!body.responded) {
            let messages = [
                "Huh?",
                "What?",
                "You can't do that.",
                "That command doesn't do anything.",
                "What are you trying to accomplish?",
                "Failed to understand you.",
                "That's not a command I recognize."
            ];
            body.log(messages[Math.floor(Math.random() * messages.length)])
        }
    },
};
export default DreamForger;