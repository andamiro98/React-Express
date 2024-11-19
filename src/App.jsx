import logo from './logo.svg';
import './App.css';
import { Test } from './Test';
import React from 'react';
import PropTypes from 'prop-types';

export const App = () => {
  return (
    <div className="App">
      <Test name = "Test"/>
      <Test/>
      <Codelab name="Otter"> baby otter </Codelab>
    </div>
  );
};
export default App;


export const Codelab =(props) =>{
  return(
    <div>
      <h1>{props.name}</h1>
      <h1>{props.children}</h1>
    </div>
  );
};

// PropTypes 설정
Codelab.propTypes = {
  name: PropTypes.string.isRequired, // name은 문자열이며 필수
  children: PropTypes.node           // children은 React 노드 (문자열, 요소 등)
};

// 기본값 설정
Codelab.defaultProps = {
  name: 'Default Name', // name의 기본값
};