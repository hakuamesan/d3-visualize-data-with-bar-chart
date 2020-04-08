
const projectName = 'bar-chart';
//localStorage.setItem('example_project', 'D3: Bar Chart');

var yMargin = 40,
    width = 800,
    height = 400,
    barWidth = width/275;

var tooltip = d3.select(".visHolder").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

var overlay = d3.select('.visHolder').append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);

var svgContainer =  d3.select('.visHolder')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 60);


d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
	.then( (data)=> {
	if (data) console.log(data); 

 var xAxis = d3.axisBottom()
    .scale(xScale);
  
  var xAxisGroup = svgContainer.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(60, 400)');

 

	})

