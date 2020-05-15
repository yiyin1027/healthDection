import React from 'react';
import {Storage, Auth} from 'aws-amplify';
import List from "antd/lib/list";
import {Link, Route} from "react-router-dom";

// Storage.configure({
// //     AWSS3: {
// //         bucket: 'uottawa-cloud-project',//Your bucket name;
// //         region: 'us-east-1'//Specify the region your bucket was created in;
// //     }
// // });


class RenderVideo extends React.Component {

    get = async (key) => {
        try {
            let result = await Storage.get(key);
            console.log(result);
            // this.setState({
            //     video:result
            // })
            return result
        } catch (e) {
            console.log(e)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            video:null
        }
    }

    componentDidMount() {
        this.get(this.props.match.params.key)
            .then(result=>{
                this.setState({video:result})})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
        this.get(nextProps.match.params.key)
            .then(result=>{
                this.setState({video:result})})
    }

    render() {
        return (
            <div>
                <video width={'420px'} controls={true} src={this.state.video} />
            </div>
        )
    }
}

export default class S3Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            s3content: [],
            loading: true
        }
    }

    componentDidMount() {
        this.list()
    }

    list = async () => {
        try {
            let result = await Storage.list('');
            console.log(result);
            this.setState({
                s3content: result,
                loading: false
            })
        } catch (e) {
            console.log(e);
        }

    };

    onChange(e) {
        const file = e.target.files[0];
        console.log(file);
        Storage.put(file.name, file, {
            contentType: 'video/*',level:'patient'
        })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }


    render() {
        const match=this.props.match;
        return (
            <div>
                <List loading={this.state.loading}
                      dataSource={this.state.s3content}
                      renderItem={item => (
                          <List.Item>
                              <List.Item.Meta title={<Link to={`${match.url}/` + item.key}>{item.key}</Link>}/>
                          </List.Item>
                      )}/>
                {/*<input*/}
                {/*    type="file" accept='video/*'*/}
                {/*    onChange={(e) => this.onChange(e)}/>*/}
                <Route path={`${match.url}/:key`} component={RenderVideo}/>
            </div>
        );
    }
}