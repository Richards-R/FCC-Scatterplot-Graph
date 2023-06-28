let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let json = "";
let scattArr = [];
let yearArr = [];
let totalSecondsArr = [];
let timeArr = [];
let dotArr = [];
let tooltipArr = [];

let xScale;
let yScale;

let xAxisScale;
let yAxisScale;

const w = 600;
const h = 500;
const padding = 50;

const svg = d3.select('svg')
    .attr("width", w)
    .attr("height", h)



req.open("GET", url, true);
req.onload = () => {
  json = JSON.parse(req.responseText)
                                  console.log(json.length)
                                  console.log(json[0].Year)
  for (let i=0; i<json.length; i++){
  scattArr.push([json[i].Year, json[i].Time, !json[i].Doping, json[i].Name, json[i].Nationality, json[i].Doping])}

  generateScales()
  generateAxes()
  drawDots()
  generateLegend()
   
  };

req.send();

console.log(tooltipArr)

const generateScales = () => {
  yearArr = scattArr.map((item) => {
    return (item[0])
    });                                                  

  timeArr = scattArr.map((item) => {
    return (item[1]).split(":")
    });
                                  
  totalSecondsArr = (timeArr.map((item) => {
    return (parseInt(item[0]) *60)+(parseInt(item[1]))
    }))
   
  xScale = d3.scaleLinear()
    .domain([0, (yearArr.length -1)])
    .range([padding, w - padding]);

   yScale = d3.scaleLinear()
      .domain([0, d3.max(totalSecondsArr)])
      .range([0, h - (2*padding)]);
              
  for (let i=0; i<json.length; i++){
    dotArr.push([scattArr[i][0], totalSecondsArr[i], scattArr[i][2], scattArr[i][1], scattArr[i][3], scattArr[i][4], scattArr[i][5]])}  
    console.log(dotArr)

  xAxisScale = d3.scaleLinear()
    .domain([d3.min(yearArr), d3.max(yearArr)])
    .range([padding, w - padding])
  
  yAxisScale = d3.scaleLinear()
    .domain([d3.max(totalSecondsArr), d3.min(totalSecondsArr)])
    .range([h-padding, padding])
    }

const  generateAxes = () =>{
  let xAxis = d3.axisBottom(xAxisScale)
                .tickFormat(d3.format("d"));
  let yAxis = d3.axisLeft(yAxisScale)
                .tickFormat(x => (x % 60) !== 0 ? `${Math.floor(x/60)}`+ ":" + `${(x-(Math.floor(x/60)*60))}` : `${Math.floor(x/60)}`+ ":00")

  svg.append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr('id','x-axis')

  svg.append("g")
    .call(yAxis)
    .attr("transform", "translate (" + (padding) + ", 0)")
    .attr('id','y-axis')
    }
  
const drawDots = () => {
  svg.selectAll("dots")
    .data(dotArr)
    .join("circle")
    .attr("class", "dot")
    .attr("r", "5px")
    .attr("cx",  (d)=>(xAxisScale(d[0])))
    .attr("data-xvalue", (d)=>(d[0]))
    .attr("cy",  (d)=>((yAxisScale(d[1]))))
    .attr("data-yvalue",  (d)=>(new Date(d[1] * 1000)))
    .attr("stroke", "rgb(46, 95, 114)")
    .attr("opacity", "0.5")
    .attr("fill", (d)=> d[2] === false ? "green" : "orange")
    .on("mouseover", (event, item)=>{
      drawToolTip.transition()
      .style("visibility", "visible")
      drawToolTip.text(`${item[4]} (${item[5]}) ${item[0]}　Time ${item[3]}　${item[6]}`)
      document.querySelector("#tooltip").setAttribute("data-year", item[0])
    })
    .on("mouseout", (event, item) => {
      drawToolTip.transition()
      .style("visibility", "hidden")
    })
}
    

let generateLegend = () => svg.append("rect")
    .attr("width", "205px")
    .attr("height", "54px")
    .attr("x", "380px")
    .attr("y", "180px")
    .attr("fill", "none")
    .attr("stroke", "rgb(46, 95, 114)")
    .attr("id", "legend")

      console.log(tooltipArr)
  
  let drawToolTip = d3.select("body")
      .append("div")
      .attr("id", "tooltip" )
      .attr("x","40" )
      .attr("y", "50%")
      .style("width", "auto")
      .style("height", "auto")
      .style("visibility", "hidden")









    
