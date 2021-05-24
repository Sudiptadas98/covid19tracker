import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};


const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};



const Graph = ({casesType, country}) => {
    const [data, setData] = useState({});
    const [bgclr, setBgclr] = useState();
    const [borderclr, setBorderclr] = useState();
    // console.log(country);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = country === "worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
                const res = await fetch(url);
                const data = await res.json();
                // console.log(data);
                const chartData = country === "worldwide" ? buildChartData(data, casesType) : buildChartData(data.timeline, casesType);
                setData(chartData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchApi();

        const background = () => {
            if(casesType === "cases"){
                setBgclr("rgba(204, 16, 52, 0.5)");
                setBorderclr("#CC1034");
            }else if(casesType === "recovered"){
                setBgclr("rgba(125,215,29,0.5)");
                setBorderclr("#7DD71D");
            }else if(casesType === "deaths"){
                setBgclr("#C0C0C0");
                setBorderclr("#808080");
            }
        }
        background();
    }, [casesType, country]);



    // console.log(data);
    return (
        <>
            <div className="graph">
                {data?.length > 0 && (
                    <Line
                        options={options}
                        data={{
                            datasets: [{
                                backgroundColor: bgclr,
                                borderColor: borderclr,
                                data: data
                            },]
                        }} />
                )}
            </div>
        </>
    )
}
export default Graph;



