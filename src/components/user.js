import React from 'react';
import {Link, Route} from "react-router-dom";

const user_holder = ({match}) => <p>{match.params.id}</p>;

export default class User extends React.Component {


    render() {
        return (
            <div>
                <h1>Users</h1>
                <ul>
                    <li><Link to={'/users/1'}>User 1</Link></li>
                    <li><Link to={'/users/2'}>User 2</Link></li>
                    <li><Link to={'/users/3'}>User 3</Link></li>
                </ul>
                <Route path={'/users/:id'} component={user_holder}/>
            </div>
        )
    }
}