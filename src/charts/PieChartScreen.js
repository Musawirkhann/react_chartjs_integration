import React, {useState, useEffect} from 'react';

import {Pie} from 'react-chartjs-2';

import {getPieData} from '../data/apiData';


const PieChartScreen = () => {
    const [confirmedData, setConfirmedData] = useState(0);
    const [deathsData, setDeathsData] = useState(0);

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
            labels: ['Confirmed', 'Deaths'],
            datasets:[
                {
                label: 'Data',
                data: [confirmedData, deathsData],
                backgroundColor: [gradient1, gradient],
                borderColor: [gradient1, gradient],
                borderWidth: 1,
                }
            ]
        }
    }
    const options = {
        responsive: true,
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    }
    const getChartData = async () => {
        try{
            let confirmeddata = 0;
            let deathsdata = 0;
            const response = await getPieData();
            if (response !== null) {
                const {confirmed, deaths} = response;
                const total = confirmed.value + deaths.value;
                confirmeddata = parseFloat(((confirmed.value / total) * 100).toFixed(2));
                deathsdata = parseFloat(((deaths.value / total) * 100).toFixed(2));

                setConfirmedData(confirmeddata);
                setDeathsData(deathsdata);
            }
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChartData();
    }, []);
    return (
        <Pie data={data} options={options}/>
    );
}

export default PieChartScreen;