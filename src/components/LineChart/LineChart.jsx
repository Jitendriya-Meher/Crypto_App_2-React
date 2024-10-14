import React, { useEffect, useState } from 'react';
import "./LineChart.css";
import Chart from 'react-google-charts';

const LineChart = ({histData}) => {

    const [data, setData] = useState([["Date","Prices"]]);

    useEffect(() => {

        let dataCopy = [["Date","Prices"]];

        if( histData.prices){

            histData.prices.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]]);
            });

            setData(dataCopy);

        }

    },[histData]);

  return (
    <Chart
    chartType='LineChart'
    data={data}
    height="100%"
    ></Chart>
  )
}

export default LineChart