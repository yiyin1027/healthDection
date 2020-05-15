import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {Layout, Menu, Icon, Typography, List, Modal,} from 'antd';
import Amplify from "aws-amplify";
import awsmobile from "../../aws-exports";
import {withAuthenticator} from "aws-amplify-react";

import ConsolePanel from '../../components/PanelComponent/ConsolePanel';
import DevicePanel from '../../components/PanelComponent/DevicePanel';
import S3Content from '../../components/PanelComponent/File';
import Offline from '../../components/PanelComponent/offlineChart';
 


const {Content, Sider,} = Layout;
const SubMenu = Menu.SubMenu;

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            key: '1',
        }
    }


    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    onMenuClick = (event) => {
        // event.key give the key selected
        // event.keyPath give the full path to the sub item selected
        this.setState({key: event.key})
    };

    render() {
        const renderItem = (key) => {
            switch (key) {
                case "1":
                    return <DevicePanel/>;
                case "2":
                    return <ConsolePanel/>;
                case "3":
                    return <S3Content match={{url: 'dashboard'}}/>;
                case "4":
                    return <Offline />
                default:
                    return <ConsolePanel/>
            }
        };

        let {key, collapsed} = this.state;
        const match = this.props.match;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}>

                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onMenuClick}>
                        <Menu.Item key="1"><Link to={`${match.url}/device`}>
                            <Icon type={'desktop'}/><span>Devices</span></Link></Menu.Item>
                        <Menu.Item key="2"><Link to={`${match.url}/console`}>
                            <Icon type={'pie-chart'}/><span>Dash board</span></Link></Menu.Item>
                        <Menu.Item key="3"><Link to={`${match.url}/file`}>
                            <Icon type="file"/><span>File</span></Link></Menu.Item>
                        <Menu.Item key="4"><Link to={`${match.url}/offline`}>
                            <Icon type ='offline'/><span>OfflineData</span></Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                        {/*{renderItem(key)}*/}
                        <Route exact path={`${match.url}`} component={()=><h1>DashBoard</h1>}/>
                        <Route path={`${match.url}/console`} component={ConsolePanel}/>
                        <Route path={`${match.url}/device`} component={DevicePanel}/>
                        <Route path={`${match.url}/file`} component={S3Content}/>
                        <Route path={`${match.url}/offline`} component={Offline}/>
                    </Content>
                </Layout>
                
            </Layout>
        );
    }
}

Amplify.configure(awsmobile);
export default withAuthenticator(DashBoard, {includeGreetings: true});
