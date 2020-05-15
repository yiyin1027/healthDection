import React from 'react';
import PubNubReact from "pubnub-react";

const myChannel = 'cloudChannel';

export default class PubNub extends React.Component {
    constructor(props) {
        super(props);
        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-a49f577d-81c8-43c9-922e-3b13d0bbc91d',
            subscribeKey: 'sub-c-2c446f30-32cd-11e9-aca0-3eee1dbf820c'
        });
        this.pubnub.init(this);
    }

    componentWillMount() {
        this.pubnub.subscribe({channels: [myChannel], withPresence: true});

        this.pubnub.getMessage(myChannel, (msg) => {
            console.log(msg);
        });

        this.pubnub.getStatus((st) => {
            console.log(st);
            this.pubnub.publish({message: 'hello world from react', channel: myChannel});
        });
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({channels: ['channel1']});
    }

    render() {
        const messages=this.pubnub.getMessage(myChannel);
        return (
            <div>
                <ul>
                    {messages.map((m,index)=><li key={'message'+index}>{m.message}</li>)}
                </ul>
            </div>
        );
    }
}