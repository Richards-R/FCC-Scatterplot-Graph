let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let json = "";
let scattArr = [];
let yearArr = [];
let totalSecondsArr = [];
let timeArr = [];

let xScale;
let yScale;

let xAxisScale;
let yAxisScale;

const w = 600;
const h = 500;
const padding = 50;

let svg = d3.select('svg')
    .attr("width", w)
    .attr("height", h)

req.open("GET", url, true);
req.onload = () => {
  json = JSON.parse(req.responseText)
                                  console.log(json.length)
                                  console.log(json[0].Year)
  for (let i=0; i<json.length; i++){
  scattArr.push([json[i].Year,json[i].Time,!json[i].Doping])}
                                  console.log(scattArr);
  
  generateScales()
  //drawBars()
  generateAxes()
  };
                                  console.log(scattArr.length);
req.send();

                                  console.log(scattArr.length);


let generateScales = () => {
                                  console.log(scattArr); 
  xScale = d3.scaleLinear()
    .domain([0, (yearArr.length -1)])
    .range([padding, w - padding]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(totalSecondsArr)])
    .range([0, h - (2*padding)]);
  
  yearArr = scattArr.map((item) => {
    return (item[0])
    });                           
                                    console.log(yearArr); 

  timeArr = scattArr.map((item) => {
    return (item[1]).split(":")
    });
                                    console.log(timeArr); 
  totalSecondsArr = (timeArr.map((item) => {
    return (parseInt(item[0]) *60)+(parseInt(item[1]))
    }))
                                    console.log(totalSecondsArr);      
                                    console.log(typeof totalSecondsArr[2]);    
                                    
  xAxisScale = d3.scaleLinear()
    .domain([d3.min(yearArr), d3.max(yearArr)])
    .range([padding, w - padding])
  
  yAxisScale = d3.scaleLinear()
    .domain([d3.max(totalSecondsArr), d3.min(totalSecondsArr)])
    .range([h-padding, padding])
    }

let  generateAxes = () =>{
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


