import React, { Fragment } from "react";
import AddCompany from "./components/AddCompany";
import CompanyList from "./components/CompanyList";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <Fragment>
      <div className="container">
    <Router>
  <Routes>
      <Route exact path="/companies" element={<CompanyList/>}/>
      <Route exact path="/" element={<AddCompany/>}/>
      </Routes>     

  </Router>
  </div>
  </Fragment>
  );
}

export default App;
