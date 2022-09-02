import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Loading from 'react-fullscreen-loading';

const CompanyList =()=>{
const [companies,setCompanies] = useState([]);
const [offset,setOffset] = useState(1);
const [limit,setLimit] = useState(1);
const [search,setSearch] = useState("");
const [loading, setLoading] = useState(false);
const [total, setTotal] = useState(0);
async function fetchData(offVal){
  setLoading(true);
  let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:5000/getCompany?offset="+offVal+"&search="+search, requestOptions)
  .then(response => response.json())
  .then(result => {
    setLoading(false);
    if(result.success) {
      setCompanies(result.data);
      setLimit(result.maxOffset);
      setOffset(result.offset);
      setTotal(result.dataCount);
    }else{
      setCompanies([]);
      setLimit(1);
      setOffset(1);
      setTotal(0);
    }
  })
  .catch(error => console.log('error', error));
}
// function nextPage(value){
// setOffset(offset+value);
// fetchData();

// }
useEffect(()=>{
  fetchData(1);
},[])
return (
<Fragment>
<Loading loading={loading} background="#2ecc71" loaderColor="#3498db" />
    <h1 className="text-center mt-5">Companies</h1>
    <Link to="/">
    <button className="btn btn-success m-2">+Add Company</button>
    </Link>
    <div className="d-flex justify-content-end">
        
        <div className="row mt-5">
            <div className="col-auto">
            <input type="text" placeholder="Search By Name/CIN" className="form-control m-2" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            </div>
            <div className="col-auto">
            <button className="btn btn-primary m-2" onClick={()=>{fetchData(1)}}>Search</button>
            <button className="btn btn-secondary m-2" onClick={()=>{setSearch("");}}>Clear</button>
            </div>
        </div>
        </div>
        <div className="row">
          Total {total} Companies
    <table className="table">
  <thead>
    <tr className="table-active">
    <th>CIN</th>
    <th>Name</th>
    </tr>
  </thead>
  <tbody>
  {companies.map((m)=>{
      return (<tr key={m.cid}>
      <td>{m.cin}</td>
      <td>{m.company_name}</td>
    </tr>);
    })}
  </tbody>
</table>
</div>
<div className="d-flex justify-content-center mb-5">
<div className="row" hidden={limit!==0}>No Data Found</div>
<div className="row" hidden={limit===0}>
  <div className="col-auto">
    <button disabled={offset===1} onClick={()=>{fetchData(offset-1)}} className="btn btn-primary">Previous</button>
  </div>
  <div className="col-auto">
    <button className="btn btn-clear">{offset}/{limit}</button>
  </div>
  <div className="col-auto">
    <button disabled={limit===offset} onClick={()=>{fetchData(offset+1)}} className="btn btn-primary">Next</button>
  </div>
</div>
</div>
</Fragment>
);
}
export default CompanyList;