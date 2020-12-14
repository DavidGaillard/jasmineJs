function calculate(inputV) {
	const expression = /\+|\-|\*|\//;
	const numbers = inputV.split(expression);
	
	const numberA = parseInt(numbers[0]);
	const numberB = parseInt(numbers[1]);
	const operation = inputV.match(expression);

	if (Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null) {
		updateResult('Operation not recognised');
		return;
	}

	const cal = new Calculator();
	cal.add(numberA);

	let result;

	switch(operation[0]) {
		case '+':
			result = cal.add(numberB);
			break;
		case '-':
			result = cal.subtract(numberB);
			break;
		case '*':
			result = cal.multiply(numberB);
			break;
		case '/':
			result = cal.divide(numberB);
			break;

	}

	updateResult(result);
}

function updateResult(result) {
	document.getElementById('result').innerText = result;
}

function showVersion() {
	const calculator = new Calculator();
	const element = document.getElementById('version');
	calculator.version
	.then((version) => {
		element.innerText = version;
	})
	.catch(function (err) {
		element.innerText = 'unknow'
	});
}