function renderGauge(washFreq) {
    // Get the checkbox value
    var checkBoxValue = d3.select("#myCheckbox").property("checked")

    if (checkBoxValue) {
        // If checkbox was checked, use New Gauge Style
        var traceGauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubes per week" },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: 5 },
            gauge: {
              axis: { range: [null, 9]  },
              bar: { color: "850000" },
              steps: [
                { range: [0, 1], color: 'rgba(232, 226, 202, .5)' },
                { range: [1, 2], color: 'rgba(210, 206, 145, .5)'},
                { range: [2, 3], color: 'rgba(202, 209, 95, .5)'},
                { range: [3, 4], color: 'rgba(170, 202, 42, .5)'},
                { range: [4, 5], color: 'rgba(110, 154, 22, .5)'},
                { range: [5, 6], color: 'rgba(14, 127, 0, .5)'},
                { range: [6, 7], color: 'rgba(10, 117, 0, .5)'},
                { range: [7, 8], color: 'rgba(8, 107, 0, .5)'},
                { range: [8, 9], color: 'rgba(4, 87, 0, .5)'}
              ],
              threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.55,
                value: 5
              }
            }
        };

        // Get data and layout
        var gaugeData = [traceGauge];
        var gaugeLayout = {  margin: { t: 0, b: 0 } };

    }
    else {
        // Calculate the coordinates of the tip of the needle from radian
        // The gauge range changes from 0 to 9, each section takes 20 degrees
        var degrees = (180 - washFreq*20),
        radius = .5;

        // 180 degrees means PI rad, so convert the degrees to radians
        var radians = degrees * Math.PI / 180;

        // x value of coordinates equals to 
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Draw path to make a needle by using x and y as the tip
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
    
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        // Creat a scatter for the origin spot
        var traceOrigin = {
            type: 'scatter',
            x: [0], y:[0],
            marker: {size: 15, color:'850000'},
            showlegend: false,
            name: 'Wash Freq',
            text: washFreq,
            hoverinfo: 'text+name'
        };

        // Create the pie chart for the gauge scales
        var tracePie = {
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',	  
                    marker: {colors:['rgba(4, 87, 0, .5)', 'rgba(8, 107, 0, .5)', 
                                    'rgba(10, 117, 0, .5)', 'rgba(14, 127, 0, .5)', 
                                    'rgba(110, 154, 22, .5)', 'rgba(170, 202, 42, .5)', 
                                    'rgba(202, 209, 95, .5)', 'rgba(210, 206, 145, .5)', 
                                    'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
            labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }
        // Combine two traces into data
        var gaugeData = [traceOrigin, tracePie];

        var gaugeLayout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
                }],
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubes per week',
            // height: 1000,
            // width: 1000,
            xaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
        };
    }

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
 
};