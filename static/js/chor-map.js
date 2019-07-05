'use strict'

var numberFormat = d3.format(".2f");
var euMap = dc.geoChoroplethChart('.map-wrap');

d3.csv("data/mydata.csv", function (data) {
    var data = crossfilter(data);

    var ccgs = data.dimension(function (d) {
        return d['country_code'];
    });

    var ccgMetric = ccgs.group();

    var w = 1400;
    var h = 700;

    var geojson = d3.json("data/NUTS_RG_60M_2016_3857_LEVL_0.geojson", function (d) {
        euMap.width(1400)
            .height(700)
            .projection(d3.geo.mercator()
                .scale(10000)
                .translate([w/2, h/2]))
            .dimension(ccgs)
            .group(ccgMetric)
            .colors(d3.scale.linear().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
            .colorDomain([0, 200])
            // .colorCalculator(function (d) {
            //     return d ? euMap.colors()(d)
            // })
            // .colorAccessor(function (d) { return colors(d); })
            .overlayGeoJson(geojson.features, "CNTR_CODE", function (d) {
                return d.properties.country_code
            })
            ;
        dc.renderAll();
    });
});





