import React, { Component } from "react";
import Employees from "./Employee";
import Search from "./Search";
import API from "../utils/API";
import "../css/Directory.css";

class Directory extends Component {
  state = {
    employees: [],
    empSort: [],
    search: "",
    sorted: false,
  };

  componentDidMount = () => {
    API.getUsers().then((results) => {
      this.setState({
        employees: results.data.results,
      });
    });
  };

  sortEmp = () => {
    let { employees, search } = this.state;
    let empSort = employees.filter((sorted) => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ empSort });
  };

  startSort = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmp();
      this.setState({ sorted: true });
    });
  };

  render = () => {
    return (
      <div className="background">
        <div className="jumbotron jumbotron-fluid">
          <h2 className="display-4">Employee Directory</h2>
          <p> Search for an employee by entering their name or email below.</p>
          <Search name="search" startSort={this.startSort} label="Search" />
        </div>

        <div className="container-fluid">
          <table className="table table-dark table-striped table-hover table-bordered table-condensed">
            <thead className="thead">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.state.sorted
                  ? this.state.employees.map((employee) => (
                      <Employees
                        key={employee.id.value}
                        firstName={employee.name.first}
                        lastName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}
                        address={
                          employee.location.street.number +
                          " " +
                          employee.location.street.name +
                          ", " +
                          employee.location.city +
                          ", " +
                          employee.location.state +
                          " " +
                          employee.location.postcode
                        }
                      />
                    ))
                  :
                    this.state.empSort.map((employee) => (
                      <Employees
                        key={employee.id.value}
                        firstName={employee.name.first}
                        lastName={employee.name.last}
                        phone={employee.phone}
                        email={employee.email}
                        icon={employee.picture.medium}
                        dob={employee.dob.date}
                        address={
                          employee.location.street.number +
                          employee.location.street.name
                        }
                      />
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default Directory;