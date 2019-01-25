import React from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardColumns,
} from "reactstrap";

const jwt = require("jsonwebtoken");

export default class Users extends React.Component {
  state = {
    users: []
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:4200/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };
    const decoded = jwt.decode(token);
    const department = decoded.department;
    axios
      .get(endpoint, options)
      .then(res => {
        const filtered = res.data.filter(user => user.department === department)
        this.setState({ users: filtered });
      })
      .catch(err => {
        console.log("error from /api/users", err);
      });
  }

  deleteUser = (user) => {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:4200/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .delete(`http://localhost:4200/api/users/${user.id}`)
      .then(res => {
        axios
          .get(endpoint, options)
          .then(res => this.setState({ users: res.data }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="listDiv">
      <div className="padding">
        <CardColumns>
          {this.state.users.map(user => (
            <div key={user.id}>
              <Card sm="6">
                <CardBody>
                  <CardTitle>{user.username}</CardTitle>
                  <CardSubtitle>{`Id: ${user.id}`}</CardSubtitle>
                  <CardSubtitle>{`Department: ${
                    user.department
                  }`}</CardSubtitle>
                  <Button onClick={() => this.deleteUser(user)}>{`Delete ${
                    user.username
                  }`}</Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </CardColumns>
      </div>
        
      </div>
    );
  }
}