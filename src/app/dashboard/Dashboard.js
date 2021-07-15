import React, { Component } from "react";
import Table from "../tables/Table";
import HeroCards from "./HeroCards";
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <HeroCards />
        <Table />
      </div>
    );
  }
}

export default Dashboard;
