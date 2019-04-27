function modalRender (info) {
	document.getElementsByClassName('modal-slot')[0].innerHTML = `
		<div class="modal-overlay" id="modal-overlay"></div>
		<div class="modal" id="modal" aria-hidden="true" aria-labelledby="modalTitle" aria-describedby="modalDescription" role="dialog">
			<button
				class="close-button"
				id="close-button"
				title="Close modal window"
			>
				Close
			</button>
			<div class="modal-guts" role="document">
				<h1>${info.title}</h1>
				<p>${info.content}</p>
				${checkBoxRender(info.id)}
			</div>
		</div>
	`;

	const modal = document.querySelector("#modal"),
		modalOverlay = document.querySelector("#modal-overlay"),
		closeButton = document.querySelector("#close-button");

	closeButton.addEventListener("click", function() {
		modal.classList.toggle("closed");
		modalOverlay.classList.toggle("closed");
	});
}

function check(id) {
	console.log(id);
	let read = [];
	if (document.getElementById("check").checked) {
		localStorage.getItem('title') ? read.push(localStorage.getItem('title'), id) : read.push(id);
		document.getElementById(`${id}`).classList.add('checked');
	} else {
		read = localStorage.getItem('title').split(',');
		read = read.filter(i => i != id);
		document.getElementById(`${id}`).classList.remove('checked');
	}

	localStorage.setItem('title', read);
}


function checkBoxRender(id) {
	let state = !!localStorage.getItem('title');
	if(state && localStorage.getItem('title').indexOf(id) !== -1) {
		return (`
			<label class="pure-material-checkbox">
				<input
					id='check'
		            onclick='check(${id})'
		            type="checkbox"
		            checked
		            >
			        <span>Accept</span>
			</label>
		`);
	} else {
		return (`
			<label class="pure-material-checkbox">
				<input
					id='check'
		            onclick='check(${id})'
		            type="checkbox"
		            >
			        <span>Accept</span>
			</label>
		`);
	}
}