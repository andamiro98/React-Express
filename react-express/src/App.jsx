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

  const handleClick = () => {
    setNum(num + 1);
  };
  

  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [currentFileIndex, setCurrentFileIndex] = useState(null); // 현재 변경 중인 파일 인덱스
  const [newFileName, setNewFileName] = useState(""); // 새 파일명 입력값



  // 파일 선택 이벤트 핸들러
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles.map((file) => ({ file, customName: file.name }))); // 초기 customName 설정
  };


  // 모달 열기
  const openModal = (index) => {
    setCurrentFileIndex(index);
    setNewFileName(files[index].customName); // 기존 파일명 설정
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFileIndex(null);
    setNewFileName("");
  };

  // 파일명 변경 처리
  const handleFileNameChange = () => {
    const updatedFiles = [...files];
    updatedFiles[currentFileIndex].customName = newFileName;
    setFiles(updatedFiles);
    closeModal();
  };

  // 파일 내보내기
  const handleExportFiles = () => {
    files.forEach(({ file, customName }) => {
      const blob = new Blob([file], { type: file.type });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = customName;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    alert("Files exported successfully!");
    console.log("서버에서 파일명, 파일내용 바꾸기");
    // DB에 있는 파일을 서버에게 파일명, 파일내용을 바꾸어서 사용자가 다운로드 받아야함
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
    <h1>Load and Rename Files</h1>
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
          {files.map((fileObj, index) => (
            <li key={index}>
              {fileObj.customName} - {fileObj.file.size} bytes
              <button
                onClick={() => openModal(index)}
                style={{ marginLeft: "10px" }}
              >
                Rename
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleExportFiles} style={{ marginTop: "20px" }}>
          Export Files
        </button>
      </div>
    )}

    {/* 모달 창 */}
    {isModalOpen && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          border: "1px solid #ccc",
          zIndex: 1000,
        }}
      >
        <h3>Rename File</h3>
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <div>
          <button onClick={handleFileNameChange} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    )}

    {/* 모달 배경 */}
    {isModalOpen && (
      <div
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      ></div>
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