import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

class Chart extends React.Component{ 
    constructor(offlineData){
        super();
        this.offlineData = offlineData;
        this.drawPicture = this.drawPicture.bind(this);
    }

    drawPicture(){
            let chart = am4core.create('chartdiv', am4charts.XYChart);
            let ValueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
            ValueAxisX.title.text = "date";
    
            let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxisY.title.text = "avbgbreathrate";
    
            //data source
            chart.data = this.offlineData;
    
            //data value
            let series = chart.series.push(new am4charts.LineSeries());
            series.name = "Week offline data";
            series.dataFields.valueY = 'avgBreathrate';
            series.dataFields.valueX = 'data';
            this.chart = chart;
    }

    render(){
        return (this.drawPicture());
    }
}

export default Chart;