console.log("Let's get this party started!");

const $form = $('form');
const $imgRowDiv = $('#images');

$('#remove').on('click', function() {
	$imgRowDiv.empty();
});

$form.on('submit', function(e) {
	e.preventDefault();
	getGifsBySearchQ(getInputValue());
});

function getInputValue() {
	let searchQuery = $('#search').val();
	$('#search').val('');
	return searchQuery;
}

async function getGifsBySearchQ(q) {
	const url = 'http://api.giphy.com/v1/gifs/search';
	const api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
	let res = '';
	try {
		res = await axios.get(url, {
			params: { q, api_key }
		});
	} catch (error) {
		console.log(`API returned an error: ${error}`);
	}
	res.data ? addNewGiphyToPage(res.data) : alert('Cannot find this Giphy:( update your search and try again!');
}

function addNewGiphyToPage(apiResp) {
	let randGiphNum = getRandomInt(apiResp.data.length);
	let giphImgUrl = apiResp.data[randGiphNum].images.original.url;

	const $imgCol = $('<div>', { class: 'lead col-md-4' });
	const $imgElement = $('<img>', { class: 'img-thumbnail img-fluid', src: giphImgUrl });
	$imgCol.append($imgElement);
	$imgRowDiv.append($imgCol);
}

function getRandomInt(numResults) {
	return Math.floor(Math.random() * numResults);
}
