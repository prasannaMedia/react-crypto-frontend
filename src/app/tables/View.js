import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "./Table.css";

const View = () => {
  const [apiData, setApiData] = useState({
    data: [],
  });

  const history = useHistory();

  //GET DATA
  useEffect(() => {
    require("axios")
      .get("https://cryptoapireact.herokuapp.com/api/v1/posts/all")
      .then((response) => {
        console.log(response.data);
        setApiData({ ...apiData, data: response.data });
      });
  }, []);

  if (!apiData.data) {
    return <h1>loading data</h1>;
  }

  const deleteRowConfirmation = (row) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRow(row);
      } else {
        swal("Not deleted!");
      }
    });
  };

  const deleteRow = (row) => {
    require("axios")
      .delete(`https://cryptoapireact.herokuapp.com/api/v1/posts/${row._id}`)
      .then((response) => {
        swal("Deleted", "Your data deleted from Database", "success");
        console.log(response.data);
        window.location.reload(false);
      });
    console.log(row);
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "symbol",
      selector: "Symbol",
      sortable: true,
    },
    {
      name: "market_cap",
      selector: "market_cap",
      sortable: true,
    },

    {
      cell: (row) => (
        <button
          className="btn btn-danger"
          aria-label="delete"
          color="secondary"
          onClick={() => deleteRowConfirmation(row)}
        >
          delete
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
        title="Saved Data"
        columns={columns}
        data={apiData.data}
        pagination
        selectableRows
        theme="solarized"
      />
    </DataTableExtensions>
  ) : (
    <h2>loading</h2>
  );
};
export default View;
