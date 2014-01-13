var search_name = {};

var getActualNamePart = function(name){
	name = name.toLowerCase();
	name = name.replace(/ /g,':');
	return name;
};
search_name.getExistNames= function(text,options){
	text=text.replace(/\r/g,'');
	text = text.replace(/:+/g,':');
	name = getActualNamePart(options.namepart);
	var lines = text.split('\n');
	var matches = [];
	if(options.has){
		lines.forEach(function(record){
			if(record.toLowerCase().indexOf(name)>-1)
				matches.push(record);
			else{
				var fields = record.split(':');
				fields.forEach(function(namePart){
					if(namePart.toLowerCase().indexOf(name)>-1)
						matches.push(record);
				});
			};
		});
	}
		
	else{
		lines.forEach(function(record){
			if(record.toLowerCase() == name)
			matches.push(record);
			else{
				var fields = record.split(':');
				fields.forEach(function(namePart){
					if(namePart.toLowerCase()==name)
						matches.push(record);
				});
			};
		});
	};
	if(matches.length==0)
		return 'no matches found';
	return matches.join('\n').replace(/:/g,' ');
};

var swapFields = function(nameParts){
	if(!nameParts[1])
		nameParts[1] = '';
	if(!nameParts[2])
		nameParts[2] = '';
	if(nameParts[2] =='' && nameParts[1]!=''){
		nameParts[2] = nameParts [1];
		nameParts[1] = '';
	};
	return nameParts;
};

search_name.getRecordByFieldNames = function(text,options){
	text=text.replace(/\r/g,'');
	text = text.replace(/:+/g,':');
	name = getActualNamePart(options.namepart);
	var lines = text.split('\n');
	var matches = [];
	var field = (options.fieldNo-1);

	if(options.has){
		lines.forEach(function(record){
			var nameParts = record.split(':');
			nameParts = swapFields(nameParts);
			if(nameParts[field].toLowerCase().indexOf(name)>-1)
				matches.push(record);
		});
	}
	else{
		lines.forEach(function(record){
			var nameParts = record.split(':');
			nameParts = swapFields(nameParts);
			if(nameParts[field].toLowerCase() == name)
				matches.push(record);
		});
	};
	if(matches.length==0)
		return 'no matches found';
	return matches.join('\n').replace(/:/g,' ');
};

var getNamePart=function(options){
	for (var index=0;index<options.length;index++){
		var text=options[index];
		if(text.charAt(1)=='n'){
			if(text.substring(2,text.length))
				return text.substring(2,text.length);
			return '';
		};
	};
};
var isOptionPresent=function(option_name){
	return function(text){
		return text.charAt(1)==option_name;
	};
};

var isOptionsIllegel = function(options){
	options = options.filter(function(text){
		return text.charAt(1) != 'n'
	});
	var validOptions = ['--h','-f','-m','-l','-i'];
	var invalidOption = options.some(function(text){
		return validOptions.join('').indexOf(text) < 0;
	}); 
	if(invalidOption)
		return 'invalid';
};

search_name.getUserInput = function(args){
	var result = {fieldNo:0,has:true,namepart:''};

	var nonOptions=args.filter(function(text){
		return text.charAt(0) != '-';
	});
	result.fileName=nonOptions[0];

	var options=args.filter(function(text){
		return text.charAt(0) == '-'
	});

	var help = options.some(function(text){
		return text=='--h';
	});
	if(help)
		result.help = true;

	var invalidOption = isOptionsIllegel(options);
	if(invalidOption == 'invalid')
		result.invalid = true;

	if(options.some(isOptionPresent('n')))
		result.namepart = getNamePart(options);
	if(result.namepart == ' ' || result.namepart == ':')
		result.namepart = '';
	result.has = (!options.some(isOptionPresent('i')));

	if(options.some(isOptionPresent('f')))
		result.fieldNo = 1;
	else if(options.some(isOptionPresent('m')))
		result.fieldNo = 2;
	else if(options.some(isOptionPresent('l')))
		result.fieldNo = 3;
	return result;
};

search_name.performSearch = function(text,options){
	if(options.fieldNo == 0)
		return search_name.getExistNames(text,options);
	else
		return search_name.getRecordByFieldNames(text,options);
};
exports.search_name = search_name;