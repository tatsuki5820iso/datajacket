import TinySegmenter from '../plugins/tinysegmenter'

// Words less than threshold won't be returned!
const ignoreThreshold = 3;

const disassemble = function(sentence) {
	var segmenter = new TinySegmenter()
	return segmenter
				.segment(sentence)
				.filter(word => word.trim().length > ignoreThreshold); // TODO: add filter to exclude unused words.
}

const toQuery = function(array) {
	var txtQuery="SELECT ?dj ?req WHERE {"
		+"{"
		+"?s rdfs:label ?sol;"
		+"<http://datajacket.org/solution/id> ?sol_ID;"
		+"<http://datajacket.org/solution/combine> ?dj_URI;"
		+"<http://datajacket.org/solution/satisfy> ?req_URI."
		+"?req_URI rdfs:label ?req."
		+"?dj_URI rdfs:label ?dj."
		+`FILTER (${toFilter(array, 'req')})`
		+"}"
		+"UNION"
		+"{"
		+"?s rdfs:label ?sol;"
		+"<http://datajacket.org/solution/id> ?sol_ID;"
		+"<http://datajacket.org/solution/combine> ?dj_URI;"
		+"<http://datajacket.org/solution/satisfy> ?req_URI."
		+"?req_URI rdfs:label ?req."
		+"?dj_URI rdfs:label ?dj."
		+`FILTER (${toFilter(array, 'sol')})`
		+"}"
		+"UNION"
		+"{"
		+"?s rdfs:label ?sol;"
		+"<http://datajacket.org/solution/id> ?sol_ID;"
		+"<http://datajacket.org/solution/combine> ?dj_URI;"
		+"<http://datajacket.org/solution/satisfy> ?req_URI."
		+"?req_URI rdfs:label ?req."
		+"?dj_URI rdfs:label ?dj."
		+`FILTER (${toFilter(array, 'dj')})`
		+"}"
		+"}" // WHERE ending brace
	return txtQuery;
}

function toFilter(array, variable) {
	return array
		.map(word => `regex(?${variable}, '${word}')`)
		.join(" || ")
}

const unused = ["Consumer"] // TODO: Think of a better way to reject unused words.

const toRequirementArray = function (requirements) {
	var merged = requirements.join(" ");
	var words = disassemble(merged)
	return words
		.filter((word, i, self) => self.indexOf(word) === i) // Remove duplication
		.filter(word => word.trim().length > ignoreThreshold)
		.filter(word => !unused.includes(word))
}

export { disassemble, toQuery, toRequirementArray }