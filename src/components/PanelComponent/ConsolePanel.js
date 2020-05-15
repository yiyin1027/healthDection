import React from "react";
//import PubNubReact from "pubnub-react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Col, Divider, Progress, Row, Skeleton, Statistic, Typography, Modal, Descriptions } from "antd";
import getMsg from '../../Client';

//const myChannel = 'cloudChannel';
const {Title,} = Typography;

export default class ConsolePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            deviceID: null,
            timestamp: null,
            BreathRate: {val: 0, len: 0},
            HeartRate: {val: 0, len: 0},
            Falldetected: {val: 0, len: 0, lastDetect:'NA'},
            series: [],
        };
        /*this.pubnub = new PubNubReact({
            publishKey: 'pub-c-a49f577d-81c8-43c9-922e-3b13d0bbc91d',
            subscribeKey: 'sub-c-2c446f30-32cd-11e9-aca0-3eee1dbf820c'
        });
        this.pubnub.init(this);*/
    }

    handleClose=()=>{
        this.setState({show:false})
    }

    getRunningAvg = (item) => (item.len * item.val + item.val) / (item.len + 1);

    //fetching data before the component mount
    componentDidMount() {
        let msg = getMsg;

        function real_time_data(msg){
            let time = new Date();
            let clock = msg.message.timestamp.split(':');
            let tempdata = {
                date: new Date(time.getFullYear(), time.getMonth(), time.getDate(), clock[0], clock[1], clock[2]),
                value: msg.message.BreathRate
            }
            this.chart.addData(tempdata, (this.chart.data.length > 60) ? 1 : 0);

            this.setState({
                deviceID: msg.message.deviceID,
                timestamp: msg.message.timestamp,
                BreathRate: {val: msg.message.BreathRate, len: this.state.BreathRate.len + 1},
                HeartRate: {val: msg.message.HeartRate, len: this.state.HeartRate.len + 1},
                Falldetected: {val: msg.message.Falldetected, len: this.state.Falldetected.len + 1,lastDetect:this.state.Falldetected.lastDetect},
            })

            if(this.state.Falldetected.val===1){
                this.setState({
                    show:true,
                    Falldetected:{lastDetect:tempdata.date.toLocaleString()}
                })
            }
        };

        real_time_data(msg);
    }

    componentDidMount() {
        am4core.useTheme(am4themes_animated)
        const chart = am4core.create('chartdiv', am4charts.XYChart);
        chart.paddingRight = 20;
        chart.zoomOutButton.disabled = true;

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;
        dateAxis.dateFormats.setKey("second", "mm:ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.tensionX = 0.8;

        //styling the chart to show the threshold
        const moderate = valueAxis.createSeriesRange(series);
        moderate.value = 11.5;
        moderate.endValue = 20;
        moderate.contents.stroke = am4core.color("#008800");

        const critical = valueAxis.createSeriesRange(series);
        critical.value = 20;
        critical.endValue = 1000;
        critical.contents.stroke = am4core.color("#880000");

        dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
            let dataItem = target.dataItem;
            if (dataItem.date && dataItem.date.getTime() === am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
                target.verticalCenter = "middle";
                target.horizontalCenter = "left";
                return -90;
            } else {
                target.verticalCenter = "bottom";
                target.horizontalCenter = "middle";
                return 0;
            }
        });

        // horizontal Scrollbar
        // const scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // chart.scrollbarX = scrollbarX;

        //cursor and tooltip on chart
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = 'none';
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

    render() {
        return (
            <div style={{padding: 24, background: '#fff', minHeight: 360}} className={'mainContent'}>
                <Modal title="Title" visible={this.state.show} onOk={this.handleClose} onCancel={this.handleClose}>
                    <p>Fall detected</p>
                </Modal>
                <Row gutter={8} className={'firstRow'} justify={'center'}>
                    <Col sm={24} md={18} align={'middle'}>
                        <Title level={4}>Real time Breath rate</Title>
                        <div id="chartdiv" style={{width: "100%", height: "300px"}}></div>
                    </Col>
                    <Col sm={24} md={6} align={'middle'}>
                        <Descriptions title={`Patient${0} info`} column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item label="DeviceID">001</Descriptions.Item>
                            <Descriptions.Item label="ID">2j3hc819sd1</Descriptions.Item>
                            <Descriptions.Item label="Phone">6130000000</Descriptions.Item>
                            <Descriptions.Item label="Address">177 Huron Rd.</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Divider type={"horizontal"}/>
                <Row gutter={8} className={'SeocondRow'}>
                    <Col sm={24} md={8} align={'middle'} className={'HeartRate'}>
                        <Title level={4}>Heart rate showed</Title>
                        <Progress type="dashboard"
                            // percent={this.state.hrList[this.state.hrList.length - 1]}
                                  percent={this.state.HeartRate.val}
                                  format={hr => `Hr:${Math.round(hr)}`}
                                  default={'default'} strokeColor={'#D32F2F'}/>
                        <Statistic title={'Average Heart Rate'} value={this.getRunningAvg(this.state.HeartRate)}/>
                    </Col>
                    <Col sm={24} md={8} align={'middle'} className={'BreathRate'}>
                        <Title level={4}>Breath rate showed</Title>
                        <Progress type="dashboard"
                            // percent={this.state.data[this.state.data.length - 1].value}
                                  percent={this.state.BreathRate.val}
                                  format={br => `Br:${Math.round(br)}`}
                                  default={'default'} strokeColor={'#55a7d3'}/>
                        <Statistic title={'Average Breath Rate'} value={this.getRunningAvg(this.state.BreathRate)}/>
                    </Col>
                    <Col sm={24} md={8} align={'middle'}>
                        <Title level={4}>Health condition summary</Title>
                        <Descriptions title={`Patient${0} info`} column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}>
                            <Descriptions.Item label="last fall detect">{this.state.Falldetected.lastDetect}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        );
    }
}

