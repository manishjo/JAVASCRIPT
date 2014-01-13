var fs = require('fs');
//program for reducing spaces using javascript//
var reduce_Space = function (source,destination)
{
	if(!fs.existsSync(source))
	{
		console.log("\nThe Source file doesn't exists");
		return;
	}
	else		
	{
	var filedata=fs.readFileSync(source,'utf-8');
	var splited = filedata.split(" ");
	function filtered(element)
	{
		return element!='';
	} 
	var filter_space=splited.filter(filtered);
	var joined = filter_space.join(' ');
	fs.writeFileSync(destination,joined)
	}
}
var source = process.argv[2];
var destination = process.argv[3];
if(source==null || destination==null)
{
	console.log("sorry worng input");
	return;
}
reduce_Space(source,destination);
