var fs = require('fs');
var main=function(){
	var call_library=require('./library.js');
	var take_user_input=call_library.take_user_input();
	var option=take_user_input.option;
	var filename=take_user_input.fileName;
	if(option=='--h'||option=='--help'){
		console.log(call_library.help('help_head.txt'));
		return;
		};
	if(option=='--version'){
		version=call_library.version();
		console.log(version);
		return;
		};
	if(filename==null){
		console.log("no filename is given");
		return;
	}
	if(!call_library.is_file_exits(filename)){
		console.log('file does not Exists');
		return;
	}
	var filedata= call_library.store_filedata(filename);
	if(option==null){
		console.log(call_library.show_lines(filedata,'-n10'));
		return;
	}
	if(option.charAt(1)=='c'){
		console.log(call_library.show_char(filedata,option));
		return;
	}
	if(option.charAt(1)=='n'){
		console.log(call_library.show_lines(filedata,option));
		return;
	}
	if(option.charAt(1)=='v'){	
		console.log(call_library.verbose(filename,filedata,option));
		return;
	}
	if(option.charAt(1)=='q'){
		console.log(call_library.quiet(filedata,option));
		return;
	}
}
main();