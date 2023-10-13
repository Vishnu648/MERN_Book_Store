import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [datas, setDatas] = useState([]);
  
  useEffect(() => {
    
  axios.get('http://localhost:4000/books')
  .then(response=>setDatas(response.data.data))
  }, [])
  

  return (
    <div>
      {
        datas.map((d) => {
          return(
            <h2 key={d._id}>{d.title}</h2>
          )
        }
        )
      }
      APP
    </div>
  )
}

export default App