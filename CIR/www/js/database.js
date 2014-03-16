
               document.addEventListener("deviceready", onDeviceReady, false);
          
                var db;
 
                
                function onDeviceReady() {
 
                    db = window.openDatabase("Database", "1.0", "Cordova Demo",2*1024*1024);
                    db.transaction(createDB, errorCB, successCB);
                    
                }
                
		
                function createDB(tx){
		//beverage table
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (beverage, caloriePerVolume, calorieVolume)');
                }

          function errorCB(err){
              alert("Error Processing SQL: "+ err.code );
          }
          
          function successCB(){
            //  alert("Database Installation.. Successfull");
             
          }
    
		
		function addBeverage(){
			db.transaction(addBeverageDB, errorCB);
			$.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
			return false;
		}
		
		function addBeverageDB(tx){
            
			var _beverage = $("[name='beverageName']").val();

			var _calorieVolumeUnit = $("[name='calorieVolumeUnit']").val();
			var _caloriePerVolume = $("[name='caloriePerVolume']").val();
			
				if(_calorieVolumeUnit==2){
					var _calorieVolume = ($("[name='calorieVolume']").val() * 1000);
				}
				else if(calorieVolumeUnit==3){
					var _calorieVolume=($("[name='calorieVolume']").val() * 30);
				}
				else{
					var _calorieVolume=$("[name='calorieVolume']").val();
				}
			
		      	var sql ='INSERT INTO DEMO (beverage, caloriePerVolume, calorieVolume) VALUES (?,?,?)';
		      	tx.executeSql(sql,[_beverage, _caloriePerVolume, _calorieVolume],sucessQueryDB,errorCB);
         	}

		function sucessQueryDB(tx){
              		tx.executeSql('SELECT * FROM DEMO', [], renderList, errorCB);
              	}
          
		function renderList(tx,results){
              		var htmlstring='';
            		var len = results.rows.length;
            		//alert("Items saved:" +len);
              		for(var i=0;i<len;i++){
				htmlstring+='<li><a href="#"> Name:' + results.rows.item(i).beverage + '<br/> '+results.rows.item(i).caloriePerVolume+' calories per '+results.rows.item(i).calorieVolume+' mL</a></li>'
             	 }

			      $('#resultList').html(htmlstring);
			      $('#resultList').listview('refresh');
              
         	 }
	
		function viewBeverageRecords(){
			db.transaction(sucessQueryDB, errorCB);
			$.mobile.changePage("#beverageList",{reverse:false,transition:"slide"});
			return false;
		}

	


