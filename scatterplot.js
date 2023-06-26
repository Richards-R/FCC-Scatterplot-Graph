let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let json = "";
let scattArr = "";

let xScale;
let yScale;

let xAxisScale;
let yAxisScale;

const w = 600;
const h = 500;
const padding = 25;

let svg = d3.select('svg')
    .attr("width", w)
    .attr("height", h)

req.open("GET", url, true);
req.onload = () => {
  json = JSON.parse(req.responseText)
  console.log(json.length)
  console.log(json[0].Year)
  //for (let i=0; i<json.length; i++){
   //scattArr.push([json[i].Year +", " + json[i].Time  +", " + !json[i].Doping])
    //scattArr = (json[0].Year +", " + json[0].Time  +", " + !json[0].Doping)
   generateScales()
  drawBars()
  generateAxes()
  };
req.send();
console.log(scattArr);


let generateScales = () => {
  xScale = d3.scaleLinear()
    .domain([0, (scattArr.length -1)])
    .range([padding, w - padding]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(scattArr, (d) => {
    return d[1]
    })])
    .range([0, h - (2*padding)]);
  
  datesArr = scattArr.map((item) => {
    return new Date(item[0])
    })
  
  xAxisScale = d3.scaleTime()
    .domain([d3.min(datesArr), d3.max(datesArr)])
    .range([padding, w - padding])
  
  yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(scattArr, (d) => {
    return d[1]})])
    .range([h-padding, padding])
    }





