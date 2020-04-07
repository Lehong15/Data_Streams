var express = require('express');  
var router = express.Router();  
var https = require('https');

/* GET characters page. */  
router.get('/', (req, res, next) => {
	let html = "";
	res.writeHead(200, {'Content-Type': 'application/json'});
	var path = '/cbdbapi/person.php?id=' + encodeURI(req.query.wd) + '&o=json';
	var options = {
		'host': 'cbdb.fas.harvard.edu',
		'port': '',
		'path': path,
		'method': 'get',
		'headers': {
			
		},
		'timeout': 10*1000
	};
	function fn1() {
		return new Promise((resolve, reject) => {
			let req = https.request(options, (res) => {
				res.on('data', (data) => {
					html += data;
				});
				res.on('end', () => {
					resolve(html);
				});
				res.on('error', () => {
					console.log('接口响应时发生错误!');
				});
			});
			req.setTimeout(options.timeout, () => {
				console.log("Timeout1");
				req.abort();
			});
			req.on('error', (e) => {
				console.log("请求接口数据时发生错误！" + e.message);
			});
			req.end();
		});
	};
	async function fn2() {
		var tempObj = {

		};
		var obj = [];
		var personId = '';//Id
		var name = '';//姓名
		var gender = '';//性别
		var dynasty = '';//朝代
		
		var birth = '';//出生
		var dynastyBirth = '';
		var eraBirth = '';
		var eraYearBirth = '';
		
		var death = '';//死亡
		var dynastyDeath = '';
		var eraDeath = '';
		var eraYearDeath = '';

		var basicInfoObj = {

		};

		var personAddresses = {

		};

		var personKinshipInfoObj = {

		};

		let html = await fn1();
		if (JSON.parse(html).Package.PersonAuthority.PersonInfo == '') {
			obj = [];
		} else {
			tempObj = JSON.parse(html).Package.PersonAuthority.PersonInfo.Person;

			if (Object.keys(tempObj)[0] != 0) {
				basicInfoObj = tempObj.BasicInfo;
				personAddresses = tempObj.PersonAddresses;
				personKinshipInfoObj = tempObj.PersonKinshipInfo;

				personId = basicInfoObj.PersonId;

				name = basicInfoObj.ChName;
				
				gender = basicInfoObj.Gender;
				if(gender === '0') {
					gender = '男';
				} else {
					gender = '女';
				}

				dynasty = basicInfoObj.Dynasty;
				if (dynasty == '未詳'||dynasty == '') {
					dynasty = '';
				}

				dynastyBirth = basicInfoObj.DynastyBirth;
				eraBirth = basicInfoObj.EraBirth;
				eraYearBirth = basicInfoObj.EraYearBirth;

				dynastyDeath = basicInfoObj.DynastyDeath;
				eraDeath = basicInfoObj.EraDeath;
				eraYearDeath = basicInfoObj.EraYearDeath;

				if (dynastyBirth == '未詳'||dynastyBirth == '') {
					dynastyBirth = '';
				} else {
					dynastyBirth = '(' + dynastyBirth;
				}

				if (eraBirth == '未詳'||eraBirth == '') {
					eraBirth = '';
				}

				if (eraYearBirth == '未詳'||eraYearBirth == '') {
					eraYearBirth = '';
				} else {
					eraYearBirth += '年)';
				}

				if (dynastyDeath == '未詳'||dynastyDeath == '') {
					dynastyDeath = '';
				} else {
					dynastyDeath = '(' + dynastyDeath; 
				}

				if (eraDeath == '未詳'||eraDeath == '') {
					eraDeath = '';
				}

				if (eraYearDeath == '未詳'||eraYearDeath == '') {
					eraYearDeath = '';
				} else {
					eraYearDeath += '年)';
				}

				if(basicInfoObj.YearBirth == '未詳'||basicInfoObj.YearBirth == '') {
					birth = dynastyBirth + eraBirth + eraYearBirth;
				} else {
					birth = '公元' + basicInfoObj.YearBirth + '年' + dynastyBirth + eraBirth + eraYearBirth;
				}

				if(basicInfoObj.YearDeath == '未詳'||basicInfoObj.YearDeath == '') {
					death = dynastyDeath + eraDeath + eraYearDeath;
				} else {
					death = '公元' + basicInfoObj.YearDeath + '年' + dynastyDeath + eraDeath + eraYearDeath;
				}

				var personAliases = tempObj.PersonAliases;
				var alias = [];
				if (personAliases != '') {
					var aliasObj = personAliases.Alias;

					if (Object.keys(aliasObj)[0] != 0) {
						alias.push(aliasObj)
					} else {
						alias = aliasObj;
					} 

				} else {
					alias = [];
				}
				var address = [];
				
				if (personAddresses != '') {
					if(Object.keys(personAddresses.Address)[0] != 0) {
						var addressObj = {

						};
						addressObj['address1'] = personAddresses.Address.AddrName;
						addressObj['address2'] = personAddresses.Address.belongs1_name;
						addressObj['address3'] = personAddresses.Address.belongs2_name;
						addressObj['address4'] = personAddresses.Address.belongs3_name;
						addressObj['address5'] = personAddresses.Address.belongs4_name;
						addressObj['address6'] = personAddresses.Address.belongs5_name;
						address.push(addressObj);
					} else {
						
						for (var j = 0; j < personAddresses.Address.length; j++) {
							var addressObj = {

							};
							addressObj['address1'] = personAddresses.Address[j].AddrName;
							addressObj['address2'] = personAddresses.Address[j].belongs1_name;
							addressObj['address3'] = personAddresses.Address[j].belongs2_name;
							addressObj['address4'] = personAddresses.Address[j].belongs3_name;
							addressObj['address5'] = personAddresses.Address[j].belongs4_name;
							addressObj['address6'] = personAddresses.Address[j].belongs5_name;
							address.push(addressObj);
						}
					}
					
				} else {
					address = [];
				}

				var relation = [];
				if (personKinshipInfoObj == '') {
					relation = [];
				} else {
					var kinship = personKinshipInfoObj.Kinship;
					if (Object.keys(kinship)[0] != 0) {
						relation.push({
							'kinPersonId': kinship.KinPersonId,
							'kinPersonName': kinship.KinPersonName,
							'kinRelName': kinship.KinRelName
						});
					} else {
						
						for (var k = 0; k < kinship.length; k++) {
							var relationObj = {

							};
							relationObj['kinPersonId'] = kinship[k].KinPersonId;
							relationObj['kinPersonName'] = kinship[k].KinPersonName;
							relationObj['kinRelName'] = kinship[k].KinRelName;
							relation.push(relationObj);
						}
					}
				}

				obj.push({
					'id': personId,
					'name': name,
					'gender': gender,
					'dynasty': dynasty,
					'birth': birth,
					'death': death,
					'alias': alias,
					'address': address,
					'relation': relation
				});
			} else {
				for (var i = 0; i < tempObj.length; i ++) {
					basicInfoObj = tempObj[i].BasicInfo;
					personAddresses = tempObj[i].PersonAddresses;

					personKinshipInfoObj = tempObj[i].PersonKinshipInfo;

					personId = basicInfoObj.PersonId;

					name = basicInfoObj.ChName;

					gender = basicInfoObj.Gender;
					if(gender === '0') {
						gender = '男';
					} else {
						gender = '女';
					}

					dynasty = basicInfoObj.Dynasty;
					if (dynasty == '未詳'||dynasty == '') {
						dynasty = '';
					}

					dynastyBirth = basicInfoObj.DynastyBirth;
					eraBirth = basicInfoObj.EraBirth;
					eraYearBirth = basicInfoObj.EraYearBirth;

					dynastyDeath = basicInfoObj.DynastyDeath;
					eraDeath = basicInfoObj.EraDeath;
					eraYearDeath = basicInfoObj.EraYearDeath;

					if (dynastyBirth == '未詳'||dynastyBirth == '') {
						dynastyBirth = '';
					} else {
						dynastyBirth = '(' + dynastyBirth;
					}

					if (eraBirth == '未詳'||eraBirth == '') {
						eraBirth = '';
					}

					if (eraYearBirth == '未詳'||eraYearBirth == '') {
						eraYearBirth = '';
					} else {
						eraYearBirth += '年)';
					}

					if (dynastyDeath == '未詳'||dynastyDeath == '') {
						dynastyDeath = '';
					} else {
						dynastyDeath = '(' + dynastyDeath; 
					}

					if (eraDeath == '未詳'||eraDeath == '') {
						eraDeath = '';
					}

					if (eraYearDeath == '未詳'||eraYearDeath == '') {
						eraYearDeath = '';
					} else {
						eraYearDeath += '年)';
					}

					if(basicInfoObj.YearBirth == '未詳'||basicInfoObj.YearBirth == '') {
						birth = dynastyBirth + eraBirth + eraYearBirth;
					} else {
						birth = '公元' + basicInfoObj.YearBirth + '年' + dynastyBirth + eraBirth + eraYearBirth;
					}

					if(basicInfoObj.YearDeath == '未詳'||basicInfoObj.YearDeath == '') {
						death = dynastyDeath + eraDeath + eraYearDeath;
					} else {
						death = '公元' + basicInfoObj.YearDeath + '年' + dynastyDeath + eraDeath + eraYearDeath;
					}

					var personAliases = tempObj[i].PersonAliases;
					var alias = [];
					if (personAliases != '') {
						var aliasObj = personAliases.Alias;

						if (Object.keys(aliasObj)[0] != 0) {
							alias.push(aliasObj)
						} else {
							alias = aliasObj;
						} 

					} else {
						alias = [];
					}

					var address = [];

					if (personAddresses != '') {
						if(Object.keys(personAddresses.Address)[0] != 0) {
							var addressObj = {

							};
							addressObj['address1'] = personAddresses.Address.AddrName;
							addressObj['address2'] = personAddresses.Address.belongs1_name;
							addressObj['address3'] = personAddresses.Address.belongs2_name;
							addressObj['address4'] = personAddresses.Address.belongs3_name;
							addressObj['address5'] = personAddresses.Address.belongs4_name;
							addressObj['address6'] = personAddresses.Address.belongs5_name;
							address.push(addressObj);
						} else {
							
							for (var j = 0; j < personAddresses.Address.length; j++) {
								var addressObj = {

								};
								addressObj['address1'] = personAddresses.Address[j].AddrName;
								addressObj['address2'] = personAddresses.Address[j].belongs1_name;
								addressObj['address3'] = personAddresses.Address[j].belongs2_name;
								addressObj['address4'] = personAddresses.Address[j].belongs3_name;
								addressObj['address5'] = personAddresses.Address[j].belongs4_name;
								addressObj['address6'] = personAddresses.Address[j].belongs5_name;
								address.push(addressObj);
							}
						}
					}

					var relation = [];
					if (personKinshipInfoObj == '') {
						relation = [];
					} else {
						var kinship = personKinshipInfoObj.Kinship;
						if (Object.keys(kinship)[0] != 0) {
							relation.push({
								'kinPersonId': kinship.KinPersonId,
								'kinPersonName': kinship.KinPersonName,
								'kinRelName': kinship.KinRelName
							});
						} else {
							
							for (var k = 0; k < kinship.length; k++) {
								var relationObj = {

								};
								relationObj['kinPersonId'] = kinship[k].KinPersonId;
								relationObj['kinPersonName'] = kinship[k].KinPersonName;
								relationObj['kinRelName'] = kinship[k].KinRelName;
								relation.push(relationObj);
							}
						}
					}
					obj.push({
						'id': personId,
						'name': name,
						'gender': gender,
						'dynasty': dynasty,
						'birth': birth,
						'death': death,
						'alias': alias,
						'address': address,
						'relation': relation
					});
				}
			}

		}
		res.write(JSON.stringify(obj));
		res.end();
	};
	fn2();
});  
module.exports = router;  