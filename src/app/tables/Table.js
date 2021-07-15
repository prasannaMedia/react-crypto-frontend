import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import "./Table.css";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import "react-data-table-component-extensions/dist/index.css";

const Table = () => {
  const [apiData, setApiData] = useState({
    data: [],
  });
  const [allData, setAllData] = useState({
    data: [],
  });

  const history = useHistory();

  //GET DATA
  useEffect(() => {
    require("axios")
      .get(
        "https://api.nomics.com/v1/currencies/ticker?key=46067c0fde2057144299fe848aa90229075808d4&interval=1d,30d&convert=EUR&per-page=100&page=1"
      )
      .then((response) => {
        console.log(response.data);
        setApiData({ ...apiData, data: response.data });
      });

    require("axios")
      .get("https://cryptoapireact.herokuapp.com/api/v1/posts/all")
      .then((response) => {
        console.log(response.data);
        setAllData({ ...allData, data: response.data });
      });
  }, []);

  if (!apiData.data || !allData.data) {
    return (
      <h1>loading data...................................................</h1>
    );
  }

  console.log(allData.data);
  const viewRow = (row) => {
    history.push("/viewdashboard");
  };

  const saveRow = (row) => {
    axios
      .post("https://cryptoapireact.herokuapp.com/api/v1/posts", {
        name: row.name,
        symbol: row.symbol,
        market_cap: row.market_cap,
      })
      .then(function (response) {
        console.log(response);
        swal("saved", "Your data saved in Database you can view ", "success");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dataChecker = (row) => {
    for (var i = 0; i < allData.data.length; i++) {
      if (allData.data[i].name === row.name) {
        console.log(allData.data[i].name);
        console.log(row.name);
        console.log("jaii");
        return true;
      }
    }
    return false;
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "symbol",
      selector: "symbol",
      sortable: true,
    },
    {
      name: "market_cap",
      selector: "market_cap",
      sortable: true,
    },

    {
      cell: (row) =>
        dataChecker(row) ? (
          <button
            className="btn btn-info"
            aria-label="delete"
            color="secondary"
            onClick={() => viewRow(row)}
          >
            view
          </button>
        ) : (
          <button
            className="btn btn-primary"
            aria-label="delete"
            color="secondary"
            onClick={() => saveRow(row)}
          >
            save
          </button>
        ),
    },
  ];

  createTheme("solarized", {
    text: {
      primary: "#858aa7",
      secondary: "#FFFFFFFFF",
    },
    background: {
      default: "#191c24",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "#FFFFFF",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const tableData = {
    columns: columns,
    data: apiData.data,
  };

  return apiData.data ? (
    <DataTableExtensions {...tableData}>
      <DataTable
        noHeader
        columns={columns}
        // data={apiData.data}
        pagination
        selectableRows
        theme="solarized"
      />
    </DataTableExtensions>
  ) : (
    <h2>loading</h2>
  );
};
export default Table;
