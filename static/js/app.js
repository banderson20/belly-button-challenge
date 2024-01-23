const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data from the JSON file
d3.json(url).then(function(data) {
    let sampleValues = data.samples[0].sample_values;
    let otu_ids = data.samples[0].otu_ids;
    let otu_labels = data.samples[0].otu_labels;
    let metadata = data.metadata[0];


    let names = data.names;
    console.log(data)

    let dropdownMenu = d3.select("#selDataset");
    let table = d3.select('#sample-metadata');
    let newRowId = table.append('tr').append('td').text(`id: ${metadata.id}`)
    let newRowGender = table.append('tr').append('td').text(`gender: ${metadata.gender}`)
    let newRowAge = table.append('tr').append('td').text(`age: ${metadata.age}`)
    let newRowLocation = table.append('tr').append('td').text(`location: ${metadata.location}`)
    let newRowbbtype = table.append('tr').append('td').text(`bbtype: ${metadata.bbtype}`)
    let newRowWfreq = table.append('tr').append('td').text(`wfreq: ${metadata.wfreq}`)

    dropdownMenu.selectAll("option")
      .data(names)
      .enter()
      .append("option")
      .text(function(d) { return d; });


    function init() {
      let data = [{
        x: sampleValues.slice(0, 10).reverse(),  
        y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),  
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"  
      }];

      Plotly.newPlot("plot", data);
    };


    function updatePlotly() {
      let selectedValue = dropdownMenu.property("value");
      let selectedIndex = names.indexOf(selectedValue);

      let selectedSampleValues = data.samples[selectedIndex].sample_values;
      let selectedOtuIds = data.samples[selectedIndex].otu_ids;
      let selectedOtuLabels = data.samples[selectedIndex].otu_labels;
      let selectedMetaData = data.metadata[selectedIndex];
      let selectedTable = d3.select('#sample-metadata');
      selectedTable.selectAll('tr').remove();
      let updatedData = [{
        x: selectedSampleValues.slice(0, 10).reverse(),
        y: selectedOtuIds.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: selectedOtuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }];
      let updatedData2 = [{
        x: selectedOtuIds,
        y: selectedSampleValues,
        text: selectedOtuLabels,
        mode: "markers",
        marker: {
          size:selectedSampleValues,
          color: selectedOtuIds
        }
      }];
      let newRowId = table.append('tr').append('td').text(`id: ${selectedMetaData.id}`)
      let newRowGender = table.append('tr').append('td').text(`gender: ${selectedMetaData.gender}`)
      let newRowAge = table.append('tr').append('td').text(`age: ${selectedMetaData.age}`)
      let newRowLocation = table.append('tr').append('td').text(`location: ${selectedMetaData.location}`)
      let newRowbbtype = table.append('tr').append('td').text(`bbtype: ${selectedMetaData.bbtype}`)
      let newRowWfreq = table.append('tr').append('td').text(`wfreq: ${selectedMetaData.wfreq}`)

      Plotly.newPlot("plot", updatedData);
      Plotly.newPlot("bubble-chart", updatedData2);
    };

    init();

    d3.selectAll("#selDataset").on("change", updatePlotly);

    function init2() {
      let data = [{
        x: otu_ids,
        y: sampleValues,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size:sampleValues,
          color: otu_ids
        }
      }];
      Plotly.newPlot("bubble-chart", data);
    };

      init2();
  

});

