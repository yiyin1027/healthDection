import * as d3 from "d3";
import React, { Component } from "react";


export function D3blackbox(d3render) {
    return class Blackbox extends Component {
        componentDidMount() {
            d3render.call(this);
        }
        componentDidUpdate() {
            d3render.call(this);
        }

        render() {
            const transform = this.props.transform || "";
            return <g transform={transform} ref="anchor" />;
        }
    };
}


export const XAxis = D3blackbox(function() {
    const axis = d3
        .axisBottom()
        .tickFormat(d => d3.timeFormat("%H:%M %S")(d))
        .scale(this.props.xScale);

    d3
        .select(this.refs.anchor)
        .classed("xAxis", true)
        .transition()
        .call(axis);
});

export const YAxis = D3blackbox(function() {
    const axis = d3
        .axisLeft()
        .tickFormat(d => d)
        .scale(this.props.yScale);

    d3
        .select(this.refs.anchor)
        .classed("yAxis", true)
        .transition()
        .call(axis);
});

export const YGrid = D3blackbox(function() {
    const axis = d3
        .axisRight()
        .tickFormat(d => null)
        .scale(this.props.yScale)
        .tickSizeOuter(0)
        .tickSizeInner(this.props.plotWidth);

    d3
        .select(this.refs.anchor)
        .classed("yGrid", true)
        .call(axis);
});

export const Line = D3blackbox(function() {
    const path = d3
        .line()
        .x(d => d.x)
        .y(d => d.y).curve(d3.curveMonotoneX);

    const parent = d3.select(this.refs.anchor);

    const current = parent.selectAll(".valueLine").data([this.props.plotData]);

    current.interrupt();

    const enter = current
        .enter()
        .append("path")
        .classed("valueLine", true);

    const valueLine = current.merge(enter);

    current
        .transition()
        .attr("transform", `translate(${this.props.xSlide}, 0)`)
        .on("end", () => {
            valueLine.attr("d", path);
            current.attr("transform", null);
        });

});

const MakeData = () => {
    const rnd = d3.randomNormal(15, 2);
    const hr = d3.randomNormal(70,5);

    let data = d3
        .range(100)
        .map(i => {
            return { date: new Date(new Date().getTime() - 1000 * i), value: rnd() };
        })
        .reverse();

    return () => {
        data.push({ date: new Date(), value: rnd() });
        data.shift();
        let heart_rate=hr();

        return {data, heart_rate};
    };
};

const md = MakeData();

export const loadAllData = (callback = () => {}) => {
    callback(md());
};