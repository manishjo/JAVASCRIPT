var assert = require('assert');
var sort = require('./sort_lib.js').sort;
var test = {};

//.......................... Sort by lines without fields .................................

test._1_String_manish_arjun_amit_yogesh_after_sorting_amit_arjun_manish_yogesh= function(){
	assert.deepEqual("amit\narjun\nmanish\nyogesh",sort.sort_by_lines("manish\narjun\namit\nyogesh",
	{delimiter:' ',fieldNo:-1,reverse:false,numeric:false,checkDisorder:false}));
};
test._2_Number_12_1_34_14_10_after_sorting_1_10_12_14_34=function(){
	assert.deepEqual("1\n10\n12\n14\n34",sort.sort_by_lines("12\n1\n34\n14\n10",
	{delimiter:' ',fieldNo:-1,reverse:false,numeric:false,checkDisorder:false}));
};
test._3_String_manish_arjun_amit_yogesh_after_reverse_sorting_yogesh_manish_arjun_amit=function(){
	assert.deepEqual("yogesh\nmanish\narjun\namit",sort.sort_by_lines("manish\narjun\namit\nyogesh",
		{delimiter:' ',fieldNo:-1,reverse:true,numeric:false,checkDisorder:false}));
};
test._4_Number_to_12_1_34_14_10_after_reverse_sorting_34_14_12_10_1=function(){
	assert.deepEqual("34\n14\n12\n10\n1",sort.sort_by_lines("12\n1\n34\n14\n10",
		{delimiter:' ',fieldNo:-1,reverse:true,numeric:false,checkDisorder:false}));
};

//........................... Sort by lines with fields ....................................

test._5_String_UP_$_LUCKNOW_$_KARNATAKA_$_BANGALURE_after_sorting_KARNATAKA_$_BANGALURE_$_UP_$_LUCKNOW =function(){
	assert.deepEqual("BANGALURE\nKARNATAKA\nLUCKNOW\nUP",sort.sort_by_field("UP\nLUCKNOW\nKARNATAKA\nBANGALURE",
		{delimiter:' ',fieldNo:1,reverse:false,numeric:false,checkDisorder:false}));
};
test._6_String_UP_$_LUCKNOW_$_KARNATAKA_$_BANGALURE_after_reverse_sorting_UP_$_LUCKNOW_$_KARNATAKA_$_BANGALURE =function(){
	assert.deepEqual("UP\nLUCKNOW\nKARNATAKA\nBANGALURE",sort.sort_by_field("UP\nLUCKNOW\nKARNATAKA\nBANGALURE",
		{delimiter:' ',fieldNo:1,reverse:true,numeric:false,checkDisorder:false}));
};
test._7_String_ram_india_$_jhon_australiya_$_tim_us_after_sorting_jhon_australiya_$_ram_india_$_tim_us=function(){
	assert.deepEqual("jhon australiya\nram india\ntim us",sort.sort_by_field("ram india\njhon australiya\ntim us",
		{delimiter:' ',fieldNo:2,reverse:false,numeric:false,checkDisorder:false}));
};
test._8_String_ram_india_$_jhon_australiya_$_tim_us_after_reverse_sorting_jhon_australiya_$_ram_india_$_tim_us=function(){
	assert.deepEqual("tim us\nram india\njhon australiya",sort.sort_by_field("ram india\njhon australiya\ntim us",
		{delimiter:' ',fieldNo:2,reverse:true,numeric:false,checkDisorder:false}));
};
test._9_String_ram_india_8_$_jhon_australiya_18_$_tim_us_23_is_ram_india_8_$_ramesh_india_$_tim_us=function(){
	assert.deepEqual("ram india 8\njhon australiya 18\ntim us 23",sort.sort_by_field
	("jhon australiya 18\nram india 8\ntim us 23",{delimiter:' ',fieldNo:3,reverse:false,numeric:true,checkDisorder:false}));
};
test._10_String_ram_india_8_$_jhon_australiya_18_$_tim_us_23_without_delimiter_sorting_ram_india_8_$_ramesh_india_$_tim_us=function(){
	assert.deepEqual("tim us 23\njhon australiya 18\nram india 8",sort.sort_by_field
	("jhon australiya 18\nram india 8\ntim us 23",{delimiter:null,fieldNo:3,reverse:true,numeric:true,checkDisorder:false}));
};
test._11_String_ram_india_8_$_jhon_australiya_18_$_tim_us_23_without_field_sorting_ram_india_8_$_ramesh_india_$_tim_us=function(){
	assert.deepEqual("jhon australiya 18\nram india 8\ntim us 23",sort.sort_by_field
	("tim us 23\njhon australiya 18\nram india 8",{delimiter:' ',fieldNo:-1,reverse:false,numeric:false,checkDisorder:false}));
};
test._12_String_manish_joshi_20_$_mritunjay_dubey_17_$_prateek_jain_19_after_sorting_with_comma_is_mritunjay_dubey_17_$_prateek_jain_19_$_manish_joshi_20=function(){
	assert.deepEqual("mritunjay,dubey,17\nprateek,jain,19\nmanish,joshi,20",sort.sort_by_field
		("manish,joshi,20\nprateek,jain,19\nmritunjay,dubey,17",{delimiter:',',fieldNo:3,reverse:false,numeric:true,checkDisorder:false}))
}
test._13_String_yogesh_17_$_manish_joshi_$_amit_kumar_is_reverse_sorted_by_second_field_and_delimiter=function(){
	assert.equal("yogesh,17\nmanish,joshi\namit,kumar",sort.sort_by_field("amit,kumar\nmanish,joshi\nyogesh,17",
		{delimiter:',',fieldNo:2,reverse:true,numeric:true,checkDisorder:false}));
}
test._14_If_field_is_more_then_actual_then_its_sort_by_default=function(){
	assert.deepEqual("jhon australiya 18\nram india 8\ntim us 23",sort.sort_by_field
	("tim us 23\njhon australiya 18\nram india 8",{delimiter:' ',fieldNo:71,reverse:false,numeric:false,checkDisorder:false}));
};

