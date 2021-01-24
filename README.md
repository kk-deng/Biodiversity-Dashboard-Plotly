# Belly Button Biodiversity Dashboard
Build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels by using Plotly and D3.js libraries.

## Files Index

Following files are attached:

1. <a href="https://github.com/kk-deng/JavaScript-Challenge/blob/main/UFO-level-2/index.html">index.html</a>: Main page with required HTML structures.

2. <a href="https://github.com/kk-deng/JavaScript-Challenge/blob/main/UFO-level-2/static/js/app.js">app.js</a>: Main D3 JavaScript file to populate data dynamically. 

## Summary of functions

* A function which takes input data array to append data into HTML:

```javascript
// Build a callable function to convert data into a table
function buildData(inputData) {
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Clean the existing codes inside tbody html
    tbody.html("");

    // Loop through the data list
    inputData.forEach(event => {
        // Append one table row 'tr' for each object
        var row = tbody.append("tr");

        // Use Object entries to loop each key value pair
        Object.entries(event).forEach(([_, value]) => {
            // Append one cell per column
            var cell = row.append("td");
            cell.text(value);
        });
    });
};
```


## View Screenshots
* Default page

<img src="https://github.com/kk-deng/JavaScript-Challenge/blob/main/Screenshots/default.png">

* Multiple filters

<img src="https://github.com/kk-deng/JavaScript-Challenge/blob/main/Screenshots/multifilter.png">
