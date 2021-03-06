var sort = {};
var fs = require('fs');
sort.sort_by_lines=function(text,options){
	if(options.checkDisorder)return sort.check_if_sorted_by_fields(text,options);
	var seprated_by_lines=text.split('\n');
	if(options.reverse==true)return seprated_by_lines.sort().reverse().join('\n');
		return seprated_by_lines.sort().join('\n');
};
sort.is_number_or_not=function(text_in_lines,options){
	for(i=0;i<text_in_lines.length;i++){
		if(isNaN(text_in_lines[i].split(options.delimiter)[options.fieldNo-1]))
			return 0;
	};
	return options.fieldNo-1;
};
sort.sort_by_field=function(text,options){
	if(!options.delimiter)
		options.delimiter= ' ';
	if(options.fieldNo==-1){
		options.fieldNo=1;}
	var text_in_lines=text.split('\n');
//............Here we find out the maximum leangth of a line ..............
	var findMaxLength=function(pv,cv){
	var max=pv;
			if(max<cv)
				max=cv
			return max;
	}
	var find_length=function(value){
			return value.split(options.delimiter).length;
		}
	var lengthOfLines=text_in_lines.map(find_length);
	var maxLength=lengthOfLines.reduce(findMaxLength);
	if(options.fieldNo>maxLength)
		options.fieldNo=1;
	if(options.checkDisorder)
		return sort.check_if_sorted_by_fields(text,options);
	var field={completField:[],uncompleteField:[]};
	for(var count=0;count<text_in_lines.length;count++){
		if(!text_in_lines[count].split(options.delimiter)[options.fieldNo-1])
			field.uncompleteField.push(text_in_lines[count]);
		else
		field.completField.push(text_in_lines[count]);

	}
	if(options.numeric==true){
			options.fieldNo=sort.is_number_or_not(text_in_lines,options);
				var compare=function(pv,cv){
			var field_1 = pv.split(options.delimiter)[options.fieldNo-1];
			var field_2 = cv.split(options.delimiter)[options.fieldNo-1];
			if(field_1==field_2){
				field_1 = pv.split(options.delimiter)[options.fieldNo];
				field_2 = cv.split(options.delimiter)[options.fieldNo];
			}
			return (field_1>field_2)?1:-1;
	};	
	if(options.reverse==true)
		return text_in_lines.sort(compare).reverse().join('\n');
		return text_in_lines.sort(compare).join('\n');
	}
	var compare=function(pv,cv){
			var field_1 = pv.split(options.delimiter)[options.fieldNo-1];
			var field_2 = cv.split(options.delimiter)[options.fieldNo-1];
			if(field_1==field_2){
				field_1 = pv.split(options.delimiter)[options.fieldNo];
				field_2 = cv.split(options.delimiter)[options.fieldNo];
			}
			return (field_1>field_2)?1:-1;
	};	
	if(options.reverse==true){
		var sortedData1=field.completField.sort(compare).reverse();
		var sortedData2=field.uncompleteField.sort().reverse();
		}
	else{
	var sortedData1=field.completField.sort(compare);
	var sortedData2=field.uncompleteField.sort();
	}
	return sortedData2.concat(sortedData1).join('\n');
};

// ...........................  -c ...........................................

sort.check_if_sorted_by_fields=function(text,options){
	var text_in_lines=text.split('\n');
	var data_by_delimiter=[];
	for(var i=0;i<text_in_lines.length;i++){
		var saprate_by_delimiter=text_in_lines[i].split(options.delimiter);
		data_by_delimiter.push(saprate_by_delimiter[options.fieldNo-1]);
	}
	if(options.reverse){
		for(var i=0;i<data_by_delimiter.length;i++){
			if(data_by_delimiter[i]<data_by_delimiter[i+1])
				return "sort: "+options.fileName+":"+(i+2)+": disorder: "+text_in_lines[i+1];
		}
		return ' ';
	}
	for(var i=1;i<data_by_delimiter.length;i++){
		if(data_by_delimiter[i-1]>data_by_delimiter[i])
			return "sort: "+options.fileName+":"+(i+1)+": disorder: "+text_in_lines[i];
		}
		return ' ';
	};

//............................ User input ...................................

var doesNotStartWithminus = function(text){
	return text.charAt(0) != '-';
};
var startsWithMinus = function(text){
	return text.charAt(0) == '-';
};
var is_k=function(text){
	return text.charAt(1) == 'k';
};
var is_t=function(text){
	return text.charAt(1) == 't';
};
var is_r=function(text){
	return text.charAt(1) == 'r';
};
var is_n=function(text){
	return text.charAt(1) == 'n';
};
var is_c=function(text){
	return text.charAt(1) == 'c';
};
var getFileldNo=function(options){
	for(i=0;i<options.length;i++){
		if(options[i].charAt(1)=='k')
			return options[i].substring(2,options[i].length);
	};
};
var getDelimiter=function(options){
	for(i=0;i<options.length;i++){
		if(options[i].charAt(1)=='t')
			return options[i].charAt(2);
	}
}
sort.getUserInput=function(args){
	var result = {
		fieldNo:-1,
		delimiter:" ",
		reverse:false,
		numeric:false,
		checkDisorder:false
	};
	var nonOptions = args.filter(doesNotStartWithminus);
	result.fileName = nonOptions[0];
	var options = args.filter(startsWithMinus);
	if(options.length == 0) return result;
	if(options.some(is_k))
		result.fieldNo=getFileldNo(options);
	if(options.some(is_t))
		result.delimiter=getDelimiter(options);
	result.reverse=options.some(is_r);
	result.numeric=options.some(is_n);
	result.checkDisorder=options.some(is_c);
	return result;
};
sort.calculateSort=function(text,input){
	if(input.delimiter=='')
		return "sort: option `-t' requires an argument"
	var fieldCheak=(Number(input.fieldNo));
	if(input.fieldNo==''||input.fieldNo==0)
			return "sort: option `-k' requires an argument";
	if(isNaN(fieldCheak))
		return ("sort: invalid field specification `-k"+input.fieldNo+"'");
	if(input.fieldNo==-1)
		return sort.sort_by_lines(text,input);
	return sort.sort_by_field(text,input);
}
exports.sort = sort;