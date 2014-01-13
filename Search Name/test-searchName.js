var assert = require('assert');
var search = require('./lib-searchName.js').search_name;
var test = {};

var text = 'mritunjay:kumar:dubey\nmanish:chandra:joshi\nraj:kumar:maurya\nmanish:chandra:joshi';

test.given_name_searched_as_single_full_name = function(){
	var input={namepart:'raj kumar maurya',has:false};
	assert.equal(['raj kumar maurya'].join('\n'),search.getExistNames(text,input));
};
test.given_name_searched_as_multiple_full_name = function(){
	var input={namepart:'manish chandra joshi',has:false};
	var name = 'manish chandra joshi';
	assert.equal(['manish chandra joshi','manish chandra joshi'].join('\n'),search.getExistNames(text,input));
};
test.given_name_searched_as_part_of_a_single_name = function(){
	var input={namepart:'raj',has:true};
	assert.equal(['raj kumar maurya'].join('\n'),search.getExistNames(text,input));
};
test.given_name_searched_as_part_of_a_multiple_names = function(){
	var input={namepart:'shi',has:true};
	assert.equal(['manish chandra joshi','manish chandra joshi'].join('\n'),search.getExistNames(text,input));
};
test.given_name_searched_as_full_name_when_has_is_false = function(){
	var raj = 'raj\nrajkumar\nrajendra'
	var input={namepart:'raj',has:false};
	assert.equal(['raj'].join('\n'),search.getExistNames(raj,input));
};
test.given_name_searched_as_part_of_name_when_has_is_true = function(){
	var raj = 'raj\nrajkumar\nrajendra'
	var input={namepart:'raj',has:true};
	assert.equal(['raj','rajkumar','rajendra'].join('\n'),search.getExistNames(raj,input));
};
test.given_name_searched_as_single_first_name = function(){
	var input={namepart:'mritunjay',has:false,fieldNo:1};
	assert.equal(['mritunjay kumar dubey'].join('\n'),search.getRecordByFieldNames(text,input));
};
test.given_name_searched_as_multiple_first_name = function(){
	var input={namepart:'manish',has:false,fieldNo:1};
	assert.equal(['manish chandra joshi','manish chandra joshi'].join('\n'),
		search.getRecordByFieldNames(text,input));
};
test.given_name_searched_as_multiple_part_of_first_name = function(){
	var records = ['manish:chandra:joshi','adimanav:kumar:joshi','mran:nand:bajpai'].join('\n')
	var input = {namepart:'man',has:true,fieldNo:1};
	assert.equal(['manish chandra joshi','adimanav kumar joshi'].join('\n'),
		search.getRecordByFieldNames(records,input));
};
test.given_name_searched_as_multiple_second_name = function(){
	var input={namepart:'kumar',has:false,fieldNo:2};
	assert.equal(['mritunjay kumar dubey','raj kumar maurya'].join('\n'),
		search.getRecordByFieldNames(text,input));
};
test.given_name_searched_as_multiple_part_of_second_name = function(){
	var records = ['manish:chandra:joshi','adimanav:kumar:joshi','mran:nand:bajpai'].join('\n')
	var input = {namepart:'and',has:true,fieldNo:2};
	assert.equal(['manish chandra joshi','mran nand bajpai'].join('\n'),
		search.getRecordByFieldNames(records,input));
};
test.given_name_searched_as_single_third_name = function(){
	var input={namepart:'dubey',has:false,fieldNo:3};
	assert.equal(['mritunjay kumar dubey'].join('\n'),
		search.getRecordByFieldNames(text,input));
};
test.given_name_searched_as_multiple_third_name = function(){
	var records = 'mritunjay:kumar:dubey\nmanish:chandra:joshi\nraj:kumar:dubey';
	var input={namepart:'dubey',has:false,fieldNo:3};
	assert.equal(['mritunjay kumar dubey','raj kumar dubey'].join('\n'),
		search.getRecordByFieldNames(records,input));
};
test.given_name_searched_as_multiple_part_of_third_name = function(){
	var records = ['manish:chandra:joshi','adimanav:kumar:joshi','mran:nand:bajpai'].join('\n')
	var input = {namepart:'osh',has:true,fieldNo:3};
	assert.equal(['manish chandra joshi','adimanav kumar joshi'].join('\n'),
		search.getRecordByFieldNames(records,input));
};

