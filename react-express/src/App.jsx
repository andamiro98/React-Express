import logo from './logo.svg';
import './App.css';
import { Test } from './Test';
import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CountLabel from './CounLabel';

export const App = () => {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState([]);

  const handleClick = () => {
    setNum(num + 1);
  };
  
  // 파일 선택 이벤트 핸들러
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // FileList를 배열로 변환
    setFiles(selectedFiles);
  };

  return (
    // <div className="App">
    //   <button onClick={handleClick}>{num}</button>
    //   <button onClick={() => setCount(count + 1)}>
    //     Increment
    //   </button>
    //   <button onClick={() => setCount(count - 1)}>
    //     Decrement
    //   </button>
    //   <CountLabel count={count} />
    //   <Test name = "Test"/>
    //   <Test/>
    //   <Codelab name="Otter"> baby otter </Codelab>
    // </div>

    <div style={{ padding: "20px" }}>
      <h1>Load Multiple Files</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />
      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} - {file.size} bytes
              </li>
            ))}
          </ul>
        </div>
      )}
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