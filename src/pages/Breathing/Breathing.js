import React from 'react'
import './Breathing.css'
import PropTypes from 'prop-types'

var styles = {
    paddingLeft: 200, paddingRight: 200, paddingTop: 20,
    color: '#204871',
    fontSize: 15,
    fontFamily: 'Verdana, Geneva, sans-serif'
};

var styles1 = {
    paddingTop: 50, paddingLeft: 100,
    color: '#204871'
};


var content = [
    {
        data: `There are two main problem that are directly related to the breathing rate and patterns of the patient: abnormal breathing patterns and the minimal view a doctor has into the life of their patient. 

Abnormal breathing patterns are most often attributed to sleep apnea or hyperventilation. Often it is not known if a patient has breathing issues or not; This can be dangerous in one’s old age. The current method of testing for breathing issues is to use a breathing belt. Breathing belts are not taken home by the patient and so, the tests are relatively short. The lack of the patient’s normal environment and the short duration of the test provide a skewed set of results from the test. 
The point above also links to the problem of the limited time that doctors spend with seniors. Doctors can do in lab tests on their patients, however, often patients deteriorate greatly between doctor visits, while having no doctor supervision. A second example of this is heart trouble. Doctors can perform tests to determine the condition of their patients. These cardiologists have no way of knowing anymore about the patient, apart from their biannual 1-2-hour checkups with their family doctor.`,
        heading: `Problem`
    },

    {
        data: `Chronic Heart Failure (CHF) currently harms almost 400,000 Canadians and the prevalence is projected to increase [1], [2]. Patients suffering CHF experience debilitating breathlessness and more than 50,000 Canadians per year require hospitalization for emergency treatment costing almost $500 Million [2], [3]. Unfortunately, 24% of these patients are re-admitted within a year with further decompensated CHF [4]. The Canadian government has committed to improving community care for patients with CHF and seeks specifically to reduce hospital readmission for CHF [5]. Recent reports that decompensated CHF can reliably be predicted and emergency hospitalization prevented using a variety of monitoring systems are exciting but tempered by the fact that these systems are expensive and invasive, requiring to be surgically placed within the patients’ body [6], [7].`,
        heading: `Impact that is caused by the problem`
    },

    {
        data: `In response to these limitations, much effort has been directed to develop inexpensive, non-invasive predictors of decompensated CHF. Progress has been made in monitoring breathing patterns such as irregular or Cheyne-Strokes respiration [8], central sleep apnea and, recently, the creation of a “respiration stability index” (RSI) [9], [10]. 

At the HSS, we have developed a method for monitoring and scanning for irregularities in the breathing of patients. The method that we have developed is a fully non-contact method of gathering and analyzing the breathing rate of the patient. This system solves the problems of a breathing belt: it is comfortable and can gather large amounts of data for long periods of time. Additionally, our system will allow a doctor to either see the patients breathing patterns in real time and to see an extensive history of the patients breathing patterns. This allows doctors to be more informed about their patients during doctor visits and allows a doctor to check in with a patient (that suffers from CHF) remotely.`,
        heading: `How can it be remedied?`
    },

    {
        data: `The system uses off-the-shelf radar circuit board and antenna to send low power microwave frequency pulsed signals towards patient and receive reflected signals from its body. The data received is processed by the patent-pending algorithms made by the HSS team. These algorithms will recognize breathing from general noise that is present in the radar signal. The rate and inhale/exhale graph are derived from the amount of time the radar signal reflected by the patient body takes to return to the antenna. The time these signals take to return, correlates to the distance from the radar to the patient’s chest. As the radar detects the patients, the algorithms can learn what is normal breathing and with is abnormal/ alarming breathing rates and patterns. Upon detection of irregular breathing, the system can trigger an alert or send a notification to the patient’s caregiver or family members. `,
        heading: `How the tech works?`
    },

    {
        data: `We have worked in the area of breathing rate estimation in last several years. Below is the sample of our research publications:

1.	M. Forouzanfar, M. Mabrouk, S. Rajan, M. Bolic, H. R. Dajani, “Event Recognition for Contactless Activity Monitoring Using Phase-Modulated Continuous Wave Radar,” IEEE Transactions on Biomedical Engineering, Vol: 64, Issue: 2, pp. 479 – 491, Feb. 2017.
2.	M. Mabrouk, S. Rajan, M. Bolic, M. Forouzanfar, H. R. Dajani and I. Batkin, “Human breathing rate estimation from radar returns using harmonically related filters,” Journal of Sensors, Hindawi Publishing Corporation, Article ID 9891852, Vol. 2016, 2016. 
3.	I. Nejadgholi, S. Rajan, M. Bolic, “Time-Frequency Based Contactless Estimation of Vital Signs of Human While Walking Using PMCW Radar,” 2016 IEEE 18th International Conference on e-Health Networking, Applications and Services (Healthcom).
4.	M. Mabrouk, S. Rajan, M. Bolic, I. Batkin, H. R. Dajani, V. Z. Groza, “Model of Human Breathing Reflected Signal Received by PN-UWB Radar,” EMBC 2014.
5.	M. Mabrouk, S. Rajan, M. Bolic, I. Batkin, H. R. Dajani, V. Z. Groza, “Detection of Human Targets behind the Wall Based on Singular Value Decomposition and Skewness Variations,” pp. 1466 – 1470, IEEE Radar Conference 2014.
6.	X. Zhang, Characterizing performance of the radar system for breathing and heart rate estimation in real-life conditions, M.Sc. thesis, University of Ottawa, Canada, 2017.`,
        heading: `Our publications`
    },

    {
        data: `
[1]	Chow CM, et al, Regional variation in self-reported heart disease prevalence in Canada, Canadian Journal of Cardiology, 2005;21(14):1265-71.
[2]	Johansen H, et al, On the rise: The current and projected future burden of congestive heart failure hospitalization in Canada, Canadian Journal of Cardiology, 2003;(19(4):430-5.
[3]	Tran DT, et al, The current and future financial burden of hospital admissions for heart failure in Canada: a cost analysis, CMAJ Open, 2016;4(3) E365-E370.
[4]	Lee DS, et al, Regional outcomes of heart failure in Canada, Canadian Journal of Cardiology, 2004;20(6):599-607.
[5]	Patients First Action Plan for Health Care MOHLTC 2015, http://www.health.gov.on.ca/en/ms/ecfa/healthy_change/docs/rep_patientsfirst.pdf accessed 2017).
[6]	Mooney DM, et al, Evolution from electrophysiologic to hemodynamic monitoring: the story of left atrial and pulmonary artery pressure monitors, Frontiers n  Physiology 2015;6(271)
[7]	Small RS and Tang WH, Assessing Impedance in Heart Failure: From Device Diagnostics to Population Health Opportunities, Circulation Heart Failure 2016;9(1):e2761.
[8]	Brack T, Cheyne-Stokes respiration in patients with congestive heart failure, Swiss Med Weekly 2003;133:605–610.
[9]	Asanoi H, et al, Respiratory instability in patients with chronic heart failure: Quantification and application to telemedical management. Proc 35th Annu Conf IEEE Eng Med Biol, Osaka, July 2013.
[10]	Takagawa J, et al., Prospective Multicenter Study on Respiratory Stabilization during the Recovery Process from Deterioration of Heart Failure, the 81 Annual Scientific meeting of Japanese Circulation Society, 2017.

`, heading: `References`
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
                                <h1 style={styles1}>{row.heading}</h1>
                                <pre className="preformatted" style={styles}>{row.data}</pre>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}


class Breathing extends React.Component {
    render() {
        return (
            <div className="Breathing-component">
                <div className="Breathing-content">
                    <Rows contents={content}/>
                </div>
            </div>
        );
    }
}

Rows.propTypes = {
    contents: PropTypes.array
};

export default Breathing;