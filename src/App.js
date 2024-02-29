
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data,setData] = useState([])
  const [pageNo,setPageNo] = useState(1)
  const [displayData,setDisplayDatad] = useState([])

 async function fetchData (){
    try{
      const {data}= await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
     console.log(data);
      setData(data);
      const newData=data.filter((d,indx) => d.id > 0 && d.id<= 10)
      setDisplayDatad(newData)
    }
    catch(e){
      console.error(e);
      alert("failed to fetch data")
    }

  }

  function displayDatas(){
    let end=pageNo*10;
    let start=end-10
    console.log(start,end)
    const newData=data.filter((d,indx) => d.id >= start && d.id< end)
    setDisplayDatad(newData)
    //console.log(newData);

  }


useEffect(() => {
  fetchData();
  console.log(displayData);
},[])
useEffect(() => {console.log("pageNo")
  displayDatas();
  console.log(displayData)
},[pageNo])


  return (
    <div className="App">

      <h2>Employee Table Data</h2>
      <table className="table">
        <tr >
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        </tr>
        <tbody>
        {displayData.map((data) => (
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
          </tr>

        )
        )}
        </tbody>
      </table>

      <button onClick={() => pageNo >1 ?setPageNo(pageNo-1):null}>Previous</button>
      <button>{pageNo}</button>
      <button onClick={() =>  pageNo <5 ?setPageNo(pageNo+1):null}>Next</button>
      
    </div>
  );
}

export default App;
