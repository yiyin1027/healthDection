import React from 'react';
import awsmobile from '../aws-exports';
import {Button, Col, Progress, Row, Statistic, Form, Input, Card, List} from "antd";
import {Connect, withAuthenticator} from "aws-amplify-react";
import Amplify, {API, graphqlOperation} from 'aws-amplify';

import * as d3 from 'd3';
import {Line, loadAllData, XAxis, YAxis, YGrid} from "./LineChartComponent";

/*Amplify.configure(awsmobile);
const ListTests = `query ListTests{listTests(limit:5){items{deviceID timestamp BreathRate HeartRate falldetected}}}`;
const GetTest = `query GetTest($deviceID: String! $timestamp: String!){
  getTest(deviceID:$deviceID,timestamp:$timestamp){
    deviceID
    timestamp
    BreathRate
    HeartRate
    falldetected
  }}`;*/

class TestList extends React.Component {
    testItems() {
        return this.props.tests.map(test => <List.Item
            key={test.timestamp}>{`${test.deviceID} Time: ${test.timestamp} BR: ${test.BreathRate} HR: ${test.HeartRate} fall: ${test.falldetected}`}</List.Item>)
    }

    render() {
        return (
            <List headers={<div>My data</div>}>
                {this.testItems()}
            </List>
        );
    }
}

class TestListLoader extends React.Component {
    render() {
        return (
            <Connect query={graphqlOperation(ListTests)}>
                {({data, loading, errors}) => {
                    if (loading) {
                        return <div>loading...</div>
                    }
                    if (!data.listTests) return;
                    return <TestList tests={data.listTests.items}/>
                }}
            </Connect>
        );
    }
}

class TestItem extends React.Component {
    render() {
        if (this.props.test) {
            const {timestamp, br, hr, falldetected, deviceID} = this.props.test;
            return (
                <Card title={'ID: ' + deviceID}>
                    <p>{'time: ' + timestamp}</p>
                    <p>{'br: ' + br}</p>
                    <p>{'hr: ' + hr}</p>
                    <p>{'fall: ' + falldetected}</p>
                </Card>
            );
        } else
            return <Card title={'empty'}/>
    }
}

class TestItemLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, val) => {
                if (!e) {
                    console.log('submit received: ', val)
                }
            }
        )
        const result = await API.graphql(graphqlOperation(GetTest, {
            deviceID: this.state.deviceID,
            timestamp: this.state.timestamp
        }))
        console.log(result);
        debugger
        if (result.data.getTest)
            this.setState({
                deviceID: result.data.getTest.deviceID,
                timestamp: result.data.getTest.timestamp,
                br: result.data.getTest.BreathRate,
                hr: result.data.getTest.HeartRate,
                falldetected: result.data.getTest.falldetected,

            })
    }

    handleChange = (event) => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Form onSubmit={this.handleSubmit} className={'getItemForm'} style={{width: 300}}>
                        <Form.Item>
                            {getFieldDecorator('deviceID', {
                                rules: [{required: true, message: 'Input is required'}]
                            })(
                                <Input onChange={this.handleChange} placeholder={'Device ID'} name={'deviceID'}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('timestamp', {
                                rules: [{required: true, message: 'time stamp is required'}]
                            })(
                                <Input onChange={this.handleChange} placeholder={'Time stamp'} name={'timestamp'}/>
                            )}
                        </Form.Item>
                        <Button type={"primary"} htmlType={"submit"}>get</Button>
                    </Form>
                </Col>
                <Col span={12}>
                    <TestItem test={this.state}/>
                </Col>
            </Row>
        );
    }
}

const WrappedTestItemLoader = Form.create({name: 'getItemForm'})(TestItemLoader);

class LineChart extends React.Component {

    updateScale(props) {
        const data = props.data;
        const xScale = d3.scaleTime();
        const yScale = d3.scaleLinear().nice();

        const xDomain = d3.extent(data, d => d.date);
        const yDomain = props.yDomain || [0, d3.max(data, d => props.yFn(d))];

        xScale
            .domain(xDomain)
            .range([0, props.width - (props.margin.left + props.margin.right)]);


        yScale
            .domain(yDomain)
            .range([props.height - (props.margin.top + props.margin.bottom), 0]);

        return {xScale, yScale}
    }

    updatePlotSize(props) {
        const plotWidth =
            props.width - (props.margin.left + props.margin.right);
        const plotHeight =
            props.height - (props.margin.top + props.margin.bottom);

        return {plotWidth, plotHeight}


    }


    render() {
        const {xScale, yScale} = this.updateScale(this.props);

        const {plotWidth, plotHeight} = this.updatePlotSize(this.props);

        const metaData = {
            xScale: xScale,
            yScale: yScale,
            plotWidth: plotWidth,
            plotHeight: plotHeight,
            xSlide: -xScale(this.props.xFn(this.props.data[1]))
        };
        const plotData = {
            plotData: this.props.data.map((d, i) => {
                return {
                    id: i,
                    data: d,
                    x: xScale(this.props.xFn(d)),
                    y: yScale(this.props.yFn(d))
                };
            })
        };

        return (
            <svg width={this.props.width} height={this.props.height}>
                <g
                    className="axisLayer"
                    width={plotWidth}
                    height={plotHeight}
                    transform={`translate(${this.props.margin.left}, ${this.props.margin
                        .top})`}
                >
                    <YGrid {...metaData} />
                    <XAxis {...metaData} transform={`translate(0,${plotHeight})`}/>
                    <YAxis {...metaData} />
                </g>
                <g
                    className="plotLayer"
                    width={plotWidth}
                    height={plotHeight}
                    fill={'none'}
                    stroke={'#1E88E5'}
                    d={'line'}
                    strokeLinejoin={'round'}
                    transform={`translate(${this.props.margin.left}, ${this.props.margin
                        .top})`}
                >
                    <Line {...metaData} {...plotData} />
                </g>
            </svg>
        );
    }
}

class Data extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            hrClick: false,
            hrList: []
        }
    }

    componentWillMount() {
        this.load()
    }

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    load() {
        loadAllData(this.loaded.bind(this));
        this.timeout = setTimeout(() => {
            this.load()
        }, 1000)
    }

    loaded(data) {
        this.setState(previousState => ({data: data.data, hrList: [...previousState.hrList, data.heart_rate]}))
    }

    onProgressClick = () => {
        this.setState({hrClick: !this.state.hrClick})
    };

    getAvgHR = () => (
        (this.state.hrList.reduce((prev, next) => prev + next, 0) / this.state.hrList.length).toFixed(2)
    );

    render() {
        return (
            <Row gutter={16}>
                <Col span={14}>
                    <TestListLoader/>
                    <WrappedTestItemLoader/>
                    <LineChart
                        className="LineChartComponent"
                        data={this.state.data}
                        width={750}
                        height={400}
                        xFn={d => d.date}
                        yFn={d => d.value}
                        yDomain={[0, 30]}
                        margin={{top: 20, left: 40, bottom: 20, right: 20}}
                    />
                </Col>
                <Col span={10}>
                    <Button onClick={this.onProgressClick}>Change view</Button>
                    {(!this.state.hrClick) ?
                        <Progress type="dashboard" percent={this.state.hrList[this.state.hrList.length - 1]}
                                  format={percent => `Hr:${Math.round(percent)}`} default={'default'}
                                  strokeColor={'#D32F2F'}/> :
                        <Statistic title={'Average'} value={this.getAvgHR()}/>}
                </Col>
            </Row>
        );
    }
}

export default withAuthenticator(Data, {includeGreetings: true});