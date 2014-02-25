
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel).on(
		"pageinit", RocknCoder.hideAddressBar);
} ();

RocknCoder.Pages.manageBarChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshBarChart").click(function(){
				updateChart();
			});
		},
		pagehide = function () {
			$("#refreshBarChart").unbind('click');
		},
		updateChart= function(){
		
		members = $("#members").val();
			quantity = $("#quantity").val();
			volumeUnit = $("#volumeUnit").val();
			calorieVolumeUnit = $("#calorieVolumeUnit").val();
			caloriePerVolume = $("#caloriePerVolume").val();
			percentage = $("#percentage").val();
			
			if(volumeUnit==2){
				var volume=( $("#volume").val() * 1000);
			}
			else if(volumeUnit==3){
				volume=($("#volume").val()  * 30);
			}
			else{
				volume= $("#volume").val();
				
			}
			
			if(calorieVolumeUnit==2){
				calorieMl = ($("#calorieMl").val() * 1000);
			}
			else if(calorieVolumeUnit==3){
				calorieMl=($("#calorieMl").val() * 30);
			}
			else{
				calorieMl=$("#calorieMl").val();
			}
			
			totalCalorie = parseInt( ((caloriePerVolume/calorieMl) * ((quantity*volume)/members)),10 );
			burntCalorie = parseInt( (totalCalorie - ((totalCalorie*percentage)/100)) ,10);
			
			var barA = parseInt( ((caloriePerVolume/calorieMl) * ((quantity*volume)/members)),10 ),
				barB = parseInt( (totalCalorie - ((totalCalorie*percentage)/100)) ,10);


			showChart(barA, barB);
		},
		showChart = function(barA, barB){
			$.jqplot('barChart', [[[barA,"Old Calorie"], [barB,"New Calorie"]]], {
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					shadowAngle: 135,
					rendererOptions: {
						barDirection: 'horizontal'
					},
					pointLabels: {show: true, formatString: '%d'}
				},
				axes: {
					yaxis: {
						renderer: $.jqplot.CategoryAxisRenderer
					}
				}
			}).replot({clear: true, resetAxes:true});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();


