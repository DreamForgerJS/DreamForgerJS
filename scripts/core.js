import * as alg from './alg.js'
import * as iris from './iris.js'
import $ from './query.js'
import body from './body.js'
import DreamForger from './dreamforger.js'

let com;
function commandHandler(){}
DreamForger.handleCommands = function(){
  com = DreamForger.setCommander()
  commandHandler()
  iris.parseColors()
}
export { DreamForger, body, alg, iris, com };
