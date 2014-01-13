var fs = require('fs')
var take_user_input=function(){
		var result={};
	var index_user_command=2;
	for(index_user_command=2;index_user_command<process.argv.length;index_user_command++){
		if(process.argv[index_user_command].charAt(0)!='-')
		{
			result.fileName=process.argv[index_user_command];
		}
		else
		result.option=process.argv[index_user_command];
		}	
	return result;

};
var is_file_exits=function(filename)
{
	return fs.existsSync(filename);
};
var store_filedata=function(filename)
{
	return fs.readFileSync(filename,'utf-8');
};
var show_lines=function (filedata,option)
{
	var number_in_option=option.substring(2,option.length);
	var totel_lines = filedata.split('\n');
	if(number_in_option>totel_lines.length){
		number_in_option=totel_lines.length;
	}
	var lines=totel_lines.slice(0,number_in_option);
	return lines.join('\n');
	
};
var show_char=function(filedata,option)
{
	var number_in_option=option.substring(2 ,option.length);
	var totel_character = filedata.split('');
	if(number_in_option>totel_character.length){
		number_in_option=totel_character.length;
	}
	var lines = totel_character.slice(0,number_in_option);
	return lines.join('');
};
var verbose=function(filename,filedata,option)
{
	var splited = filedata.split('\n');
	console.log("==>"+filename+"<==");
	return show_lines(filedata,'-n10');
};
var quiet=function(filedata,option)
{
	return show_lines(filedata,'-n10');
};
var help=function(text_file)
{
	return fs.readFileSync(text_file,'utf-8');
};
var version=function()
{
	return fs.readFileSync('version.txt','utf-8');
};
//....................functions for tail....................
var show_last_lines=function (filename,command)
{
	var number_in_option=option.substring(2,option.length);
	var totel_lines = filedata.split('\n');
	counter=parseInt(totel_lines.length)-parseInt(number_in_option);
	a=(parseInt(totel_lines.length));
	while(counter<a)
		{
			console.log(splited[counter]);	
			counter++;
		}
}



exports.take_user_input=take_user_input;
exports.version=version;
exports.help=help;
exports.store_filedata=store_filedata;
exports.quiet=quiet;
exports.verbose=verbose;
exports.show_char=show_char;
exports.show_lines=show_lines;
exports.is_file_exits=is_file_exits;