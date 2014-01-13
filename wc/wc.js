//program for wc command using javascript//
var fs = require('fs');
// function for counting character in a file //
var char_count = function(filename)
{
	var filedata=fs.readFileSync(filename,'utf-8');
	var file_length=filedata.length;
	return file_length;
}
//function for counting lines in a file //
var line_count = function(filename)
{
	var line=0;
	var filedata=fs.readFileSync(filename,'utf-8');
	var file_length=filedata.length;
	var count=0;
	for(count=0;count<file_length;count++)
	{
		if(filedata[count]=='\n')
			line++;
	}
	return line;
}
//function for counting words in a file //
var word_count = function(filename)
{
	var word=1;
	var count=0;
	var filedata=fs.readFileSync(filename,'utf-8');
	var file_length=filedata.length;
	for(count=0;count<file_length;count++)
	{
		if((filedata[count]==' ')||(filedata[count]=='\n'))
			word++;
	}
	return word;
}
//command line arguement from the user //
var temp = process.argv[2];
var command = process.argv[3];
if(command==null){
console.log (line_count(temp)+"\t"+word_count(temp)+"\t"+char_count(temp)+" "+ temp);}
else if(command=="--l"||"--lines"){
	console.log (line_count(temp)+" "+temp);}
else if(command=="--c"||"--bytes"||"--chars"){
	console.log (char_count(temp)+" "+temp);}
else if(command=="--w"||"--words"){
	console.log (word_count(temp)+" "+temp);}
