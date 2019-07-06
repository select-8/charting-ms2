queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

var width;
$(window).on('load', function () {
    width = $(window).width();
    console.log(width);
});


function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
        d.time_as = parseInt(d.time_as);
        d.hours_per_week = parseInt(d.hours_per_week);
    })

    //Functions are declared 
    show_percentage_logical(ndx, "AND", "#percent-of-and");
    show_percentage_logical(ndx, "OR", "#percent-of-or");
    show_percentage_logical(ndx, "NOT", "#percent-of-not");
    country_rowchart(ndx);
    discipline_pie(ndx);
    discipline_salary_bargraph(ndx);
    show_count_of_choices_by_level(ndx);
    show_languages_over_time(ndx);
    remove_empty_bins();

    dc.renderAll();

    //https://github.com/dc-js/dc.js/wiki/FAQ#remove-empty-bins

    function remove_empty_bins(source_group) {
        return {
            all: function () {
                return source_group.all().filter(function (d) {
                    return d.value != 0;
                });
            }
        };
    };

    function show_percentage_logical(ndx, logical, element) {

        let lgop_dim = ndx.dimension(function (d) {
            return d.logical_op;
        });

        let lgop_group = lgop_dim.groupAll().reduce(
            function (p, v) {
                if (v.logical_op === logical)
                    p.count++;
                return p;
            },
            function (p, v) {
                if (v.logical_op === logical)
                    p.count--;
                return p;
            },
            function () {
                return {
                    count: 0
                };
            }
        );

        let numDis = dc.numberDisplay(element);
        numDis
            .formatNumber(d3.format(".2%"))
            .valueAccessor(function (p, d) {
                if (p.count == 0) {
                    return 0;
                } else {
                    let totalCount = lgop_dim.groupAll().value();
                    return (p.count / totalCount);
                }
            })
            .dimension(lgop_dim)
            .group(lgop_group);
    }

    function country_rowchart(ndx) {
        let country_dim = ndx.dimension(dc.pluck('country'));
        let country_group = country_dim.group();
        let filtered_group = remove_empty_bins(country_group);

        let rowchart = dc.rowChart('#country-chart')
        rowchart
            .height(520)
            .width(350)
            .margins({
                top: 20,
                left: 5,
                right: 10,
                bottom: 20
            })
            .elasticX(true)
            .dimension(country_dim)
            .group(filtered_group)
            .colors(d3.scale.category20())
            .xAxis().ticks(10);
    }

    function discipline_pie(ndx) {
        let dis_dim = ndx.dimension(dc.pluck('database'));
        let dis_group = dis_dim.group().reduceCount();
        let dis_first_bargraph = dc.pieChart("#database-pie");
        dis_first_bargraph
            .height(330)
            .radius(140)
            .transitionDuration(1500)
            .dimension(dis_dim)
            .group(dis_group)
            .colors(d3.scale.ordinal().range(
                [ '#1f78b4', '#b2df8a', '#cab2d6', '#bc80bd']))
            .data(function (group) {
                return dis_group.top(4);
            })
            .legend(dc.legend().x(0).y(0).itemHeight(10).gap(5))
            .on('pretransition', function (chart) {
                chart.selectAll('text.pie-slice').text(function (d) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                });
            });
    };


    function discipline_salary_bargraph(ndx) {

        let dis_sal_dim = ndx.dimension(dc.pluck('discipline'));

        let salary_group = dis_sal_dim.group().reduce(

            function (p, v) {
                p.count++;
                p.total += v.salary;
                p.average = p.total / p.count;
                return p;
            },
            function (p, v) {
                p.count--;
                if (p.count == 0) {
                    p.total = 0;
                    p.average = 0;
                } else {
                    p.total -= v.salary;
                    p.average = p.total / p.count;
                }
                return p;
            },
            function () {
                return {
                    count: 0,
                    total: 0,
                    average: 0
                };
            }
        );

        let dis_bargraph = dc.barChart("#discipline-bar");
        dis_bargraph
            .width(310)
            .height(530)
            .margins({
                top: 50,
                right: 10,
                bottom: 50,
                left: 50
            })
            .dimension(dis_sal_dim)
            .group(salary_group)
            .valueAccessor(function (d) {
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xAxisLabel("Main Language Practised")
            .yAxisLabel("Average Salary")
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .yAxis().ticks(10);
    }

    function show_count_of_choices_by_level(ndx) {
        let level_dim = ndx.dimension(function (d) {
            return d.level;
        });

        let groupByFalse = level_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "FALSE") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "FALSE") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );
        let groupByTrue = level_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "TRUE") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "TRUE") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );

        let stackedChart = dc.barChart("#stacked-choice");
        stackedChart
            .dimension(level_dim)
            .group(groupByFalse, "Male")
            .stack(groupByTrue, "Female")
            .width(300)
            .height(530)
            .margins({
                top: 50,
                right: 60,
                bottom: 50,
                left: 35
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel('Total Respondants')
            .xAxisLabel('Employment Grade')
            .elasticY(true)
            .legend(dc.legend().x(140).y(55).itemHeight(10).gap(5))
    }

    function show_languages_over_time(ndx) {
        let hours_per_dim = ndx.dimension(dc.pluck('hours_per_week'));
        let minHrs = hours_per_dim.bottom(1)[0].hours_per_week;
        let maxHrs = hours_per_dim.top(1)[0].hours_per_week;

        let gameHs = hours_per_dim.group().reduceSum(function (d) {
            if (d.discipline === 'HTML/CSS' && d.play_games === 'yes') {
                return 1
            } else {
                return 0;
            }
        });

        let gameJs = hours_per_dim.group().reduceSum(function (d) {
            if (d.discipline === 'JavaScript' && d.play_games === 'yes') {
                return 1
            } else {
                return 0;
            }
        });

        let gamePy = hours_per_dim.group().reduceSum(function (d) {
            if (d.discipline === 'Python' && d.play_games === 'yes') {
                return 1
            } else {
                return 0;
            }
        });

        let gameSq = hours_per_dim.group().reduceSum(function (d) {
            if (d.discipline === 'SQL' && d.play_games === 'yes') {
                return 1
            } else {
                return 0;
            }
        });

        let compositeChart = dc.compositeChart('#composite-chart');
        compositeChart
            .width(width)
            .height(400)
            .margins({
                top: 30,
                right: 50,
                bottom: 50,
                left: 60
            })
            .dimension(hours_per_dim)
            .x(d3.scale.linear().domain([minHrs, maxHrs]))
            .yAxisLabel("Number Who Play Computer Games")
            .xAxisLabel("Average Hours Worked Per Week")
            .legend(dc.legend().x(130).y(30).itemHeight(13).gap(5))
            .compose([
                dc.lineChart(compositeChart)
                .colors('blue')
                .dashStyle([2, 2])
                .group(gameHs, 'HTML/CSS'),

                dc.lineChart(compositeChart)
                .colors('green')
                .dashStyle([2, 2])
                .group(gameJs, 'JavaScript'),

                dc.lineChart(compositeChart)
                .colors('red')
                .dashStyle([2, 2])
                .group(gamePy, 'Python'),

                dc.lineChart(compositeChart)
                .colors('orange')
                .dashStyle([2, 2])
                .group(gameSq, 'SQL')
            ])
            .transitionDuration(500)
            .elasticY(true)
            .brushOn(false);


    }


}