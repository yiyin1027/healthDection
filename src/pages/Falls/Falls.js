import React from 'react'
import PropTypes from 'prop-types'
import picture from './Fallpicture.png'
import './Falls.css'

var styles = {
    paddingLeft: 200, paddingRight: 200, paddingTop: 20,
    color: '#204871',
    fontSize: 15,
    fontFamily: 'Verdana, Geneva, sans-serif'
};

var styles2 = {
    paddingTop: 50, paddingLeft: 100,
    color: '#204871',
    textAlign: 'center'
};

var styles1 = {
    paddingTop: 50, paddingLeft: 100,
    color: '#204871'
};


var content = [

    {
        "heading": `Problem`,
        "data": `According to the World Population Aging 2013 report [1] the world population over the age of 60 is 841 million and growing, and 14% of this population is more than 80 years of age. Canadian census data reported that at 15.7% of the population, the number of seniors above 65 is at the highest level in history, and is continuing to grow (http://www.statcan.gc.ca/daily-quotidien/140926/dq140926b-eng.htm). Additional information demonstrates increasing demand for communal living, resulting in a boom in new retirement residence construction. We have confirmed this with a local developer, who also has shifted business away from condominiums to retirement residences. 

A simple fall is one of the greatest concerns for the elderly population, their families, and the operators of retirement and long-term care facilities. One of three adults aged 65 or older falls each year and 30% of these falls results in serious injuries according to the World Health Organization [2], and that amount rises to 50% by the age of 80. Reports from the nursing homes are that a 100-bed facility will have between 100-200 falls per year, and several more that go unreported [3].`
    },

    {
        "heading": `Impact`,
        "data": `There are no widely available, non-contact solution that detect falls and simultaneously monitor body position and basic vitals. Cameras were widely rejected due to privacy concerns. There are some motion sensors but the information is limited to indiscriminant movement. Others are considering alternate solutions such as radar, however none have been commercialized. It is possible that vitals monitoring could be integrated into the wearables, but compliance is a more complicated issue.`
    },

    {
        "heading": `How can it be remedied?`,
        "data": `Detection of falls using the radar was performed in [4] where it was observed that different parts of the human body move at different velocities during fall. The system for detecting fallen person [5] relies on the ability of the radar to scan the space close to the floor. A fall is detected if specific change in physiological parameters and/or specific motion are observed in that scanned area. Another fall detection method that relied on the distance of the torso from the floor was reported in [6]. This method required two radars. A biometric radar system was invented by Raytheon for identifying positional states of people using neural networks [7]. Extracted breathing, heartbeat and gait signals using two or more antennas were used to train a neural network. 

Recently, two research groups distinguished themselves in their work on fall detection. The MIT group led by Dr. Katabi has recently started a company called Emerald that uses through-the-wall radar to detect falls and monitor the state of the person (stationary or moving). The technology is based on algorithms that detect motions of different parts of the body and therefore reconstruct a rough silhouette of a person. The group also worked on breathing detection based on frequency-modulated CW radar that sweeps the band from 5.46 to 7.24 GHz [8]. The group from Villanova University lead by Dr. Amin developed advanced algorithms for fall detection based on Doppler signatures of human motion during fall [9]. The radar used was inexpensive pulse-Doppler range control radar operating at 5.8 GHz. As such, this radar cannot detect the breathing rate.`
    },

    {
        "heading": `Our approach: Posture and activity detection`,
        "data": `Machine learning algorithms have been developed to extract features from the signal that looks like this:`,
        "data1": `
Our innovation is based on the following:

I.	Distinguishing between fallen people on the ground and sitting or standing people through a set of extracted features from the breathing signal spectrum. This is the first work that relies on correct estimation of breathing to detect posture and these additional physiological features can make a difference in improving reliability of posture detection. 
II.	Reducing the false alarms in human detection by applying the statistical properties of the signal (skewness of the amplitude squared) for the range profiles at every range-bin in UWB radars resulting in more reliable ranging of a subject.
III.	Improving reliability in human breathing detection through a novel algorithm based on singular value decomposition (SVD) and skewness variations. `,
        "image": picture
    },

    {
        "heading": `Our publications`,
        "data": `We have worked in the area of breathing rate estimation in last several years. Below is the sample of our research publications:

1.	M. Forouzanfar, M. Mabrouk, S. Rajan, M. Bolic, H. R. Dajani, “Event Recognition for Contactless Activity Monitoring Using Phase-Modulated Continuous Wave Radar,” IEEE Transactions on Biomedical Engineering, Vol: 64, Issue: 2, pp. 479 – 491, Feb. 2017.
2.	M. Mabrouk at al., Remote sensing of human breathing at a distance, US patent application, US20150369911 A1, 2015.
3.	Z. Baird, I. Gunasekara, M. Bolic, S. Rajan, Principal Component Analysis-Based Occupancy Detection with Ultra Wideband Radar, late news paper, MWSCAS 2017.`

    },

    {
        "heading": `References`,
        "data": `
[1]	Department of Economic and Social Affairs Population Division,  United Nations, “World Population Ageing  2013,” New York, 2013.
[2]	World Health Organization, “Global report on falls prevention in older age,” http://www.who.int/ageing/publications/Falls_prevention7March.pdf, 2007, [Accessed 1 04 2015].
[3]	Centers for Desease Control and Prevention, “Falls in Nursing Homes,” http://www.cdc.gov/HomeandRecreationalSafety/Falls/nursing.html, 2015, [Accessed 1 04 2015].
[4]	L. Liu, M. Popescu, M. Skubic, M. Rantz, T. Yardibi, P. Cuddihy, “Automatic fall detection based on doppler radar motion signature,” 5th PervasiveHealth Workshop, 2011.
[5]	P. E. Cuddihy et al.,”Radar based systems and methods for detecting a fallen person,” U.S.Patent 0 002 434 A1, Jan., 3, 2013.
[6]	J. Osterwall, ”Method and apparatus for a body position monitor using radar,” U.S. Patent, US7567200 B1, Nov, 2011.
[7]	W. Dwelly, V.N. Adams, ”Biometric radar system and method for identifying persons and positional states of persons,” U.S. Patent 8 026 840 B2, Sep, 2011.
[8]	F. Adib, H. Mao, Z. Kabelac, D. Katabi, R. C. Miller, “Smart Homes That Monitor Breathing and Heart Rate,“ ACM CHI'15, Seoul, South Korea, April 2015.
[9]	M.G. Amin, Y.D.Zhang, F. ahmad, K.C. Ho, “Radar signal processing for elderly fall detection: The future for in-home monitoring,“ IEEE Signal Processing Magazine, March 2016. `

    }

];

class Rows extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.contents.map(row => {
                        return (
                            <div key={row.heading}>
                                <h2 style={styles1}>{row.heading}</h2>
                                <pre className="preformatted" style={styles}>{row.data}</pre>
                                {row.image ?
                                    <div style={{paddingTop: 50, paddingLeft: 400}}><img src={row.image} alt="boohoo"/>
                                    </div> : null}
                                {row.data1 ? <pre className="preformatted" style={styles}>{row.data1}</pre> : null}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

class Falls extends React.Component {

    render() {
        return (
            <div className="falls-component">
                <div className="falls-content">
                    <h1 style={styles2}>Falls, posture and activities</h1>
                    <Rows contents={content}/>
                </div>
            </div>
        );
    }
}

Rows.propTypes = {
    contents: PropTypes.array
}

export default Falls;