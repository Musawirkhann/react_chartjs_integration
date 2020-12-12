import React, {useState, useEffect} from 'react';

import {Line} from 'react-chartjs-2';
import {getdata} from '../data/apiData';


const LineChartScreen = () => {
    const [lablesData, setLabelsData] = useState([]);
    const [confirmedData, setConfirmedData] = useState([]);
    const [deathsData, setDeathsData] = useState([]);

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 90, 100, 0);
        const gradient1 = ctx.createLinearGradient(0, 90, 100, 0);
        gradient.addColorStop(0, '#ff9a9e');
        gradient.addColorStop(0.5, '#fad0c4');
        gradient.addColorStop(1, '#fad0c4');

        gradient1.addColorStop(0, '#B7F8DB');
        gradient1.addColorStop(0.5, '#50A7C2');
        gradient1.addColorStop(1, '#B7F8DB');

        return {
            labels: lablesData,
            datasets: [
                {
                    fill: false,
                    label: 'Confirmed',
                    data: confirmedData,
                    backgroundColor: gradient1,
                    borderColor: gradient1,
                    borderWidth: 5
                },
                {
                    fill: false,
                    label: 'Deaths',
                    data: deathsData,
                    backgroundColor: gradient,
                    borderColor: gradient,
                    borderWidth: 5
                }
            ]
        }
    }
    const options = {
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: 'rgba(242, 38, 19, 1)'
            }
        },
    }
    const getChartData = async () => {
        try{
            let labelsArray = [];
            let confirmedArray = [];
            let deathsArray = [];
            const response = await getdata();
            response.forEach(element => {
                labelsArray.push(element.reportDate);
                confirmedArray.push(element.confirmed.total);
                deathsArray.push(element.deaths.total);
            });
            setLabelsData(labelsArray);
            setConfirmedData(confirmedArray);
            setDeathsData(deathsArray);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChartData();
    }, []);
    return (
        <Line data={data} options={options}/>
    );
}

export default LineChartScreen;