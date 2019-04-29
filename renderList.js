document.addEventListener('DOMContentLoaded', () => getData(operations));

const getData = operations => {
	let nws = [];
	document.getElementsByClassName('lyt')[0].innerHTML = renderList(operations);
	if (localStorage.getItem('title')) {
		nws = localStorage.getItem('title').split(',');
		nws.map(n => document.getElementById(`${n}`).classList.add('checked'));
	}
};

const renderList = operations => {
	let trn = [];
	let arr = operations;
	if (localStorage.getItem('trans')) {
		trn = localStorage.getItem('trans').split(',');
		arr = arr.filter(row => trn.indexOf(row.id.toString()) === -1);
	}
	return (arr.map(row => {
		return (row.type === 'Finance Transaction' ?
			`<div onclick='modalRender(${JSON.stringify(row)})' class='card' id='${row.id}'>
				<div class='info'>
					<h3>${row.type}</h3>
					<div>${renderTransaction(row.arExp, row.sum, row.currency)}</div>
					<div>${row.from}: ${row.description}</div>
					<div>${row.date}</div>
				</div>
			</div>` : row.type === 'News' ?
			`<div onclick='modalRender(${JSON.stringify(row)})' class='card' id='${row.id}'>
				<div class='info'>
					<h3 >${row.type}</h3>
					<div>${row.title}</div>
					<div>${row.date}</div>
				</div>
			</div>` : `
			<div class='card' id='${row.id}'>
				<div class='info'>
					<h3>${row.type}</h3>
					<div>${row.date}</div>
					${renderSubList(row)}
				</div>
			</div>
			`
		);
	}).join(''));

};

const renderSubList = row => {
		let sorter = Object.entries(row).filter(i => i[0] !== 'date' && i[0] !== 'type');
		return (sorter.map(i => `<div>${i[1]}</div>`).join(''));
};

const renderTransaction = (arExp, sum, currency) => {
	return (
		arExp ?
			`<div class='transaction-green'>+${sum + getCurrency(currency)}</div>`
			: `<div class='transaction-red'>-${sum + getCurrency(currency)}</div>`
	);
};

const getCurrency = currency => {
	if (currency === 'dollars')	{
		return '$';
	}
	if (currency === 'rub') {
		return '₽';
	}
};