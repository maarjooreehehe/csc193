﻿
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
			var barA = parseInt(($("#quantity").val() * $("#volume").val()) / $("#members").val(),10),
				barC = parseInt($("#aya").val(),10),
				barB = -(barA * (barC / 100)) + barA;


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


