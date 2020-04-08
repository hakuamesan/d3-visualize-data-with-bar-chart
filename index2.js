let dataset = [];
let length =0;

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then( (data)=> {

    dataset = data.data;
    let gdp = dataset.map( (a,b) => a[1]);
    let years= dataset.map( (a,b) => new Date((a[0])));
//    dataset = [...d];
    console.log(dataset);

    length = gdp.length;  
    console.log("len="+length);



let h = 500;
let w = 1000;            
let barPadding = 1;
let padding = 50;

let xPad = 30;
let yPad = 30;

let minGDP =d3.min(gdp);
let maxGDP =d3.max(gdp);

let minYr = (d3.min(years));
let maxYr = (d3.max(years));

console.log("minGDP=" + minGDP + " max="+maxGDP);
console.log("minYr=" + minYr + " maxYr="+maxYr);

let xScale = d3.scaleTime()
              .domain([minYr, maxYr])
              .rangeRound([padding, w-padding])
              

let yScale = d3.scaleLinear()
               .domain([0, maxGDP ])
               .rangeRound([h-padding, padding])

let xAxis = d3.axisBottom(xScale)
              .ticks(20)

let yAxis = d3.axisLeft(yScale)
              .ticks(10)

var tooltip = d3.select('#main')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0)


let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height",h);

let formatTime = d3.timeFormat("%Y");


let rect = svg.selectAll("rect")
                  .data(dataset)
                  .enter()
                  .append("rect")
                  .attr("x", (d,i) => xScale( new Date(d[0])))
                  .attr("y", (d) => yScale(d[1]))
                  .attr("width", w/length - barPadding)
//                .attr("width", xScale.bandwidth())
                  .attr("height", (d) => (h-padding) - yScale(d[1]) )
                  .attr("fill","teal")
				  .attr("class","bar")
				  .attr("data-date", (d) => d[0])
				  .attr("data-gdp", (d) => d[1])
				  .on("mouseover", (d,i) => {
						tooltip.transition()
							    .duration(20)
								.style("opacity", 1)
						tooltip.html( d[0].substr(0,4) + '<br>' + '$' + d[1].toFixed(1) + 'Billion')
								.attr("data-date", d[0])
								.style("left", d3.event.pageX - 50 + 'px')
								.style("top", d3.event.pageY - 20 + 'px')
								.style("transform", "translateX(60px)");
					})
				  .on("mouseout", (d,i) => {
						tooltip.transition()
								.duration(100)
								.style("opacity",0)
						});

                  



svg.append("g")
	.attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (h - padding  ) + ")")
    .call(xAxis)

svg.append("g")
	.attr("id", "y-axis")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)


})
