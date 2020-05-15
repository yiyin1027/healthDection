import React, {Component} from 'react';
import {Menu} from 'antd/lib/index';
import {NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import './CustomHeader.css';


class CustomHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentKey: localStorage.getItem('navPage') || 'Home'
        }
    }

    onItemSelect = ({item, key, keyPath}) => {
        this.setState({currentKey: key});
        localStorage.setItem('navPage', key);
    };

    render() {
        return (
            <nav>
                <div className={'logo'}/>
                <Menu theme="dark"
                      onClick={this.onItemSelect}
                      mode="horizontal"
                      selectedKeys={[this.state.currentKey]}
                      style={{lineHeight: '64px'}}>
                    <Menu.Item key='Home'><NavLink to={'/'}>Home</NavLink></Menu.Item>
                    <Menu.Item key='Breathing'><NavLink to={'/breathing'}>Breathing</NavLink></Menu.Item>
                    <Menu.Item key='Falls'><NavLink to={'/falls'}>Falls</NavLink></Menu.Item>
                    <Menu.Item key='FAQ'><NavLink to={'/faq'}>FAQ</NavLink></Menu.Item>
                    <Menu.Item key='Aboutus'><NavLink to={'/about'}>About us</NavLink></Menu.Item>
                    <Menu.Item key='Dashboard'><NavLink to={'/dashboard'}>DashBoard</NavLink></Menu.Item>
                    <Menu.Item key='data'><NavLink to={'/data'}>Real-time data</NavLink></Menu.Item>
                </Menu>
            </nav>
        )
    }
}


export default CustomHeader;