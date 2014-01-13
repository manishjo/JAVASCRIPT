var sort = require('./sort_lib.js').sort;
var fs = require('fs');
var main=function(){
	var input = sort.getUserInput(process.argv.slice(2,process.argv.length));
	if(process.argv[2]=='--h'||process.argv[2]=='--help'){
		if(process.argv.length==3)
		 	return fs.readFileSync('help.txt','utf-8');
		return "sort: unrecognized option `--'\nTry `sort --help' for more information.";
	}
	var getExtraHelp=process.argv.slice(3,process.argv.length);
	if(getExtraHelp.indexOf('--help')>=0||getExtraHelp.indexOf('--h')>=0)
		return "sort: unrecognized option `--'\nTry `sort --help' for more information."
	if(!fs.existsSync(input.fileName)) return 'Give an identical filename';
	var text =  fs.readFileSync(input.fileName,'utf-8');
	return  sort.calculateSort(text,input);
};
console.log(main());