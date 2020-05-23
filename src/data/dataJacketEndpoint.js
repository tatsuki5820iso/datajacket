import axios from 'axios'

const host = "https://datajacket-store.org/sparql"

const requestDJ = async function(txtQuery) {
	try {
		var url = generateUrl(txtQuery)
		var result=await axios.post(url)
		return result
	} catch (e) {
		console.error(e)
	}
}

function generateUrl(txtQuery) {
	return `${host}?query=${encodeURIComponent(txtQuery)}&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+`
}

export { requestDJ };