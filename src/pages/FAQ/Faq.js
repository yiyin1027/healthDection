import React from 'react';
import PropTypes from 'prop-types';
import './Faq.css'

let content = [
    {
        Question: "1.	What is the range of the sensor?",
        Answer: "Up to 10 m. It will cover one room and the bathroom"
    },
    {
        Question:"2.	Is it the sensor harmful?",
        Answer:"The radiation level is smaller than typical WiFi device."
    },
    {
        Question:"3.	In what sense is it better than wearables?",
        Answer:"It does not require any change in the resident's normal daily activities nor any  change in caregiver's normal routine."
    }
];

class Items extends React.Component {
    render() {
        return (
            <div>
                <h1 className={'headStyle'}>FAQs</h1>
                {this.props.contents.map((row, index) => {
                    return (
                        <div key={index+'FAQs'}>
                            <h2 className={'faqQ'}>{row.Question}</h2>
                            <h3 className={'faqA'}>{row.Answer}</h3>
                        </div>
                    );
                })}
            </div>
        );
    }
}

Items.propTypes={
    contents:PropTypes.array
};

class Faq extends React.Component {
    render() {
        return (
            <div>
                <Items contents={content}/>
            </div>
        );
    }
}


export default Faq;