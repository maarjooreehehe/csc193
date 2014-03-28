
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


RocknCoder.Pages.managePieChart = function () {
	var pageshow = function () {
			updateChart();
			

			$("#adviceLink").click(function(){
				updateChart();
			
				
			});
		},
		pagehide = function () {
			$("#adviceLink").unbind('click');
		},
		updateChart= function(){
			var sliceA = parseInt($("#unBurnCalorie").val(),10),
				sliceB = parseInt($("#burntCalorie").val(),10);
				
			showChart(sliceA, sliceB);
		},
		showChart = function(sliceA, sliceB){
			var plot2 = $.jqplot('pieChart', [[['a',sliceA],['b',sliceB]]], {
					grid: {
						drawBorder: false,
						shadow: false
					},
					seriesDefaults:{
						renderer:$.jqplot.PieRenderer,
						trendline:{ show: true }
					},
				legend:{ show: false }
			});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();


