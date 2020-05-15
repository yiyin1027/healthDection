import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Contactions from './contact';
import axios from 'axios';
import SearchBox from './inputBox';
import Chart from './chart';

class Chartdiv extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        let ValueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
        ValueAxisX.title.text = "date";

        let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxisY.title.text = "avbgbreathrate";

        //data source
        chart.data = this.props.offlineData;
        console.log(this.props.offlineData);

        //data value
        let series = chart.series.push(new am4charts.LineSeries());
        series.name = "Week offline data";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        series.dataFields.valueY = 'avgBreathrate';
        series.dataFields.valueX = 'data';
        this.chart = chart;
    }

    render(){
        return (
            <div>
                <div id = "chartdiv" style={{width: "100%", height: "500px"}} />
            </div>
        )
    }
}

class Offline extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.clickEvent1 = this.clickEvent1.bind(this);
        this.clickEvent2 = this.clickEvent2.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.inputEvent1 = this.inputEvent1.bind(this);
        this.inputEvent2 = this.inputEvent2.bind(this);
        this.inputEvent3 = this.inputEvent3.bind(this);
        this.drawPicture = this.drawPicture.bind(this);
        this.callOtherDomain = this.callOtherDomain.bind(this);

        this.state = {
            offlineData:'',
            span:'',
            timeSpan:'',
            deviceID: '',
            start: '',
            end:''
        };
        this.apiUrl = 'http://ec2-54-81-119-220.compute-1.amazonaws.com:8080/api/v1/stats'
    }

    clickEvent1(){
        this.setState({
            span: 'daily'
        })
    }

    clickEvent2(){
        this.setState({
            span:'hourly'
        })
    }

    inputEvent1(){
        this.setState({
            timeSpan: 'month'
        })
    }
    inputEvent2(){
        this.setState({
            timeSpan: 'week'
        })
    }
    inputEvent3(){
        this.setState({
            timeSpan: 'day'
        })
    }

    handleChange(event) {
        let o = {}
        o[event.target.name] = event.target.value;
        this.setState(o)
    }

    fetchData(){
        var xhr = new XMLHttpRequest();
        /*console.log(this.state.start);
        let k = this.state.start;

        function Hour(k){
            if(this.state.span == "hourly"){
                this.setState({
                    end: k
                })
            }
        }
        Hour(k);
        console.log(this.state.end);*/
        const url = this.apiUrl +'/'+ this.state.span+'/' + this.state.deviceID+'/' + this.state.start+'/' + this.state.end;
        console.log(url);
        const urlk = 'http://ec2-54-81-119-220.compute-1.amazonaws.com:8080/api/v1/stats/daily/device:24:04:2019:14:00:00/2020-04-23/2020-04-23';
        if(url == urlk){
            console.log("yes");
        } else {
            console.log("no");
        }
        this.callOtherDomain(xhr, url);

        /*fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({offlineData: data})})
        this.chart.data = /*[
           {avgBreathrate : 17.60205098919108,
            date: "2020-04-14", 
            deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 17.60205098919108,
                date: "2020-04-14", 
                deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 17.53448765600153,
                    date: "2020-04-15", 
                    deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 0,
                        date: "2020-04-16", 
                        deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 0,
                            date: "2020-04-17", 
                            deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 0,
                                date: "2020-04-18", 
                                deviceID: "device:24:04:2019:14:00:00"},{avgBreathrate : 0,
                                    date: "2020-04-19", 
                                    deviceID: "device:24:04:2019:14:00:00"}]*/
        
        axios({method:'get', url: url})
            .then(response => {
                console.log(response.data);
                var data = [];
                if(this.state.span == "daily"){
                    let s = this.state.start.split('-');
                    let e = this.state.end.split('-');
                    let start0 = Number(s[2]);
                    let end0 = Number(e[2]);
                    for(let i = start0; i <= end0; i++){
                        console.log(data);
                        s[2] = i;
                        let isThereAdate = 0;
                        let currentDate = s.join('-');
                        for (let key in response.data){
                            if(response.data[key]["date"] == currentDate){
                                isThereAdate = 1;
                                data.push({"date": currentDate, "avgBreathrate":response.data[key]["avgBreathrate"]});
                                break;
                            }
                        }
                        if(isThereAdate == 0){
                            data.push({"date": currentDate, "avgBreathrate" : 0});
                        }
                    }
                } else {
                    var x = 60; //minutes interval
                    var times = []; // time array
                    var tt = 0; // start time
                    var data = [];

                    //loop to increment the time and push results in array
                    for (var i=0;tt<24*60; i++) {
                        var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                        var mm = (tt%60); // getting minutes of the hour in 0-55 format
                        times[i] = ("0" + hh).slice(-2) + ':' + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 24:00 format]
                        tt = tt + x;
                    }
                    for(let i = 0; i<times.length; i++){
                        let isThereAHour = 0;
                        for(let key in response.data){
                            if(Number(response.data[key]["date"].split(' ')[1]) == i){
                                isThereAHour = 1;
                                data.push({"date": times[i], "avgBreathrate": response.data[key]["avgBreathrate"] })
                            }
                        }
                        if(!isThereAHour){
                            data.push({"date": times[i], "avgBreathrate": 0})
                        }
                    }
                }

                this.chart.data = data;
                this.setState({
                    offlineData: response.data
                });
                console.log(this.state.offlineData);
            });
    }

    callOtherDomain(xhr, url){
        if(xhr){
            xhr.open('GET', url, true);
            xhr.withCredentials = true;
            xhr.send();
        }
    }

    drawPicture() {
        console.log(this.chart);
        this.chart.data = this.props.offlineData;
        console.log(this.chart.data);
    }

    componentDidMount(){
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        let categoryAxisX = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisX.dataFields.category = "date";
        categoryAxisX.title.text = "date";

        let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxisY.title.text = "avbBreathrate";

        //data source
        chart.data = this.state.offlineData;
        console.log(this.state.offlineData);

        //data value
        let series = chart.series.push(new am4charts.LineSeries());
        series.name = "Week offline data";
        series.dataFields.valueY = "avgBreathrate";
        series.dataFields.categoryX = "date";

        this.chart = chart;
    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        if (this.interval) {
            clearInterval(this.interval)
        }
        //this.pubnub.unsubscribe({channels: [myChannel]})
    }
    render(){
        console.log(this.state.offlineData);
        console.log(this.state.span);
        console.log(this.state.deviceID);
        console.log(this.state.start);
        console.log(this.state.end);
        console.log(this.state.timeSpan);

        return (
            <div>
                <Contactions contacts = {this.state.offlineData}/>
                <button onClick={this.clickEvent1}>Daily data</button>                
                <button onClick={this.clickEvent2}>Hourly data</button>
                <br/>
                <input 
                    type = 'text'
                    placeholder = 'deviceID'
                    onChange = {this.handleChange}
                    name = 'deviceID'
                    value = {this.props.deviceID}
                />
                <br/>
                <input
                    type = 'text'
                    placeholder = 'start'
                    onChange = {this.handleChange}
                    name = 'start'
                    value = {this.state.start}
                />
                <br/>
                <input
                    type = 'text'
                    placeholder = 'end'
                    onChange = {this.handleChange}
                    name = 'end'
                    value = {this.state.end}
                />
                <button onClick={this.fetchData}>fetch data</button>
                <div id = "chartdiv" style={{width: "100%", height: "500px"}} />
            </div>
        )
    }
}



export default Offline;