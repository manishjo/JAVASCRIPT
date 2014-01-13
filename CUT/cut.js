var fs =require('fs');
var lib=require('./cut_lib');
var main=function(content){
	var commandLine=lib.readCommandLine();
	var delimiter=lib.take_delimiter(commandLine);
	var fields=lib.take_Fields(commandLine);	
	console.log(lib.cut(content,delimiter,fields));
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(content){	
	main(content);
});
process.stdin.on('end', function(){});