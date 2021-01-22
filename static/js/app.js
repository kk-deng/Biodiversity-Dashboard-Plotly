function dropdownBuilder(selDataset, names) {
    // With names data, display all names
    names.map(uto_name => {
        // In the dropdown menu, append <option> tags with subject ID 
        selDataset.append("option")
            .attr("value", uto_name)
            .text(uto_name)
    })
} 

function graphBuilder(samples, metadata, subjectID, oldResult) {
    // Find the sample by its subject id
    samples.map(sample => {
        // Find the sample object in the samples array by its ID
        switch(subjectID) {
            case sample.id :
            // var sortedSamples = sample.sort( (a, b) => b.sample_values - a.sample_values);
            // var reversedData = slicedData.reverse();
            var slicedSampleValues = sample.sample_values.slice(0, 10)
            var slicedOtuID = sample.otu_ids.slice(0, 10)
            var slicedLabels = sample.otu_labels.slice(0, 10)
            
            var trace1 = {
                x: slicedSampleValues.reverse(),
                y: slicedOtuID.map(otuID => `OTU ${otuID}`).reverse(),
                type: "bar",
                orientation: "h",
                text: slicedLabels
            };

            var barData = [trace1];

            var barLayout = {
                title: `Top 10 OTUs found in individual ID ${subjectID}`,
                margin: {t: 50, l: 100}
            }

            Plotly.newPlot("bar", barData, barLayout);

            // Display bubble chart
            var trace2 = {
                x: sample.otu_ids,
                y: sample.sample_values,
                mode: 'markers',
                marker: {
                    color: sample.otu_ids,
                    size: sample.sample_values
                },
                text: sample.otu_labels
            };
              
            var bubbleData = [trace2];
              
            var bubbleLayout = {
                title: `Bubble Chart of OTUs in individual ID ${subjectID}`,
                hovermode: "closest",
                xaxis: {title: "OTU ID"}
            };
              
            Plotly.newPlot("bubble", bubbleData, bubbleLayout);
            break
        }

    })

    // Display Demographic Info for this subject
    metadata.map(demoInfo => {
        // Loop through and find out the subject in metadata
        if (demoInfo.id == subjectID) {
            // If found, append information to the div
            var demoDiv = d3.select("#sample-metadata");
            demoDiv.html("")

            // Display all keys and values in this subject
            Object.entries(demoInfo).map(([key, value]) => {
                demoDiv.append("h6").text(`${key}: ${value}`)
            });

            // Adding a gauge
            renderGauge(demoInfo.wfreq);


        };
    });
};

// Main function
d3.json("../data/samples.json").then(data => {
    // Import data
    var metadata = data.metadata;
    var names = data.names;
    var samples = data.samples;

    // Select the dataset div in html
    var selDataset = d3.select("#selDataset");

    // Display Dropdown Menu options
    dropdownBuilder(selDataset, names);

    // Initialize with the first sample "940" as the default result
    graphBuilder(samples, metadata, names[0])

    // Set a listener for the dropdown menu
    selDataset.on("change", optionChanged);

    function optionChanged() {
        // Return the selected value from dropdown menu
        var subjectID = selDataset.node().value

        // Build all graphics
        graphBuilder(samples, metadata, subjectID)
        
    };
});
