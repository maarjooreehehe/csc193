
        document.addEventListener("deviceready", onDeviceReady, false);
          
                var db;
		
	      
	function onDeviceReady() {
		db = window.openDatabase("Database", "1.0", "Cordova Demo",2*1024*1024);
		db.transaction(createDB, errorCB);
		preloadBeverage();
		preloadRecords();
		viewBeverageRecords();
		getUnBurnCalDB();
		getBurntCalDB();
		loadPieChartValues();
		
		
	}

	function createDB(tx){
		
	
			tx.executeSql('CREATE TABLE IF NOT EXISTS BEVERAGE (id INTEGER PRIMARY KEY AUTOINCREMENT, beverageName, caloriePerVolume, calorieVolume)');
	 		tx.executeSql('CREATE TABLE IF NOT EXISTS RECORDS (id INTEGER PRIMARY KEY AUTOINCREMENT, unBurnCal, burntCal)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS CALORIES (id INTEGER PRIMARY KEY AUTOINCREMENT, beverageN, volume, totalCalories)');
	

	}

	function errorCB(err){
		alert("Error Processing SQL: "+ err.code );
	}
          
	
	function preloadBeverage(){
			db.transaction(function(tx){
				tx.executeSql('SELECT * FROM BEVERAGE',[], function(tx, result){
									if((result.rows.length)==0){
										tx.executeSql('INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES ("Regular Coke",139,330)');
										tx.executeSql('INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES ("Regular Sprite",99,330)');
										tx.executeSql('INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES ("San Miguel Light Beer",105,330)');
										tx.executeSql('INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES ("San Miguel Pale Pilsen",142,320)');
										tx.executeSql('INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES ("Cobra Energy Drink",195,350)');
									}//end of if
									
								});
			});
		
		
	}

	function preloadRecords(){
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM RECORDS', [], function(tx,result){
				if((result.rows.length)==0){
					tx.executeSql('INSERT INTO RECORDS(unBurnCal, burntCal) VALUES (0,0)');
				}
			});
		});
	}
      
	
	

       
          
	function sucessQueryDB(tx){
		tx.executeSql('SELECT * FROM BEVERAGE', [], renderList, errorCB);
	}


	function renderList(tx,results){
		var htmlstring='';
		var len = results.rows.length;
		//alert("Items saved:" +len);
		
		
		for(var i=0;i<len;i++){
				htmlstring+='<li><a href="#" onClick="inputCalorie(\''+results.rows.item(i).beverageName+'\',\''+results.rows.item(i).caloriePerVolume+'\',\''+results.rows.item(i).calorieVolume+'\')" > <p class="line1">' + results.rows.item(i).beverageName + ' </p> <p class="line2">'+results.rows.item(i).caloriePerVolume+' calories per '+results.rows.item(i).calorieVolume+' mL </p></a></li>'
             	 }

			      $('#resultList').html(htmlstring);
			      $('#resultList').listview('refresh');
		
              
	}
	

		function viewBeverageRecords(){
			db.transaction(sucessQueryDB, errorCB);
			$.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
			return false;
		}

       
		function addBeverage(){
		
			_beverage = $("#beverageName").val();
			_calorieVolumeUnit = $("#calorieVolumeUnit").val();
			_caloriePerVolume = $("#caloriePerVolume").val();

			if(_beverage=='' || _calorieVolumeUnit=='' || _caloriePerVolume==''){
				alert("Please fill-out all fields.");	
				$.mobile.changePage("#addBeverage",{reverse:false,transition:"slide"});
		            	return false;		
			}

			else{
		            db.transaction(addBeverageDB, errorCB);
		            $.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
		            return false;
			}
                }

		  
		function addBeverageDB(tx){

		var _beverage = $("#beverageName").val();
		var _calorieVolumeUnit = $("#calorieVolumeUnit").val();
		var _caloriePerVolume = $("#caloriePerVolume").val();
			
				if(_calorieVolumeUnit==2){
					var _calorieVolume = ($("#calorieVolume").val() * 1000);
				}
				else if(_calorieVolumeUnit==3){
					var _calorieVolume=($("#calorieVolume").val() * 30);
				}
				else{
					var _calorieVolume=$("#calorieVolume").val();
				}
			
		      	var sql ='INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES (?,?,?)';
		      	tx.executeSql(sql,[_beverage, _caloriePerVolume, _calorieVolume],sucessQueryDB,errorCB);
        	 }

		function calculateCalories2(){

			_members = $("#members2").val();
			
			_quantity = $("#quantity2").val();
			_volumeUnit = $("#volumeUnitNew").val();

			if(_members=='' || _quantity=='' || _volumeUnit==''){
				_beverageName = $("#beverage2").val();
				_caloriePerVolume = $("#caloriePerVolume2").val();
				_calorieVolume=$("#calorieVolume2").val();

				var _beverage = document.getElementById("beverage2");
				_beverage.value = _beverageName;

				var _cPV = document.getElementById("caloriePerVolume2");
				_cPV.value = _caloriePerVolume;

				var _cV = document.getElementById("calorieVolume2");
				_cV.value = _calorieVolume;

				alert("Please fill-out all fields.");
				$.mobile.changePage("#inputCalorie",{reverse:false,transition:"slide"});
				return false;	
				
			}

			else{
                    	db.transaction(calculateCal, errorCB);
                  	$.mobile.changePage("#totalCal",{reverse:false,transition:"slide"});
			return false;
			}
                }

		function inputCalorie(beverageName, cPV, cV){
			var _beverage = document.getElementById("beverage2");
			_beverage.value = beverageName;

			var _cPV = document.getElementById("caloriePerVolume2");
			_cPV.value = cPV;

			var _cV = document.getElementById("calorieVolume2");
			_cV.value = cV;

			$.mobile.changePage("#inputCalorie",{reverse:false,transition:"slide"});
			return false;
		}

		function calculateCal(tx){
			var _beverageName = $("#beverage2").val();
			var _caloriePerVolume = $("#caloriePerVolume2").val();
			var _calorieVolume=$("#calorieVolume2").val();
			
			var _members = $("#members2").val();
			
			var _quantity = $("#quantity2").val();
			var _volumeUnit = $("#volumeUnitNew").val();
			
			
			if(_volumeUnit==2){
				var _volume=( $("#volume2").val() * 1000);

			}
			else if(_volumeUnit==3){
				var _volume=($("#volume2").val()  * 30);
			}
			else{
				var _volume= $("#volume2").val();
			}

			
		
			var addedCalories = parseInt( ((_caloriePerVolume/_calorieVolume) * ((_quantity*_volume)/_members)),10 );
	
		
			//var bN = _beverageName;
			//var vL = _volume;
			var sqlTxt = 'INSERT INTO CALORIES(beverageN, volume, totalCalories) VALUES (?,?,?)';	
			tx.executeSql(sqlTxt, [_beverageName, _volume, addedCalories]);
			
			//for unBurnCalorie Record
			var uBC = getUnBurnCalDB() + addedCalories;
			var setUnBurnCalorieSql = "UPDATE RECORDS SET unBurnCal=? WHERE id='1'";
			tx.executeSql(setUnBurnCalorieSql,[uBC]);
			//alert(uBC);
			document.getElementById("totalCaloriesResult").innerHTML="Beverage: "+_beverageName+"<p/>"+
										"Calories: "+_caloriePerVolume+" calories per "+_calorieVolume+" mL<p/>"+
										"Members: " +_members+"<p/>"+
										"Quantity: "+_quantity+"<p/>"+
										"Volume: "+_volume+" mL <p/>"+
										"Added Calories: "+addedCalories;

         	}

	function adviceMe(){
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM RECORDS', [], function(tx,result){
				if((result.rows.length)!=0){
					var unBurn = getUnBurnCalDB();
					var burntCal = getBurntCalDB();

					var leftCal = parseInt( (unBurn - ((unBurn*20)/100)) ,10);
					var burnt = unBurn-leftCal;
					var water = Math.round(((((burnt)*1000)/33.5)/240));
					

					var newBurntCal = burntCal + burnt;
					var setBurntCalorieSql = "UPDATE RECORDS SET burntCal=?, unBurnCal=? WHERE id='1'";
					tx.executeSql(setBurntCalorieSql,[newBurntCal, leftCal]);
					tx.executeSql(setBurntCalorieSql,[newBurntCal, leftCal]);

					if(unBurn==0){
						var htmlString = 'You have 0 recorded calorie-intake.';
						$('#adviceResult').html(htmlString);
					}
					
					else if(water==0){
						var w = 1;
						var htmlString = 'Calorie-intake:' +unBurn+ '<br><br>You can lessen your calories by 20% by drinking atleast 1 glass of cold water.<br><br><a href="#" onClick="postMsg2(\''+unBurn+'\',\''+w+'\')" rel="external"><img src="img/facebook.png"  width="100" /></a> ';

					$('#adviceResult').html(htmlString);
					}
					else{
						var htmlString = 'Calorie-intake:' +unBurn+ '<br><br>You can lessen your calories by 20% by drinking '+water+' glass/glasses of cold water.<br><br><a href="#" onClick="postMsg2(\''+unBurn+'\',\''+water+'\')" rel="external"><img src="img/facebook.png"  width="100" /></a> ';

					$('#adviceResult').html(htmlString);
					}
					
				}
			});
		});
	}

	function clearCalorieRecords(){
		db.transaction(function(tx){
			tx.executeSql("UPDATE RECORDS SET unBurnCal=?, burntCal=? WHERE id='1'", [0,0]);
		});
	}
      


	

		var x;
		function getUnBurnCalDB(){
			
			db.transaction(
				function(tx){
					tx.executeSql('SELECT * FROM RECORDS',[], function(tx,result){
							var rec = result.rows.item(0);
							x = rec.unBurnCal;
					});
				}			
			);

			return x;
			
		}

		var y;
		function getBurntCalDB(){
			
			db.transaction(
				function(tx){
					tx.executeSql('SELECT * FROM RECORDS',[], function(tx,result){
							var rec = result.rows.item(0);
							y = rec.burntCal;
					});
				}			
			);

			return y;
			
		}

	
		function loadPieChartValues(){
			var _unBurnCalorie = document.getElementById("unBurnCalorie");
			var unBurnCal = getUnBurnCalDB();
			_unBurnCalorie.value = unBurnCal;

			var _burntCalorie = document.getElementById("burntCalorie");
			var burntCal = getBurntCalDB();
			_burntCalorie.value = burntCal;
		}

	


