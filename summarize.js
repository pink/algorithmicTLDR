function autoSummarize(input){

	var testString = input;
	var testWords = testString.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
	var lexer = new Lexer();
	var tagger = new POSTagger();
	var frequency_table = {};
	var word_list = {};
	var total_frequency = 0;
	var total_words = 0;
	var average = 0;
	var string_table = {};
	var sentence_length = {};

	testString = testString.replace(/\s\s/g, " ");
	//generates a list of all the words and a hashtable with frequencies
	for (i in testWords){
		var loweredWord = testWords[i].toLowerCase()

		if (stop_list[loweredWord]!= 1 &&!( loweredWord == ',' || loweredWord == '.' )){

			if(frequency_table[loweredWord] == undefined ){
				frequency_table[loweredWord] = 1
				total_words = total_words + 1;
			} else {
				frequency_table[loweredWord] = frequency_table[loweredWord] + 1;
			}
			total_frequency = total_frequency + 1;
		} 

	}

	average = total_frequency/total_words;

	for (i in testWords){
		var loweredWord = testWords[i].toLowerCase()
		if (frequency_table[loweredWord] > average){
			word_list[loweredWord] = 1;
		}
	}

	var result = testString.match( /["']?[A-Z][^.?!]+((?![.?!]['"]?\s["']?[A-Z][^.?!]).)+[.?!'"]+/g );

	for (i in result){
		var length = result[i].length;
		var three_string = result[i].substr(length-3,3);
		var four_string = result[i].substr(length-4,4);
		if (three_string == "Mr." || three_string == "Ms." || three_string == "Dr." || four_string == "Mrs."){

			var res = result[i];
			var res1 = result[parseInt(i)+1];
			var ans = res.concat(" " + res1);
			result[i] = ans;
			result.splice(parseInt(i)+1,1);
		}
		string_table[result[i]] = 0;
	}


	for (i in result){
		var words = lexer.lex(result[i]);
		var tags = tagger.tag(words);
		var patt = /[0-9]+/g;
		var res = result[i].match(patt);
		if (res != null){
			string_table[result[i]] = string_table[result[i]] + res.length;
		}
		res = result[i].split(" ");
		for (j in tags){
			var tag = tags[j];

			// if word is not a stop word
			if (stop_list[tag[0]] != 1){
				string_table[result[i]] = string_table[result[i]] + 1;
			}

			// if word is a adverb, noun, adjective, or verb
			if (tag[1] == "RB" || tag[1] == "NN" || tag[1] == "JJ" || tag[1] == "VBG"){
				string_table[result[i]] = string_table[result[i]] + 1;
			}

			// if word is part of word list
			if (word_list[tag[0]] == 1){
				string_table[result[i]] = string_table[result[i]] + 1;
			}
		}
		sentence_length[result[i]] = total_words/res.length;
	}

	total_frequency = 0;
	for (i in result){
		string_table[result[i]] = string_table[result[i]] * sentence_length[result[i]];
		total_frequency += string_table[result[i]];
	}
	var ans = 0;
	var average_frequency = total_frequency/result.length;
	var final_string = "";
	for (i in result){
		if (string_table[result[i]] > average_frequency){
			final_string += result[i] + " ";
			ans = ans + 1;
		}
	}

	console.log("Initial # of sentences: " + result.length);
	console.log("Final # of sentences: " + ans);

	console.log(final_string);
	var arr = [final_string, result.length, ans];
	return arr;
}


