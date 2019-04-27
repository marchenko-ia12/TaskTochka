document.body.onload = function () {
	if (localStorage.getItem('title')) {
		read = localStorage.getItem('title').split(',');
		read = read.map(i => document.getElementById(`${i}`).classList.add('checked'));
	}
}