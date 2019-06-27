queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
    })

    show_op_selector(ndx);
    show_op_pie(ndx);
    show_average_salary_by_country(ndx);
    show_bar_chart_countries(ndx);

    dc.renderAll();
    // console.log(opData);
}


function show_op_selector(ndx) {
    var dim = ndx.dimension(dc.pluck('logical_op'));
    var group = dim.group();

    dc.selectMenu("#logical-op-selector")
        .dimension(dim)
        .group(group);
}

function show_op_pie(ndx) {
    var dim = ndx.dimension(dc.pluck('discipline'));
    var group = dim.group();

    dc.pieChart('#dis-pie')
        .height(330)
        .radius(360)
        .transitionDuration(1500)
        .dimension(dim)
        .group(group);
}

function show_average_salary_by_country(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));
    // var group = dim.group().reduceSum(dc.pluck('salary'))

    // console.log(group.all())

    function add_item(p, v) {
        p.count++;
        p.total += v.salary;
        p.average = p.total / p.count;
        return p;
    }

    function remove_item(p, v) {
        p.count--;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.total -= v.salary;
            p.average = p.total / p.count;
        }
        return p;
    }

    function initialise() {
        return {
            count: 0,
            total: 0,
            average: 0
        };
    }

    var averageSalaryByLocOp = dim.group().reduce(add_item, remove_item, initialise);

    // var averageSalary = averageSalaryByLocOp.all()

    // var newVar = averageSalary[0].value
    // console.log(newVar);

    dc.rowChart('#average-salary')
        .height(420)
        .width(620)
        .margins({
            top: 5,
            left: 10,
            right: 10,
            bottom: 20
        })
        .elasticX(true)
        .dimension(dim)
        .group(averageSalaryByLocOp)
        .valueAccessor(function (d) {
            // console.log(d);
            return d.value.average;
        })
        .colors(d3.scale.category10())
        // .label(function (d){
        //     return d.key.split(".")[2];
        //  })
        // .elasticX(true)
        .xAxis().ticks(5);
}

function show_bar_chart_countries(ndx) {
    var dim = ndx.dimension(dc.pluck('discipline'));
    var group = dim.group();
    // var group = dim.group().reduceCount(dc.pluck('country'));

    var bargraph = dc.barChart("#country-chart");
    bargraph
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
        .xAxisLabel("Country")
        .yAxis().ticks(3);

    bargraph.renderlet(function (chart) {
        bargraph.selectAll("g.x text")
            .style("text-anchor", "start")
            .attr('dx', '5')
            .attr('dy', '-5')
            .attr('transform', "rotate(-90)");
    });

}