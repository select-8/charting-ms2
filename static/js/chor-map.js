'use strict'

var numberFormat = d3.format(".2f");
var euMap = dc.geoChoroplethChart('.map-wrap');
// var sexPieChart  = dc.pieChart('.pie-chart');

d3.csv("data/mydata.csv", function (data) {
    var data = crossfilter(data);

    var ccgs = data.dimension(function (d) {
        return d['country_code'];
    });

    var ccgMetric = ccgs.group();

    var json = d3.json("data/NUTS_RG_60M_2016_3857_LEVL_0.geojson", function (map) {
        euMap.width(800)
            .height(800)
            .projection(d3.geo.mercator()
                .scale(26778)
                .translate([8227, 3207]))
            .dimension(ccgs)
            .group(ccgMetric)
            .colors(d3.scale.quantize().range(["#7cbd30", "#0066cc", "#ee2e11"]))
            .colorDomain([0, 200])
            // .colorCalculator(function (d) {
            //     return d ? euMap.colors()(d) : '#ccc';
            // })
            .overlayGeoJson(json, "CNTR_CODE", function (d) {
                return d.properties.country_code;
            });

        dc.renderAll();
    });
});