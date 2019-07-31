let data = {
	num: 1
};
Object.defineProperty(data, 'num', {
	value: value,
	set: function (newVal) {
		document.getElementById('app').value = newVal;
	}
});
input.addEventListener('input', function () {
	data.num = 2;
});
