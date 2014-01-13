var search = require('./lib-searchName.js').search_name;
var fs = require('fs');
var main = function main () {
	var input = search.getUserInput(process.argv.slice(2,process.argv.length));
	if(input.help)
		return fs.readFileSync('help.txt','utf-8');
	if(input.invalid)
		return 'invalid option';
	if(!fs.existsSync(input.fileName))
		return 'no such file';
	if(input.namepart=='')
		return '-n needs a namepart';
	
	var text =  fs.readFileSync(input.fileName,'utf-8');
	return  search.performSearch(text,input);
};
console.log(main());