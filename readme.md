# INTERACTIVE FRONT END MILESTONE PROJECT

## Charting Data From an EU Developer Survey

## Project Overview

The project presented [here](https://select-8.github.io/charting-ms2/#) consists of a series of interactive graphs and charts. They are rendered in SVG by D3.js, charted using the DC.js charting library and made multidimentially intercative by the crossfilter.js JavaScript library. 

The goals of this project are to:

 - design a single webpage project, which through the use of charts and graphs, communicates something useful about the underlying data to the user of the site.
 - to use JavaScript to accomplish this, and in so doing, to begin to learn something about how I as a developer can use JavaScript in my professional career.
 - to firm up and build upon the knowledge of HTML and CSS I gathered from the first milestone project, and to understand how JavaScript can be used to enhance those languages.
- to understand how I can begin to use data to drive interactive visualisations.
- to begin to use some common JavaScript libraries such as jQuery.
- to begin to understand the nomenclature of JavaScript.


### The Data

For this project, my first charting data in this way, I decided to construct my own dataset. My reasoning for this stemmed from spending a few days testing with data from sources such as kaggle.com and realising that whatever data I would choose would invariably have some element blocking me from moving forward with the JavaScript. So I made the decision it would be more useful if I had control over the data. In hindsight I'm very glad I did this, as in building the data I learned a lot about what makes data chartable. If now I was presented with a real world dataset I feel I am much better placed in approaching visualising it in charts and graphs.
I constructed the dataset using SQL and building a table in a PostgreSQL database. This allowed me to easily add new fields and to created weighted random data which reflects real world data such as the Stack Overflow developers survey 2018.


### User Stories

This project is aimed primarily at developers and people generally interested in technology. However, it should also be easily discernible by a general audience.
##### As a user... 
 - I want to quickly understand what I am being presented with.
 - I want to easily understand what each individual chart is showing me.
 - I want access to some relevant metadata to give basic context to the charts.
 - I want to have a visually pleasing experience.
 - I want to learn something I couldn't from looking at the data in a spreadsheet.
 - I want a bit of light hearted, "insider" content to contrast the the more "serious" content.

### UX
#### Wireframe

Wireframe can be seen [here](assets/wireframe.jpg).

#### Typography

I used three fonts in this project:
 - **Raleway**, a nice sans serif for headings and titles
 - **Cutive**, a monospace which provides natural spacing to the chart labels
 - **Lato**, a more round edged sans serif for the number display

#### Colour

### Features
##### The Charts

The page consists of four charts which use the Crossfilter JavaScript library to give a multidimensional experience for the user. Each elements of the charts can be clicked to filter data in the other charts. With the way I have structured the visualisations you can, for example, see how popular C++ is across the EU, or equally you can see what the most popular programming language is in Germany. You can see if any of the EU 28 bucks the trend in having less female developers in senior roles.


##### The Numbers
In the top bar we have percentage calculation for logical operator preference. This calculates the percentage within each value item chosen.

##### Information dropdown
If the user requires more contextual information about the data presented they have a simple, non intrusive, dropdown which explains the visualisation further and gives some background to the general purpose of the site. This is presented with vertical scroll on small screens so as not to push the charts out of view.

##### Reset
A reset button to clear all filters and restore the data to its original form.

##### Responsive
The site is responsive across most screen sizes. As D3 itself is not a responsive framework it proved difficult to make the site work 100% on all devices. To combat this I used BootStrap grid to reorder troublesome charts and achieve a balance at all screen sizes.
In graph.js there is variable _width_ which when used as the width property in the composite line graph, allows it to take up the max width of its container (on refresh).

#### Left to Implement

In a future version of this site I would replace the country row chart with a [cartogram](http://bl.ocks.org/emeeks/d57083a45e60a64fe976).

I will add a query so that the information drop down content will also scroll in medium sized devices when in landscape mode.

## Testing

As most of the interactive elements of the site are preformed under the hood by crossfilter I have not scoped any automated testing. To this end testing has been conducted manually.

##### Users
In order to assess the sites usability I had shared it for testing with with both developers and non developers. In both cases I am satisfied that the site meets the users needs. In the case of one non developer the number display was confusing as they did not know what it was referring to even after reading the information display. However, given the main target audience for this site is the developer community and I found here that it had the desired intention of conveying a bit of lightness, I decided to keep it in.

##### Responsiveness
The site as vigorously tested in Chrome Developer Tools in responsive mode and at all screen sizes on a variety of device brands. This involved selecting _inspect_ and the _toggle device toolbar_ options. Then selecting through common devices (Galaxy S5, Google Pixel devices, iPhones of various sizes, iPad, iPad Pro) in order to see if my Bootstrap Grid set up allowed the text and charts to flow and flex without any visual or technical issues.
The site was also physically tested on a Samsung Galaxy Tab, an iPhone 6, a Windows Desktop machine and a Retina Screen MacBook Pro.

##### Browsers
The site was tested in Chrome, FireFox, Safari and Opera.

##### Chart Interactions
Given this was my first foray into JavaScript and charting, throughout building the site I used my knowledge of SQL to test that I was getting the expected results from my functions.
Each data value, be it a single bar or pie slice have been tested in this way against the data in PostgreSQL using SQL queries. 

For example to check if the percentage calculations are correct when discipline 'C' is selected in the _Average Salary_ barchart, I can run:

    with dis as (
    select
        count(discipline),
        discipline
    from
        mydata.datatest
    group by
        discipline),
    lo_op as (
        select
            count(logical_op),
            discipline,
            logical_op
        from
            mydata.datatest
        group by
            discipline,
            logical_op
    )
    select
      round(
          ((b.count::numeric / a.count::numeric) * 100), 2),
      b.discipline,
      b.logical_op
    from
     dis as a,
     lo_op as b
    where
        a.discipline = b.discipline AND b.discipline = 'C';

Resulting in:

    round | discipline | logical_op 
    -------+------------+------------
    22.45 | C          | AND
    48.98 | C          | OR
    28.57 | C          | NOT
 
 This can then check these results against the results displayed on the site.

### Validation

HTML AND CSS files where found to be valid via the offical W3 code validators.

HTML : https://validator.w3.org/

CSS : https://jigsaw.w3.org/css-validator/


## Assessing the Project Goals

## Deployment

The site is deployed to GitHub Pages under the following process:

 1. If I am working on a local branch that needs to be merged into the master branch, I will issue a pull request and fix any potential conflicts before merging with the master branch. In this case I am working on the master branch so merging is not an issue and I will simply push from my local repo.
 2. After logging into my GitHub account I select the relevant repo from the list of my repos.
 3. Select the _settings_ menu.
 4. Scroll down to the GitHub Pages section.
 5. Under _Source_ select *master branch*
 6. The site is published at the supplied link
 7. Test the link is working as expected.

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

##### PROJECT MGMT
- SLACK
- NOTION

## Credits

A significant amount of the JavaScript in graph.js was based on the Code Institute D3 modules.

The code to remove NULL rows from the results of a crossfilter was found [here](https://github.com/dc-js/dc.js/wiki/FAQ#remove-empty-bins)


The DC example sets found [here](https://dc-js.github.io/dc.js/examples/) provided some of the methods for dealing with valueAccessors and working with chart labels and colours.