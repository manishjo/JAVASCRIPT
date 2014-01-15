-JAVASCTIPT
 -====================
 -This repository has the simulated implementation of different unix-tools `wc, cut, head,
 -tail, sort` and also some extra functionality that is `reduceSpaces` and `searchName`.
 -
 -
 -## wc :
 -##### Stands for word count, wc displays a count of lines, words, and characters in a file.
 -    wc.js filename
 -
 -## cut :
 -#### Filters and gives the asked columns in given file.
 -    md_cut.js [options] filename
 -    options:- -f'1,2,3', -d','
 -
 -## head:
 -#### Head gives the first `n` lines from the given file.
 -    head.js [-noOfLines] filename
 -
 -## tail:
 -#### Tail gives the last `n` lines from the given file.
 -    tail.js [-noOfLines] filename
 -
 -
 -## sort:
 -#### Sorts the lines in a file.
 -    sort.js Filename [-r]
 -
 -
 -## reduceSpaces:
 -#### Reduces more than one occurrences of blank spaces into one. Takes a input file and writes into another file.
 -    reduce_space InputFile outputFile
 -
 -
 -## search name:
 -####search names in a given file with a string given with -n without any other option.
-####if any option is given search as first name, middle name, last name, full name or part of a name.
-     searchName Filename [options] value