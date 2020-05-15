import React from 'react';

const SearchBox = ({placeholder, handleChange, thevalue}) => (
    <input type = 'text' placeholder = {placeholder} onChange = {handleChange} value = {thevalue}/>
);

export default SearchBox;