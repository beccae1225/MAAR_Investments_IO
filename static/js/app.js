//build Plot
console.log("buildPlot");
function buildPlot(data) {

    //read in data
    d3.json("investors.json").then((data) => {
        

        let investor = data.map(d => d.name);
            //console.log(`Investors: ${investor}`);

        let portfolioSize = data.map(d => d.portfolio_size)
                //console.log(`Portfolio Size: ${portfolioSize}`);
   
        let industry = data.map(d => d.industry);
            //console.log(`Industry: ${industry}`); 
            
        let investorType = data.map(d => d.type_of_investor);
            console.log(`Type: ${investorType}`);

        let wealth = data.map(d => d.wealth_worth_in_billions);


        let numberDeals = data.map(d => d.number_of_deals);
        //let topNumberDeals = numberDeals.slice(0,10).reverse();
            //console.log(`# of Deals: ${numberDeals}`);

        let website = data.map(d => d.website);
            //console.log(`Website: ${website}`);

        //let typeLabels = data.type.slice(0,50).reverse();

            //Multi-Chart (bar and line)
    
        let trace1 = {
            x:investor,
            y: numberDeals,
            fill: {color: 'rgb(185, 163, 192)'},
            name: "Number of Deals",
            type: 'scatter',
            marker: {color: 'rgb(185, 163, 192)'}
            };

            let trace2= {
                x: investor,
                y: wealth,
                name: "Wealth (in $Billions)",
                type: "bar", 
                marker: {color: 'rgb(82, 1, 110)'},
            };

            let barData = [trace1, trace2];

            let layout1 = {
                autosize: false,
                width: 700,
                height: 700,
                showlegend: true,
                xaxis: {
                    showticklabels: false
                },
                title: {
                    text: `Portfolio Size & Investor Wealth `,
                    font: {
                        family: 'Segoe UI Light',
                        size: 34
                    },
                },
                
            };
    
            Plotly.newPlot("multi-bar", barData, layout1);

    //Bubble chart
    let bubbles = d3.select("bubble");
    bubbles.html("");

    let trace3 = {
        x:numberDeals,
        y: portfolioSize,
        mode: "markers", 
        marker: {
            size: portfolioSize,
            sizemode: 'area',
            color: numberDeals
        },
        text: investor
    };

    let bubbleData = [trace3];

    let layout2 = {
        autosize: false,
        width: 700,
        height: 750,
        title: {
            text: "Number of Deals by Portfolio Size ",
            font: {
                family: 'Segoe UI Light',
                size: 34
            },
            
        },
        xaxis: {title: "Number of Deals"},
        yaxis: {title: "Portfolio Size"}
    };

    Plotly.newPlot("bubble", bubbleData, layout2);     
});
   
};

console.log("buildTable");

function buildTable(data) {

    let tbody = d3.select("tbody");

    tbody.html("");

    data.forEach((element) => {
            
        
        let row = tbody.append("tr");
        row.append("td").text(element.name);
        row.append("td").text(element.location);
        row.append("td").text(element.most_recent_deal);
        row.append("td").text(element.website);
        
    });

};

console.log("GetData");

function getData(data) {
    
    d3.json("investors.json").then((data) => {

        let types = d3.select("#selDataset").property("value");
        
        let newBarData = [];
        let t1 = [];
        let t2 = [];
        let t3 = [];

        //let newData = data;
        let filteredData = data.filter(row => row.type_of_investor ===types)

        //for (let i = 0; i < filteredData.length; i++) {

        //if (types === filteredData.type_of_investor) {
            
            //types = filteredData.type

            //for (let i = 0; i < filteredData.length; i++)
            
            t1.push(filteredData.name);
            t2.push(filteredData.wealth);
            t3.push(filteredData.number_of_deals);
            
            newBarData.push(t1, t2, t3);

            let update1 = {'x': newBarData[0], 'y': newBarData[1,2]};
            buildTable(filteredData);
            Plotly.restyle("multi-bar", update1, newBarData[0,1,2]);
            //updatePlotly(filteredData);
        //} };
        console.log(filteredData);console.log(t1);
    });   
};

function optionChanged(filteredData) {
    //updatePlotly(filteredData);
    buildTable(filteredData);
    getData(filteredData);
    
};

let sel = d3.select("#selDataset");

sel.on("change", optionChanged);


function init() {
    
    let sel = d3.select("#selDataset").on('change', () => {

   //let selType = data.filter(data => data.type === sel);
        //console.log(selType);

        d3.json("results.json").then((data) => {
        
            buildPlot(data);
            buildTable(data);
            getData(data);
        
        })
        
    });

};


//function updatePlotly(filteredData) {

    //d3.json("results.json").then((data) => {

        //let types = d3.select("#selDataset").property("value");
        
        //let newBubbleData = [];

        //let bubbleX = Object.value(data.number_of_deals);
        //let bubbleY = Object.value(data.portfolio_size);
        
        //let x1 = newBarData.name;

        //if (types === filteredData.type) {
            //let filteredData = filteredData.filter(row => row.type ===types);
            
            //let bubbleX = Object.value(filteredData.number_of_deals);
            //let bubbleY = Object.value(filteredData.portfolio_size);;
            
           // newBarData.concat(bubbleX);
         //   newBarData.concat(bubbleY);
            //newBarData.push(x1)

       //     let update1 = {'x': newBarData[0], 'y': newBarData[1]};
            //buildTable(filteredData);
            //updatePlotly(filteredData);
     //   } console.log(newBubbleData)
   // });   
    
   // Plotly.restyle("bubble", "update1", [0,1]);
    //Plotly.restyle("multi-bar", filteredData);
 // };

init();