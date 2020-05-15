import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col/';
import image from './home1.png';
import image1 from './home12.jpg'
import './Home.css';

var styles1 = {
    paddingTop: 100, paddingLeft: 40,
    color: '#204871'
};

var styles = {
    paddingLeft: 50, paddingTop: 20, paddingRight: 20,
    color: '#204871',
    fontSize: 17,
    fontFamily: 'Verdana, Geneva, sans-serif'
};

var contentl = [
    {
        "data": `Providing continuous, non-invasive and unobtrusive monitoring of vital signs and activities of seniors that blends into their lifestyle while they are alone in their apartments.`,
        "tag": `Goal`
    },

    {
        "data": `1.  Many seniors are not comfortable with wearables
2.  Fear of forgetting wearables
3.  Not liking wearables
4.  Not being able to press the button
5.  Privacy issues with surveillance cameras
6.  Hard to track wellbeing while residents are alone
7.  Difficulty monitoring dementia patients`,
        "tag": `Problems`,

    },
    {
        "image": image1,
        "tag": `Application Scenario`
    }
];

var contentr = [
    {
        "data": `1.  Monitoring activities, breathing and fall 
2.  Completely preserving privacy
3.  Relying on off-the-shelf inexpensive radar
4.  Patent protection`,
        "tag": 'Features'
    },
    {
        "tag": `Solutions`,
        "data": `We at the Health Sensor Solutions (HSS) are developing a smart radar sensor system easily deployable in a corner of the room, monitoring the patient’s health automatically and notifying caregivers seamlessly. 

Versions:
1.  Stand-alone solution: Monitoring breathing and activities
2. Cloud-based solution: Monitoring fall, breathing patterns and activities and providing notifications in emergency situations`,
    },
    {
        "data": `1.  Serious concerns in detecting breathing, activities and falls
2.  Elderly population is on the rise; 55M over 65
3. Projected growth in the industry from $219.9 billion in 2012 to $346 billion 2040`,
        "tag": `Opportunity`
    }

];


class ColumnData extends React.Component {
    render() {
        return (
            <div>{
                this.props.contents.map(row => {
                    return (
                        <div key={row.tag}>
                            <div>
                                <h1 style={styles1}>{row.tag}</h1>
                                {row.image ? (
                                    <div style={{paddingTop: 20, paddingLeft: 100}}><img src={row.image} alt="boohoo"/>
                                    </div>
                                ) : (
                                    <pre className="preformatted" style={styles}>{row.data}</pre>
                                )}
                            </div>
                        </div>
                    );
                })
            }</div>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div className="home-component">
                <Row type="flex" justify="center" align="middle" className="home-banner">
                    <Col xs={20} sm={20} md={12} lg={18}>
                        <div className="banner-title">Welcome to HSS</div>
                        <div className="banner-title">Enabling Contact-Less Monitoring</div>
                    </Col>
                </Row>

                <div className="home-content">
                    <h1 style={{color: '#204871'}} align="center">Contact-less Monitoring System for
                        Seniors</h1>
                    <div className="wrap" align="center">
                        <div className="fleft">
                            <ColumnData contents={contentl}/>
                        </div>
                        <div className="fright">
                            <ColumnData contents={contentr}/>
                        </div>
                    </div>
                    <h1 style={{paddingTop: 50, paddingLeft: 500, color: '#204871'}}>User Interface (Sample)</h1>
                    <div style={{paddingTop: 40, paddingLeft: 340}}><img src={image} alt="boohoo"/></div>
                </div>
            </div>
        );
    }
}

export default Home;