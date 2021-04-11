import React from "react";

const Employees = (props) => {
    function formatDate(date) {
      const dateArray = date.split("-");
      const year = dateArray[0];
      const month = dateArray[1];
      const dayArray = dateArray[2].split("T");
      const day = dayArray[0];
      const formattedDate = [month, day, year].join("-");
      return formattedDate;
    }
  
    let birthDate = formatDate(props.dob);
  
    return (
      <tr className="tr">
        <td>
          <img alt={props.firstName} src={props.icon} />
        </td>
        <td>
          {props.firstName} {props.lastName}
        </td>
        <td>{props.email}</td>
        <td>{props.phone} </td>
        <td>{birthDate}</td>
        <td>{props.address}</td>
      </tr>
    );
  };
  
  export default Employees;