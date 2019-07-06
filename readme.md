# INTERACTIVE FRONT END MILESTONE PROJECT

## Charting Data From an EU Developer Survey

## Project Overview

The project presented here consists of a series of interactive graphs and charts. They are rendered in SVG by D3.js, charted using the DC.js charting library and made multidimentially intercative by the crossfilter.js JavaScript library. 

The goals of this project are to:

 - design a single webpage project, which through the use of charts and graphs, communicates something useful about the underlying data to the user of the site.
 - to use JavaScript to accomplish this, and in so doing, to begin to learn something about how I as a developer can use JavaScript in my professional career.
 - to firm up and build upon the knowlegdge of HTML and CSS I gathered from the first milestone project, and to understand how JavaScript can be used to enhance those languages.
- to understand how I can begin to use data to drive intercative visualisations.
- to begin to use some common JavaScript libraries such as jQuery.
- to begin to understand the nomenclature of JavaScript.

### The Data

For this project, my first charting data in this way, I decided to construct my own dataset. My reasoning for this stemmed from spending a few days testing with data from sources such as kaggle.com and realising that whatever data I would choose would invariably have some element blocking me from moving forward with the JavaScript. So I made the decision it would be more useful if I had control over the data. In hindsight I'm very gald I did this, as in building the data I learned a lot about what makes data chartable. If now I was presented with a real world dataset I feel I am much better placed in approaching visualasiing it in charts and graphs.
I constructed the dataset using SQL and building a table in a postgreSQL database. This allowed me to easily add new fields and to created weigthed random data which reflects real world data such as the Stack Overflow developers survey 2018.

### User Stories
##### As a user... 
 - I want to quickly understand what, in general, I am being presented with.
 - I want to easily understand what each chart is showing me
 - I want access to some relevent metadata to give basic context to the charts
 - I want to have a visually pleasing experience
 - I want to learn something I couldn't from looking at the data in a spreadsheet
 - I want .....

### UX
#### Wireframe

Wireframes can be seen HERE.

#### Typography

I used three fonts in this project:
 - **Raleway**, a nice sans serif for headings and titles
 - **Cutive**, a monospace which provides natural spacing to the chart labels
 - **Lato**, a more round edged sans serif for the number display

#### Colour

### Features
##### The Charts

The page consists of four charts which use the Crossfilter JavaScript library to give a multidimentional experience for the user. Each elements of the charts can be clicked to filter data in the other charts. With the way I have structred the visualisations you can, for example, see how popular C++ is across the EU, or equally you can see what the most popualar programming language is in Germany. You can see if any of the EU 28 bucks the trend in having less female developers in senior roles.

##### The Numbers
Percentage logical Operator

##### Information dropdown
If the user requires more contextual information about the data presented they have a simple, non intrusive, dropdown which explains the visualisation further and gives some background to the general purpose of the site.

##### Reset
A reset button to clear all filters and restore the data to its original form.

##### Responsive
The site is responsive across most screen sizes. As D3 itself is not a responsive framework it proved difficult to make the sote work 100% on all divices. To this end theres is some give a take here with the sight being optimised for desktop and the smallest screens while middle size screens less so.
For the top three graphs I have set the width to be a full Bootstrap col-12 on mobile, while lining up horizontally on middle size screens and up.
In graph.js there is variable _width_ which when used as the width property in the composite line graph, allow this graph to take up the width of whatever screen it occupies.

#### The Graphs. Why and How



#### Left to Implement

## Testing

### Validation

### Results

## Some Notes on project in general

## Deployment

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

JQuery
The project uses JQuery to simplify DOM manipulation.

##### LANGUAGES
- HTML
- CSS
- JavaScript
- SQL

##### VERSION CONTROL
- GIT

##### FRAMEWORKS
- bootstrap.css
- jquery.js
- d3.js
- dc.js
- crossfilter.js
- queue.js

##### APIs
 - fonts.googleapis

##### SOFTWARE AND SERVICES
- VISUAL STUDIO CODE
- GITHUB

##### RDBMS
- PostgreSQL

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




