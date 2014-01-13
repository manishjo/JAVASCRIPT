var assert = require('assert');
var test = {};
test.Hypotenuse_of_oppsite_5_and_adjacent_12_is_13=function(){
	assert.equal(5,findHypotenuse_of_rightAngleTriangle(3,4));
}
test.Hypotenuse_of_oppsite_5_and_adjacent_5_is_7_point_071=function(){
	assert.equal(7.071,Hypotenuse_of_rightAngleIsoscelesTriangle(5));
}
var findHypotenuse_of_rightAngleTriangle=function(adjacent,opposite){
	var oppositeSquare=opposite*opposite;
	var adjacentSquare=adjacent*adjacent;
	var sum_of_oppositeSquare_and_adjacentSquare=oppositeSquare+adjacentSquare;
	return Math.sqrt(sum_of_oppositeSquare_and_adjacentSquare);
}
var Hypotenuse_of_rightAngleIsoscelesTriangle=function(side){
	var res= side*Math.sqrt(2);
	return res.toFixed(3);
}
exports.test=test;