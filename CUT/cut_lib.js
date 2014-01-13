var cut=function(content,delimiter,fields){
	var content_lines=content.split('\n');
	var SplitByDelimiter=[];
	var showExpectedLines=[];
	for (var counter=0; counter<content_lines.length;counter++){
		SplitByDelimiter=content_lines[counter].split(delimiter);
		var ShowExpectedFields=[];
		for(var count=0; count<fields.length; count++){
			ShowExpectedFields.push(SplitByDelimiter[fields[count]-1]);
		}
		showExpectedLines.push(ShowExpectedFields.join(delimiter));
	}
	return showExpectedLines.join('\n');
}
var readCommandLine=function(){
	var commandline=process.argv;
	var start_position=2;
	return (commandline.slice(start_position,commandline.length))	
}
var take_delimiter=function(commandLine){
	var delimeter='	';
	var text;
	for(var counter=0;counter<commandLine.length;counter++){
		var text=commandLine[counter];
		var StartingPosition=2;
		if(text[1]=='d'){
			delimeter=text.substring(StartingPosition,text.length);
		}
	}
	return delimeter;
};
var take_Fields = function(commandLine){
	var fields=[];
	for(var counter=0;counter<commandLine.length;counter++){
		var text=commandLine[counter];
		var StartingPosition=2;
		if(text[1]=='f'){
			fields=text.substring(StartingPosition,text.length);
		}
	}
	fields=fields.split(',');
	fields.sort();
	return fields;
};
exports.cut=cut;
exports.take_Fields=take_Fields;
exports.take_delimiter=take_delimiter;
exports.readCommandLine=readCommandLine;