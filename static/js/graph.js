queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    show_lo_op_selector(ndx);
    show_discipline(ndx);
    

    // show_gender_balance(ndx);
    // show_average_salary(ndx);
    // show_rank_distribution(ndx);
    // show_service_to_salary_correlation(ndx);
    // show_phd_to_salary_correlation(ndx);

    dc.renderAll();
}

function show_lo_op_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('logical_op'));
    var group = dim.group();

    dc.selectMenu("#logical-op-selector")
        .dimension(dim)
        .group(group);
}

function show_discipline(ndx) {
    var dim = ndx.dimension(dc.pluck('discipline'));
    var group = dim.group();

    dc.barChart("#lo-per-discipline")
        .width(550)
        .height(250)
        .margins({
            top: 10,
            right: 50,
            bottom: 30,
            left: 50
        })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Discipline")
        .yAxis().ticks(10);
}

