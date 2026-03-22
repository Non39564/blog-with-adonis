import edge from "edge.js";

edge.global('nl2br',function(text:String){
    return text.replace('\n','<br>')
})