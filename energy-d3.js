// Sample Appliance Energy Data (kWh/year)
const energyData = [
  { appliance: "Television", energy: 150 },
  { appliance: "Refrigerator", energy: 400 },
  { appliance: "Washing Machine", energy: 250 },
  { appliance: "Air Conditioner", energy: 800 },
  { appliance: "Dishwasher", energy: 200 }
];

// 1. Set dimensions and margins
const margin = { top: 30, right: 20, bottom: 60, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

// 2. Select the responsive container and append the SVG canvas
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// 3. Set X scale (Categorical Band scale for appliances)
const xScale = d3.scaleBand()
  .domain(energyData.map(d => d.appliance))
  .range([0, width])
  .padding(0.3);

// 4. Set Y scale (Linear scale for energy consumption)
const yScale = d3.scaleLinear()
  .domain([0, d3.max(energyData, d => d.energy)])
  .nice()
  .range([height, 0]);

// 5. Render X Axis
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))
  .selectAll("text")
  .attr("transform", "rotate(-20)")
  .style("text-anchor", "end");

// 6. Render Y Axis
svg.append("g")
  .call(d3.axisLeft(yScale));

// 7. Bind Data and Append Rectangles (Bars)
svg.selectAll(".bar")
  .data(energyData)
  .join("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.appliance))
  .attr("y", d => yScale(d.energy))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(d.energy))
  .attr("fill", "#2e7d32");