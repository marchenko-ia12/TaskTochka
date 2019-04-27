document.addEventListener('DOMContentLoaded', () => getData());

const getData = () => {
	const list = new XMLHttpRequest();
	list.open('GET', 'operations.json', true);
	list.send();


	list.onreadystatechange = function() {
		if (list.readyState !== 4) {
			document.getElementsByClassName('content')[0].innerHTML = renderList(JSON.parse(list.responseText));
			return;
		}

		if (list.status !== 200) {
			alert(list.status + ': ' + list.statusText);
		}
	};
};

const renderList = list => {
	return (list.operations.map(row => {
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