//************************************ test of UserInput**************************************
test.name_txt_and_rajkumar_should_be_recognized_as_file_name_and_namepart = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:0,has:true,namepart:'rajkumar'},
		search.getUserInput(['name.txt','-nrajkumar']));
};
test.name_txt_and_rajkumar_should_be_recognized_as_file_name_and_namepart_with_has_true = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:0,has:false,namepart:'rajkumar'},
		search.getUserInput(['name.txt','-nrajkumar','-i']));
};
test.name_txt_and_rajkumar_should_be_recognized_as_file_name_and_namepart_with_fieldNo_first = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:1,has:false,namepart:'rajkumar'},
		search.getUserInput(['name.txt','-nrajkumar','-f','-i']));
};
test.name_txt_and_rajkumar_should_be_recognized_as_file_name_and_namepart_with_fieldNo_second = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:2,has:false,namepart:'rajkumar'},
		search.getUserInput(['name.txt','-nrajkumar','-m','-i']));
};
test.name_txt_and_rajkumar_should_be_recognized_as_file_name_and_namepart_with_fieldNo_third = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:3,has:false,namepart:'rajkumar'},
		search.getUserInput(['name.txt','-nrajkumar','-l','-i']));
};
test.other_options_should_identified = function(){
	assert.deepEqual({fileName:'name.txt',fieldNo:0,has:true,namepart:'rajkumar',invalid:true},
		search.getUserInput(['name.txt','-nrajkumar','-t']));
};

//************************************* test of performSearch ***********************************8
var texts = 'mritunjay:kumar:joshi\nrajkumar:nand:awasthi\nshubham:kumar:katiyar\nmanish:kumar:pandey\nrajkumar:chandra:pandey';
test.performSearch_will_perform_default_search_when_fieldNo_is_0 = function(){
	var input = {fileName:'name.txt',fieldNo:0,has:false,namepart:'rajkumar nand awasthi'}
	assert.equal(['rajkumar nand awasthi'].join('\n'),
		search.performSearch(texts,input));
};
test.performSearch_will_perform_default_paerwise_search_when_fieldNo_is_0_when_has_is_true = function(){
	var input = {fileName:'name.txt',fieldNo:0,has:true,namepart:'rajkumar'}
	assert.equal(['rajkumar nand awasthi','rajkumar chandra pandey'].join('\n'),
		search.performSearch(texts,input));
};

test.performSearch_will_perform_first_name_search_when_fieldNo_is_1 = function(){
	var input = {fileName:'name.txt',fieldNo:1,has:false,namepart:'rajkumar'}
	assert.equal(['rajkumar nand awasthi','rajkumar chandra pandey'].join('\n'),
		search.performSearch(texts,input));
};
test.performSearch_will_perform_second_name_search_when_fieldNo_is_2 = function(){
	var input = {fileName:'name.txt',fieldNo:2,has:false,namepart:'kumar'}
	assert.equal(['mritunjay kumar joshi','shubham kumar katiyar','manish kumar pandey'].join('\n'),
		search.performSearch(texts,input));
};
test.performSearch_will_perform_second_name_partwise_search_when_fieldNo_is_2_and_has_is_true = function(){
	var input = {fileName:'name.txt',fieldNo:2,has:true,namepart:'and'}
	assert.equal(['rajkumar nand awasthi','rajkumar chandra pandey'].join('\n'),
		search.performSearch(texts,input));
};
//**************************************
test.searchName_when_there_is_no_middle_name = function (){
	var input = {fieldNo:3,has:true,namepart:'ar'};
	assert.equal(['raj maharaj'].join('\n'),
		search.getRecordByFieldNames(['raj:maharaj','i:gamraj'].join('\n'),input));
};
test.searchName_when_there_is_case_sensitive_matches = function(){
	var input = {fieldNo:0,has:true,namepart:'mrit'};
	assert.equal(['mritunjay kumar','AMRITUNJAY DUBEY'].join('\n'),
		search.performSearch(['mritunjay:kumar','AMRITUNJAY:DUBEY'].join('\n'),input));
};
test.searchName_when_there_is_case_sensitive_matches_in_fields = function(){
	var input = {fieldNo:3,has:true,namepart:'MAR'};
	assert.equal(['mritunjay kumar','AMRITUNJAY JAY SAMAR'].join('\n'),
		search.performSearch(['mritunjay:kumar','AMRITUNJAY:JAY:SAMAR','JAY:VEERU'].join('\n'),input));
};
//***************************************************************
test.search_name_at_more_than_one_space_between_name_part = function(){
	var input = {fieldNo:3,has:false,namepart:'b'};
	assert.equal(['A B'].join('\n'),search.performSearch(['A:::::::::B'].join('\n'),input));
};
exports.test=test;
