function modalRender (info) {
	document.getElementsByClassName('modal-slot')[0].innerHTML = `
		<div class="modal-overlay" id="modal-overlay"></div>
		<div class="modal" id="modal" aria-hidden="true" aria-labelledby="modalTitle" aria-describedby="modalDescription" role="dialog">
			${info.type === 'News' ? news(info) : transaction(info)}
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

function news(info) {
	return (`
		<div class="modal-guts" role="document">
			<div class='modal-head'>
				<h3>${info.title}</h3>
				<button
					class="close-button"
					id="close-button"
					title="Close modal window"
				>
					X
				</button>
			</div>
			<p>${info.content}</p>
			${checkBoxRender(info.id)}
		</div>
	`);
}

function transaction(info) {
	return (`
		<div class="modal-guts" role="document">
			<div class='trn-info'>
				<div class='modal-head'>
					<h3>${info.date}</h3>
					<button
					class="close-button"
					id="close-button"
					title="Close modal window"
					>
						X
					</button>
				</div>
				<div class='first-row'>${info.from}</div>
				<h3 class='money'>${renderTransaction(info.arExp, info.sum, info.currency)}</h3>
				<div class='first-row'> ${info.description}</div>
				<button
					class='delete-btn'
					onclick='deleter(${info.id})'
				>
					Delete
				</button>
			</div>
		</div>
	`);
}

function deleter(id) {
	let read = [];
	if (localStorage.getItem('trans')) {
		localStorage.getItem('trans') ? read.push(localStorage.getItem('trans'), id) : read.push(id);
	} else {
		read.push(id)
	}
	localStorage.setItem('trans', read);

	document.getElementById(`${id}`).remove();
	const modal = document.querySelector("#modal"),
		modalOverlay = document.querySelector("#modal-overlay");

	modal.classList.toggle("closed");
	modalOverlay.classList.toggle("closed");
}

function check(id) {
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