//..........................Using -c to determine field is sorted or not .................

test._15_String_amit_manish_praveen_yogesh_is_shorted=function(){
	assert.equal(' ',sort.check_if_sorted_by_fields("amit\nmanish\npraveen\nyogesh",
		{delimiter:'',fieldNo:-1,reverse:false,numeric:false,checkDisorder:true}));
}
test._16_String_amit_22_manish_20_praveen_21_yogesh_17_aakash_25_is_not_sorted=function(){
	assert.equal('sort: data.txt:5: disorder: aakash 25',sort.check_if_sorted_by_fields('amit 22\nmanish 20\npraveen 21\nyogesh 17\naakash 25',
		{delimiter:' ',fileName:'data.txt',fieldNo:1,reverse:false,numeric:false,checkDisorder:true}));
}
test._17_String_amit_22_manish_20_praveen_21_yogesh_17_aakash_25_is_not_reverse_sorted=function(){
	assert.equal('sort: data.txt:4: disorder: yogesh 20',sort.check_if_sorted_by_fields('amit 25\nmanish 22\npraveen 19\nyogesh 20\naakash 10',
		{delimiter:' ',fileName:'data.txt',fieldNo:2,reverse:true,numeric:false,checkDisorder:true}));
}
test._18_String_amit_manish_praveen_yogesh_is_reverse_shorted=function(){
	assert.equal(' ',sort.check_if_sorted_by_fields("yogesh\npraveen\nmanish\namit",
		{delimiter:'',fieldNo:-1,reverse:true,numeric:false,checkDisorder:true}));
}
test._19_String_yogesh_18_$_manish_20_$_amit_22_is_sorted_by_second_field=function(){
	assert.equal('sort: data.txt:3: disorder: prateek jain 19',sort.check_if_sorted_by_fields('manish joshi 20\nudaykant tiwari 20\nprateek jain 19',
		{delimiter:' ',fileName:'data.txt',fieldNo:2,reverse:false,numeric:false,checkDisorder:true}));
}
test._20_String_yogesh_18_$_manish_20_$_amit_22_is_reverse_sorted_by_second_field=function(){
	assert.equal(' ',sort.check_if_sorted_by_fields("amit 22\nmanish 20\nyogesh 18",
		{delimiter:' ',fieldNo:2,reverse:true,numeric:true,checkDisorder:true}));
}
test._21_String_yogesh_18_$_manish_20_$_amit_22_is_sorted_by_delimiter=function(){
	assert.equal(' ',sort.check_if_sorted_by_fields("amit,22\nmanish,20\nyogesh,18",
		{delimiter:',',fieldNo:null,reverse:false,numeric:true,checkDisorder:true}));
}
test._22_String_yogesh_18_$_manish_20_$_amit_22_is_reverse_sorted_by_second_field_and_delimiter=function(){
	assert.equal(" ",sort.check_if_sorted_by_fields("amit,22\nmanish,20\nyogesh,18",
		{delimiter:',',fieldNo:2,reverse:true,numeric:true,checkDisorder:false}));
}

