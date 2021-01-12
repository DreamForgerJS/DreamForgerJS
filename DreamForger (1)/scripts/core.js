import * as alg from './alg.js'
import * as iris from './iris.js'
import $ from './query.js'
import body from './body.js'
import DreamForger from './dreamforger.js'

let com;
DreamForger.handleCommands = function(){
  com = DreamForger.setCommander()
  if(com.all === "hello"){
    body.log("Hello!")
  }
}
export { DreamForger, body, alg, iris, com };