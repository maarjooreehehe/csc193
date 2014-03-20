
               document.addEventListener("deviceready", onDeviceReady, false);
          
                var db;
 
                
                function onDeviceReady() {
 
                    db = window.openDatabase("Database", "1.0", "Cordova Demo",2*1024*1024);
                    db.transaction(createDB, errorCB, successCB);
                    
                }
                
                function createDB(tx){
		 tx.executeSql('CREATE TABLE IF NOT EXISTS BEVERAGE (beverageName, caloriePerVolume, calorieVolume)');
                }

          function errorCB(err){
              alert("Error Processing SQL: "+ err.code );
          }
          
          function successCB(){
             // alert("Database Installation Successfull");
             
          }
         function addBeverageDB(tx){
            
			var _beverage = $("#beverageName").val();

			var _calorieVolumeUnit = $("#calorieVolumeUnit").val();
			var _caloriePerVolume = $("#caloriePerVolume").val();
			
				if(_calorieVolumeUnit==2){
					var _calorieVolume = ($("#calorieVolume").val() * 1000);
				}
				else if(calorieVolumeUnit==3){
					var _calorieVolume=($("#calorieVolume").val() * 30);
				}
				else{
					var _calorieVolume=$("#calorieVolume").val();
				}
			
		      	var sql ='INSERT INTO BEVERAGE(beverageName, caloriePerVolume, calorieVolume) VALUES (?,?,?)';
		      	tx.executeSql(sql,[_beverage, _caloriePerVolume, _calorieVolume],sucessQueryDB,errorCB);
         	}
          
          function sucessQueryDB(tx){
             
              tx.executeSql('SELECT * FROM BEVERAGE', [], renderList, errorCB);
              
          }
          function renderList(tx,results){
              		var htmlstring='';
            		var len = results.rows.length;
            		//alert("Items saved:" +len);
              		for(var i=0;i<len;i++){
				htmlstring+='<li><a href="#" onClick="inputCalorie(\''+results.rows.item(i).beverageName+'\',\''+results.rows.item(i).caloriePerVolume+'\',\''+results.rows.item(i).calorieVolume+'\')" > Name:' + results.rows.item(i).beverageName + '<br/> '+results.rows.item(i).caloriePerVolume+' calories per '+results.rows.item(i).calorieVolume+' mL</a></li>'
             	 }

			      $('#resultList').html(htmlstring);
			      $('#resultList').listview('refresh');
              
         	 }
	
		function viewBeverageRecords(){
			db.transaction(sucessQueryDB, errorCB);
			$.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
			return false;
		}

          
          
	//added js
		function addBeverage(){
                    db.transaction(addBeverageDB, errorCB);
                    $.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
                    return false;
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

		function calculateCalories2(){
			_beverageName = $("#beverage2").val();
			_caloriePerVolume = $("#caloriePerVolume2").val();
			_calorieVolume=$("#calorieVolume2").val();
			
			_members = $("#members2").val();
			
			_quantity = $("#quantity2").val();
			_volumeUnit = $("#volumeUnitNew").val();
			
			
			if(_volumeUnit==2){
				_volume=( $("#volume2").val() * 1000);

			}
			else if(_volumeUnit==3){
				_volume=($("#volume2").val()  * 30);
			}
			else{
				_volume= $("#volume2").val();
			}

		
			totalCalories = parseInt( ((_caloriePerVolume/_calorieVolume) * ((_quantity*_volume)/_members)),10 );
	
			burntCalorie = parseInt( (totalCalories - ((totalCalories*20)/100)) ,10);
			water = Math.round(((((totalCalories-burntCalorie)*1000)/33.5)/240));
			
			
			//local storage
			var key = totalCalories;
			var value = burntCalorie;
			localStorage.setItem(key, value);

			document.getElementById("totalCaloriesResult").innerHTML="<h1>Beverage: </h1>"+_beverageName+"<br/>"+
										"<h1>Calories Per Volume: </h1>"+_caloriePerVolume+" calories per "+_calorieVolume+" mL"+
										"<h1>Members: </h1>" +_members+"<br/>"+
										"<h1>Quantity: </h1>"+_quantity+"<br/>"+
										"<h1>Volume: </h1>"+_volume+" mL <br/>"+
										"<h1>Total Calories: </h1>"+totalCalories;

			document.getElementById("adviceResult").innerHTML="<p>You can lessen your calorie-intake by 20% ("+burntCalorie+") by drinking "+water+" glasses of cold water</p>";
		
			$.mobile.changePage("#totalCal",{reverse:false,transition:"slide"});
			return false;
         	}



