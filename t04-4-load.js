/**
 * T04-4: Load data from CSV
 */

// Load CSV, convert types, and perform quick checks
d3.csv("data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count // '+' converts string count to a numeric type
})).then(data => {
  // Console logging checks
  console.log("Full Data Array:", data);
  console.log("Total rows:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));
  console.log("Extent [min, max]:", d3.extent(data, d => d.count));

  // Sort descending by count for easier reading
  data.sort((a, b) => d3.descending(a.count, b.count));

  // Hand off data to createBarChart (defined in t04-5-bars.js)
  createBarChart(data);
}).catch(error => {
  console.error("Error loading CSV file:", error);
});