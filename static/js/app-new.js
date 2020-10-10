//build Plot
console.log("buildPlot");
function buildPlot(data) {

    //read in data
    d3.json("investors.json").then((data) => {
        //console.log(data);

        let investor = data.map(d => d.name);
            //console.log(`Investors: ${investor}`);

        let portfolioSize = data.map(d => d.portfolio_size)
                //console.log(`Portfolio Size: ${portfolioSize}`);
   
        let industry = data.map(d => d.industry);
            //console.log(`Industry: ${industry}`); 
            
        let location = data.map(d => d.location);
            //console.log(`Location: ${location}`);
            
        let investorType = data.map(d => d.type_of_investor);
            console.log(`Type: ${investorType}`);

        let wealth = data.map(d => d.wealth_worth_in_billions);

        let avgGrowth = data.map(d => d.avg_growth_score);
            //console.log(`Avg Growth Score: ${avgGrowth}`);

        let dealsPC = data.map(d => d.deals_per_company);
            //console.log(`Deals Per Company: ${dealsPC}`);

        let numberDeals = data.map(d => d.number_of_deals);
        //let topNumberDeals = numberDeals.slice(0,10).reverse();
            //console.log(`# of Deals: ${numberDeals}`);

        let offeredFunds = data.map(d => d.three_year_funds_offered);
            //console.log(`Funds offered: ${offeredFunds}`);

        let soldFunds = data.map(d => d.three_year_funds_sold);
            //console.log(`Funds Sold: ${soldFunds}`);

        let website = data.map(d => d.website);
            //console.log(`Website: ${website}`);

        //let topInvestor = data.investor.slice(0,50).reverse();

            //Multi-Chart (bar and line)
    
        let trace1 = {
            x:investor,
            y: dealsPC,
            name: "Deals per Company",
            type: 'scatter',
            marker: {color: 'rgb(82, 1, 110)'}
            };

            let trace2= {
                x: investor,
                y: numberDeals,
                text: investor,
                name: "Number of Deals",
                type: "bar", 
                marker: {color: 'rgb(185, 163, 192)'},
            };

            let barData = [trace1, trace2];

            let layout1 = {
                autosize: true,
                width: 700,
                height: 700,
                showlegend: true,
                title: {
                    text: `Portfolio Size & Number of Deals `,
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
        x:portfolioSize,
        y: dealsPC,
        mode: "markers", 
        marker: {
            size: portfolioSize,
            color: dealsPC
        },
        text: investor
    };

    let bubbleData = [trace3];

    let layout2 = {
        autosize: false,
        width: 700,
        height: 750,
        title: {
            text: "Investor Wealth and Portfolio Size Comparison",
            font: {
                family: 'Segoe UI Light',
                size: 34
            },
            
        },
        xaxis: {title: "Wealth ($billions)"},
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
        
        //let newBarData = [];

        let filteredData = data;
        
        //let x1 = newBarData.name;

        //for (let i = 0; i < filteredData.length; i++)

        if (types) {
            filteredData = filteredData.filter(row => row.type_of_investor ===types);
            types = filteredData.type
            
            //let t1 = filteredData.number_of_deals;
            //let t2 = filteredData.portfolio_size;
            
            //newBarData.push(t1);
            //newBarData.push(t2);
            //newBarData.push(x1)

            //let update1 = {y: newBarData[0,1]};
            buildTable(filteredData);
            updatePlotly(filteredData);
        }
    });   
};
function optionChanged(filteredData) {
    updatePlotly(filteredData);
    buildTable(filteredData);
    getData(filteredData);
    
};

let sel = d3.select("#selDataset");

sel.on("change", optionChanged);


function init() {
    
    let sel = d3.select("#selDataset").on('change', () => {

   //let selType = data.filter(data => data.type === sel);
        //console.log(selType);

        d3.json("investors.json").then((data) => {
        
            buildPlot(data);
            buildTable(data);
            getData(data);
        
        })
        
    });

};

console.log("updatePlotly")

function updatePlotly(filteredData) {

    //d3.json("results.json").then((data) => {

        let types = d3.select("#selDataset").property("value");
        
        let newBubbleData = [];

        //let bubbleX = Object.value(data.number_of_deals);
        //let bubbleY = Object.value(data.portfolio_size);
        
        //let x1 = newBarData.name;

        if (types === filteredData.type) {
            //let filteredData = filteredData.filter(row => row.type ===types);
            
            let bubbleX = Object.value(filteredData.number_of_deals);
            let bubbleY = Object.value(filteredData.portfolio_size);;
            
            newBarData.concat(bubbleX);
            newBarData.concat(bubbleY);
            //newBarData.push(x1)

            let update1 = {'x': newBarData[0], 'y': newBarData[1]};
            //buildTable(filteredData);
            //updatePlotly(filteredData);
        } console.log(newBubbleData)
   // });   
    
    Plotly.restyle("bubble", "update1", [0,1]);
    //Plotly.restyle("multi-bar", filteredData);
  };

init();