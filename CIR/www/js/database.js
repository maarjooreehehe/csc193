
               document.addEventListener("deviceready", onDeviceReady, false);
          
                var db;
 
                
                function onDeviceReady() {
 
                    db = window.openDatabase("Database", "1.0", "Cordova Demo",2*1024*1024);
                    db.transaction(createDB, errorCB, successCB);
                    
                }
                
                function createDB(tx){
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (beverage, members, quantity, volume, volumeUnit, caloriePerVolume, calorie, calorieVolumeUnit, totalCalories)');
                }

          function errorCB(err){
              alert("Error Processing SQL: "+ err.code );
          }
          
          function successCB(){
              alert("Database Installation Successfull");
             
          }
          function addCalorieDB(tx){
            
		var _beverage = $("[name='beverageName']").val();
		var _members = $("[name='members']").val();
		var _quantity = $("[name='quantity']").val();
		var _volumeUnit = $("[name='volumeUnit']").val();
		var _calorieVolumeUnit = $("[name='calorieVolumeUnit']").val();
		var _caloriePerVolume = $("[name='caloriePerVolume']").val();
			
			if(_volumeUnit==2){
				var _volume=( $("[name='volume']").val() * 1000);
			}
			else if(volumeUnit==3){
				var _volume=($("[name='volume']").val()  * 30);
			}
			else{
				var _volume= $("[name='volume']").val();
				
			}
			
			if(_calorieVolumeUnit==2){
				var _calorie = ($("[name='calorie']").val() * 1000);
			}
			else if(calorieVolumeUnit==3){
				var _calorie=($("[name='calorie']").val() * 30);
			}
			else{
				var _calorie=$("[name='calorie']").val();
			}
			
			var _totalCalories = parseInt( ((_caloriePerVolume/_calorie) * ((_quantity*_volume)/_members)),10 );
			//burntCalorie = parseInt( (totalCalorie - ((totalCalorie*percentage)/100)) ,10);
			//water = Math.round(((((totalCalorie-burntCalorie)*1000)/33.5)/240));
			
	
              var sql ='INSERT INTO DEMO (beverage, members, quantity, volume, volumeUnit, caloriePerVolume, calorie, calorieVolumeUnit, totalCalories) VALUES (?,?,?,?,?,?,?,?,?)';
              tx.executeSql(sql,[_beverage, _members, _quantity, _volume, _volumeUnit, _caloriePerVolume, _calorie, _calorieVolumeUnit, _totalCalories],sucessQueryDB,errorCB);
          }
          
          function sucessQueryDB(tx){
             
              tx.executeSql('SELECT * FROM DEMO', [], renderList, errorCB);
              
          }
          function renderList(tx,results){
              var htmlstring='';
              var len = results.rows.length;
              alert("Items saved:" +len);
              for(var i=0;i<len;i++){
                  htmlstring+='<li> Name:' + results.rows.item(i).beverage + '<br/> TotalCalories:' + results.rows.item(i).totalCalories  + '</li>'
              }
              $('#resultList').html(htmlstring);
              $('#resultList').listview('refresh');
              
          }
          
          
          
	//added js
		function addCalorie(){
                    db.transaction(addCalorieDB, errorCB);
                    $.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
                    return false;
                }



