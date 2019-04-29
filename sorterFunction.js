function sorterDate (list) {
	document.getElementsByClassName('type')[0].classList.remove('sort-up', 'sort-down');
	let sort = localStorage.getItem('sortDate') ? localStorage.getItem('sortDate') : 1;
	let sorterList = list.sort(function(a, b) {
		if (sort == 1) {
			localStorage.setItem('sortDate', 0);
			document.getElementsByClassName('date')[0].classList.remove('sort-up');
			document.getElementsByClassName('date')[0].classList.add('sort-down');
		} else {
			localStorage.setItem('sortDate', 1);
			document.getElementsByClassName('date')[0].classList.remove('sort-down');
			document.getElementsByClassName('date')[0].classList.add('sort-up');
		}

		const aa = a.date.split('.').reverse().join(),
			bb = b.date.split('.').reverse().join();
		return sort == 1 ?  aa < bb ? -1 : (aa > bb ? 1 : 0) :  aa > bb ? -1 : (aa > bb ? 1 : 0);
	});
	getData(sorterList);
}

function sorterType(list) {
	document.getElementsByClassName('date')[0].classList.remove('sort-up', 'sort-down');
	let sort = localStorage.getItem('sortType') ? localStorage.getItem('sortType') : 1;
	let sorterList = list.sort(function(a,b) {
		if (sort == 1) {
			localStorage.setItem('sortType', 0);
			document.getElementsByClassName('type')[0].classList.remove('sort-up');
			document.getElementsByClassName('type')[0].classList.add('sort-down');
		} else {
			localStorage.setItem('sortType', 1);
			document.getElementsByClassName('type')[0].classList.remove('sort-down');
			document.getElementsByClassName('type')[0].classList.add('sort-up');
		}
		return sort == 1 ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
	});

	getData(sorterList);
}