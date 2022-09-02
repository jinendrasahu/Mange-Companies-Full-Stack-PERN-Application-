import React, { Fragment, useState, useEffect } from "react";
import Parser from 'html-react-parser';
import '../css/addcompany.css';
import Loading from 'react-fullscreen-loading';

const baseURL = "http://localhost:3000";

const AddCompany = () => {
  const [suggetion, setSuggetion] = useState("");
  const [company, setCompany] = useState("");
  const [cdata, setCdata] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);

  async function onFormSubmit(e) {
    
    e.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "company": cdata.name,
      "cid": cdata.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/addCompany", requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        if (result.success) {
          window.location = baseURL + "/companies";
        } else {
          setErrors(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }
  async function selectSuggetion() {

    let idData = this.id.split("/");
    let id = idData[idData.length - 1];
    let name = this.innerText;
    setCdata({
      id: id,
      name: name
    })
    // let elements = document.getElementsByClassName("show");
    // for (let i = 0; i < elements.length; i++) {
    //   elements[i].removeEventListener('click', selectSuggetion, false);
    // }
    setActive(false);
    setCompany(name);
    setSuggetion("");

  }
  async function getCompanies(comp_name) {
    setActive(true);
    setErrors("");
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "search": comp_name,
      "filter": "company"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/getSearch", requestOptions)
      .then(response => response.text())
      .then(result => {
        let elements = document.getElementsByClassName("show");
        for (let i = 0; i < elements.length; i++) {
          elements[i].removeEventListener('click', selectSuggetion, false);
        }
        setSuggetion(result);
         elements = document.getElementsByClassName("show");

        for (let i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', selectSuggetion, false);
        }
      })
      .catch(error => {
        setErrors(error.message);
      });

  }
  return (
    <Fragment>
            <Loading loading={loading} background="#2ecc71" loaderColor="#3498db" />
      <h1 className="text-center mt-5">Company</h1>
      <div className="alert alert-danger" role="alert" hidden={errors===""}>
  {errors}
</div>
      <div className="d-flex justify-content-center">

        <form className="row mt-5" onSubmit={onFormSubmit}>
          <div className="col-auto">
            <input type="text" placeholder="Search Company Name" className="form-control m-2" value={company} onChange={(e) => { setCompany(e.target.value); getCompanies(e.target.value); }}></input>
            {Parser(suggetion)}
          </div>
          <div className="col-auto">
            <button disabled={active} className="btn btn-success m-2">Add Company</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
export default AddCompany;