const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
   console.log('listening on 8080')
}); 


app.use(express.static(path.join(__dirname, 'react-express/build')));

// 루트 경로에 대한 응답 처리
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});