//*************************************** GetUserInput *********************************************
test._23_sort_should_determine_a_txt_as_fileName_with_non_options=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:-1,
		delimiter:false,
		reverse:false,
		numeric:false,
		checkDisorder:false},sort.getUserInput(['a.txt']));
};
test._24_sort_should_determine_a_txt_as_fileName_with_field_No=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:false,
		reverse:false,
		numeric:false,
		checkDisorder:false},sort.getUserInput(['a.txt','-k3']));
};
test._25_sort_should_determine_a_txt_as_fileName_with_delimiter=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:',',
		reverse:false,
		numeric:false,
		checkDisorder:false},sort.getUserInput(['a.txt','-k3','-t,']));
};
test._26_sort_should_determine_a_txt_as_fileName_with_reverse=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:',',
		reverse:true,
		numeric:false,
		checkDisorder:false},sort.getUserInput(['a.txt','-k3','-t,','-r']));
};
test._27_sort_should_determine_a_txt_as_fileName_with_numeric=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:',',
		reverse:true,
		numeric:true,
		checkDisorder:false},sort.getUserInput(['a.txt','-k3','-t,','-r','-n']));
};
test._28_sort_should_determine_a_txt_as_fileName_with_checkDisorder=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:',',
		reverse:true,
		numeric:true,
		checkDisorder:false},sort.getUserInput(['a.txt','-k3','-t,','-r','-n']));
};
test._29_sort_should_determine_a_txt_as_fileName_with_delimiter_all_options=function(){
	assert.deepEqual({fileName:'a.txt',
		fieldNo:3,
		delimiter:',',
		reverse:true,
		numeric:true,
		checkDisorder:true},sort.getUserInput(['a.txt','-k3','-t,','-r','-c','-n']));
};

//---------------------------------CalculateSort----------------------------------------

test._30_sort_calculate_working_without_fieldNo=function(){
	var input={fieldNo:-1,
		delimiter:' ',
		reverse:false,
		numeric:false,
		checkDisorder:false}
	assert.deepEqual('hello\nho\nmy',sort.calculateSort('hello\nmy\nho',input));
};
test._31_sort_calculate_working_with_fieldNo=function(){
	var input={fieldNo:2,
		delimiter:' ',
		reverse:false,
		numeric:false,
		checkDisorder:false}
	assert.deepEqual('good evening\nme manish\nhello vijay',sort.calculateSort('hello vijay\nme manish\ngood evening',input));
};
test._32_sort_calculate_working_with_checkDisorder=function(){
	assert.equal(' ',sort.calculateSort("yogesh\npraveen\nmanish\namit",
		{delimiter:' ',
		fieldNo:-1,
		reverse:true,
		numeric:false,
		checkDisorder:true}));
}
test._33_sort_calculate_working_with_checkDisorder_and_field=function(){
	assert.equal('sort: data.txt:4: disorder: yogesh 20',sort.calculateSort('amit 25\nmanish 22\npraveen 19\nyogesh 20\naakash 10',
		{delimiter:' ',
		fileName:'data.txt',
		fieldNo:2,
		reverse:true,
		numeric:false,
		checkDisorder:true}));
}
exports.test = test;