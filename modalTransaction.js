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