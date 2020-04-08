var width = 800,
    height = 400,
    padding = 45;

var tooltip = d3.select('.chart')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)

var svgContainer = d3.select('.chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(data) {
  
  //DATASET
  var dataset = data.data.map((d, i) => {
    return d
  });
  
  var minDate = d3.min(dataset, (d) => new Date(d[0]));
  var maxDate = d3.max(dataset, (d) => new Date(d[0]));
  
  var maxGDP = d3.max(dataset, (d) => d[1]);
  var minGDP = d3.min(dataset, (d) => d[1]);
  
  //SCALE X AND Y AXIS
  var xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, width - padding]);
  
  var yScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([height - padding, padding]);
  
  //BARS  
  var bar = svgContainer.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect') 
    .attr('x', (d) => xScale(new Date(d[0])))
    .attr('y', (d) => yScale(d[1]))
    .attr('width', width/dataset.length)
    .attr('height', (d) => (height - padding) - yScale(d[1]))
    .attr('fill', '#6bedff')
    .attr('class', 'bar')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .on('mouseover', (d, i) => {
      tooltip.transition()
        .duration(20)
        .style('opacity', 1);
       tooltip.html(d[0].substr(0, 4) + '<br>' + '$' + d[1].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion')
        .attr('data-date', d[0])
        .style('left', d3.event.pageX - 50 + 'px')
        .style('top', d3.event.pageY - 20 + 'px')
        .style('transform', 'translateX(60px)');
     })
    .on('mouseout', (d, i) => {
      tooltip.transition()
        .duration(100)
        .style('opacity', 0)
    });
  
  //AXES GROUP
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  
  svgContainer.append('g')
    .attr('id', 'x-axis')
    .attr('class', 'axes')
    .attr("transform", "translate(0, " + (height - padding) + ")")
    .call(xAxis);
  
  svgContainer.append('g')
    .attr('id', 'y-axis')
    .attr('class', 'axes')
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);
});


