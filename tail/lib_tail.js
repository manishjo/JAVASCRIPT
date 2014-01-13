var fs = require('fs')
//this function will cheak for file exitstance ...
var file_exits=function(filename,user_command)
{
	if(!fs.existsSync(filename))
	{
		console.log ("This file does't exists");
		return;
	}
}

//this function shows n characters on user input
var show_char=function(filename,command)
{
	var splited=command.split('');
	var sliced=splited.slice(2,4);
	var joined=sliced[0]+""+sliced[1];
	filedata=fs.readFileSync(filename,'utf-8');
	var splited = filedata.split('');
	b=parseInt(splited.length);
	a=parseInt(splited.length)-parseInt(joined);
	var sliced = splited.slice(a,b);
	var joined = sliced.join('');
	console.log(joined);
}
var show_lines=function (filename,command)
{
	var splited=command.split('');
	var sliced=splited.slice(2,4); 
	var joined=sliced[0]+""+sliced[1];
	var filedata=fs.readFileSync(filename,'utf-8');
	var splited = filedata.split('\n');
	counter=parseInt(splited.length)-parseInt(joined);
	a=(parseInt(splited.length));
	while(counter<a)
		{
			console.log(splited[counter]);	
			counter++;
		}
}
//this function shows file headder with last 10 lines...
var with_header=function(filename,command)
{
	var filedata=fs.readFileSync(filename,'utf-8');
	var splited = filedata.split('\n');
	counter=parseInt(splited.length)-10;
	a=(parseInt(splited.length));
	console.log("==>"+filename+"<==")
	while(counter<a)
	{
		console.log(splited[counter]);	
		counter++;
	}
}
//this function shows last 10 lines without header....
var without_header=function(filename,command)
{
	var filedata=fs.readFileSync(filename,'utf-8');
	var splited = filedata.split('\n');
	counter=parseInt(splited.length)-10;
	a=(parseInt(splited.length));
	while(counter<a)
	{
		console.log(splited[counter]);	
		counter++;
	}
}
var help=function()
{
	var help_data=fs.readFileSync('help_tail.txt','utf-8');
	console.log (help_data);
}
//this function will print about the version of the head...
var version=function()
{
	var help_data=fs.readFileSync('version.txt','utf-8');
	console.log (help_data);
}

exports.version=version;
exports.help=help;
exports.show_char=show_char;
exports.show_lines=show_lines; 
exports.with_header=with_header;
exports.without_header=without_header;
