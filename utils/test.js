var obj = {
	'name': '李二红',
	'age': 22,
	'sex': 'male'
};

for (var o in obj) {
	console.log(o + obj[o]);
}