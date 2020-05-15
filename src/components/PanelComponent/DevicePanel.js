import React from "react";
import {List} from "antd";
import {Link, Route} from "react-router-dom";

const consll = ({match}) => <h3>{match.params.id}</h3>;

export default class DevicePanel extends React.Component {

    componentWillMount() {
        this.listData = [];
        for (let i = 0; i < 1; i++) {
            this.listData.push({
                deviceID: i,
                href: `${this.props.match.url}/${i}`,
            })
        }
    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.listData}
                    renderItem={item => (
                        <List.Item key={item.deviceID}>
                            <Link to={item.href}>{'device:' + item.deviceID}</Link>
                        </List.Item>
                    )}
                />
                <Route path={`/data`} component={consll}/>
            </div>
        );
    }
}