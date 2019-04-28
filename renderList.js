document.addEventListener('DOMContentLoaded', () => getData());

const getData = () => {
	document.getElementsByClassName('content')[0].innerHTML = renderList();
};

const renderList = () => {
	let trn = [];
	let arr = operations;
	if (localStorage.getItem('trans')) {
		trn = localStorage.getItem('trans').split(',');
		arr = arr.filter(row => trn.indexOf(row.id.toString()) === -1);
	}
	return (arr.map(row => {
		return (row.type === 'Finance Transaction' ?
			`<tr id='${row.id}'>
				<td>${row.date}</td>
				<td class='clickable' onclick='modalRender(${JSON.stringify(row)})'>${row.type}</td>
				<td>${renderTransaction(row.arExp, row.sum, row.currency)}</td>
				<td>${row.from}: ${row.description}</td>
			</tr>` : row.type === 'News' ?
			`<tr id='${row.id}'>
				<td>${row.date}</td>
				<td>${row.type}</td>
				<td class='clickable' onclick='modalRender(${JSON.stringify(row)})'>${row.title}</td>
				<td></td>
			</tr>` : `
			<tr id='${row.id}'>
				<td>${row.date}</td>
				<td>${row.type}</td>
				${renderSubList(row)}
			</tr>
			`
		);
	}).join(''));
};

const renderSubList = row => {
		let sorter = Object.entries(row).filter(i => i[0] !== 'date' && i[0] !== 'type');
		return (sorter.map(i => `<td>${i[1]}</td>`).join(''));
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