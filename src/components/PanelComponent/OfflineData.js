import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Contactions from './contact';
import axios from 'axios';
import SearchBox from './inputBox';
import Charts from './offlineChart';


class Offline extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.clickEvent1 = this.clickEvent1.bind(this);
        this.clickEvent2 = this.clickEvent2.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            offlineData: [],
            span:'',
            deviceID: '',
            start: '',
            end:''
        };

        this.apiUrl = 'http://localhost:8080/api/v1/stats'
    }

    clickEvent1(){
        this.setState({
            span:'daily'
        })
    }

    clickEvent2(){
        this.setState({
            span:'hourly'
        })
    }

    handleChange(event) {
        let o = {}
        o[event.target.name] = event.target.value;
        this.setState(o)
    }

    fetchData(){
        axios({method:'get', url: `${this.apiUrl}/${this.state.span}/${this.state.deviceID}/${this.state.start}/${this.state.end}`})
            .then(response => {
                this.setState({
                    offlineData: response.data
                })
        })
    }

    componentDidMount(){
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        let DurationAxis = chart.xAxes.push(new am4charts.DurationAxis());
        DurationAxis.title.text = "time";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "breathrate";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "id"
        series.dataFields.valueX = "breathrate";
        this.chart = chart;
    }

    ChangeState(){
        let 
    }
        
    /*handleChange(e) {
        const {value} = e.target;
        this.setState({
            offlineData: value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const {post} = this.state;
        axios({
            method: 'post',
            url: `${apiUrl}/posts`,
            data: post
        })
    }

    handleChange(e){
        e.preventDefault();

        const {id} = e.target;

        axios({
            method: 'delete',
            url: `${apiUrl}/posts/${id}`
        })
    }*/

    /*
        let chart = am4core.create('chartdiv', am4charts.XYChart);
        let DurationAxis = chart.xAxes.push(new am4charts.DurationAxis());
        DurationAxis.title.text = "time";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "breathrate";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "id"
        series.dataFields.valueX = "breathrate";
        */
    

    render(){
        /*console.log(this.state.OfflineData);
        console.log(this.state.span);
        console.log(this.state.deviceID);
        console.log(this.state.start);
        console.log(this.state.end);*/
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
                {/*this.fetchData()*/}
                <div id = "chartdiv" style={{width: "100%", height: "500px"}} />
            </div>
        )
    }
}
export default Offline;