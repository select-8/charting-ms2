
## Project Overview

The project presented [here](https://select-8.github.io/charting-ms2/#) consists of a series of interactive graphs and charts. They are rendered in SVG by D3.js, charted using the DC.js charting library and made multidimentially interactive by the crossfilter.js JavaScript library.

### The Data

is made up but based on the results of the [Stack Overflow developers survey 2018](https://insights.stackoverflow.com/survey/2018).

#### Typography

I used three fonts in this project:
 - **Raleway**, a nice sans serif for headings and titles
 - **Cutive**, a monospace which provides natural spacing to the chart labels
 - **Lato**, a more round edged sans serif for the number display

#### The Charts

The page consists of five charts which use the Crossfilter JavaScript library to give a multidimensional experience for the user. Each elements of the charts can be clicked to filter data in the other charts. With the way I have structured the visualisations you can, for example, see how popular C++ is across the EU, or equally you can see what the most popular programming language is in Germany. You can see if any of the EU 28 bucks the trend in having less female developers in senior roles.
 1. Country Chart: Simple count of respondents from each county. This data is slightly weighted over two tiers in terms of population but is randomly assigned otherwise. This chart is mainly informative when filtered by, or used to filter, the other charts. The chart title should reflect this usage.
 2. Average Salary - Top 10 Languages: Here we can see salary levels in relation to main language practised. The salary data is totally random in relation to programming language. This reflects real world data. A custom reduction is used to calculate the averages.
 3. Gender Across Employment Grades: This data is weighted for gender at the senior level in order to reflect real world data. As with the salary data it is most tells the best story when filtered from the country chart. The values read from the data as "TRUE" and "FALSE".
 4. Top 4 Most Popular Database Systems: Reflects data from the Stack Overflow developers survey. The dataset consists of the top 10, it is filtered here to show the top 4 (for any crossfilter) at any one time.
 5. Does Being a Gamer Correlate with Hours Worked in a Week?: I found this the most difficult graph to create random fake data for. In the end I think it just about works in conveying something to the site users.

## Technologies Used

##### LANGUAGES
- [HTML](https://www.w3.org/html/)
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- [JavaScript](https://www.javascript.com/)
- SQL

##### VERSION CONTROL
- [GIT](https://git-scm.com/)

##### FRAMEWORKS
- [Bootstrap](https://getbootstrap.com/)

To create a responsive grid
- [jQuery](https://jquery.com/)

To create the dropdown information effect
- [D3](https://d3js.org/)

To render the charts in the DOM as SVG
- [dc.js](https://dc-js.github.io/dc.js/)

Provided templates for the charts
- [crossfilter.js](https://square.github.io/crossfilter/)

Provides multidimentional filtering of data in dc charts
- [queue.js](https://github.com/d3/d3-queue)

Evaluates asynchronous tasks to handle callbacks
##### APIs
 - [Google Fonts](https://fonts.google.com/)

##### SOFTWARE AND SERVICES
- [Visual Studio Code](https://code.visualstudio.com/)
- [GitHub](https://github.com/)

##### RDBMS
- [PostgreSQL](https://www.postgresql.org/)

##### EDITORS
- SUBLIME
- ATOM

##### VMWARE
- UBUNTU V18.04

##### HARDWARE
- MAC OSX
