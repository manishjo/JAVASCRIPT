//calling library.....
var call_library=require('./lib_tail.js')
var fs = require('fs')
//main function.....
var main=function()
{
	var user_command = process.argv[2];
	var filename = process.argv[3];
	if(user_command=='abc.txt'&& !filename) 
		{
			call_library.without_header(user_command);
		}
	if(user_command=='--h'||user_command=='--help')
		{
			call_library.help();
			return;
		}
	if(user_command=='--version')
		{
			call_library.version();
			return;
}
if(filename==null)
{
	console.log("wrong input");
	return;
}
if(user_command[1]=='c')
{
	call_library.show_char(filename,user_command);
}
if(user_command[1]=='n')
{
	call_library.show_lines(filename,user_command);
}
if(user_command=='-v')
{
	call_library.with_header(filename,user_command);
}
if(user_command=='-q')
{
	call_library.without_header(filename,user_command);
}
}
main();