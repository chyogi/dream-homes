import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

export default function CustomFloorPlans() {
  const navigate = useNavigate();

  const [customFloorPlanList, setCustomFloorPlanList] = useState([]);
  const [isRowDeleted, setIsRowDeleted] = useState(false);

  const appUser = JSON.parse(localStorage.getItem("app_user"));

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8088/customFloorPlans?userId=${appUser.id}`
        );
        const customFloorPlanListFromApi = await response.json();
        setCustomFloorPlanList(customFloorPlanListFromApi);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  useEffect(
    () => {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8088/customFloorPlans?userId=${appUser.id}`
        );
        const customFloorPlanListFromApi = await response.json();
        setCustomFloorPlanList(customFloorPlanListFromApi);
      };
      fetchData();
    },
    [isRowDeleted] // When this array is empty, you are observing initial component state
  );

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Name"}</strong>,
    },
    {
      field: "type",
      headerName: "Type",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Type"}</strong>,
    },
    {
      field: "stories",
      headerName: "Stories",
      type: "number",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Stories"}</strong>,
    },
    {
      field: "sqFt",
      headerName: "Sq Ft",
      type: "number",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Sq Ft"}</strong>,
    },
    {
      field: "bedrooms",
      headerName: "Bedrooms",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Bedrooms"}</strong>,
    },
    {
      field: "fullBaths",
      headerName: "Full Baths",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Full Baths"}</strong>,
    },
    {
      field: "halfBaths",
      headerName: "Half Baths",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Half Baths"}</strong>,
    },
    {
      field: "garage",
      headerName: "Garage",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Garage"}</strong>,
    },
    {
      field: "isFav",
      headerName: "Fav?",
      type: "text",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <strong>{"Fav?"}</strong>,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      headerAlign: "center",
      renderHeader: () => <strong>{"Price"}</strong>,
      valueGetter: (params) => {
        return currencyFormatter.format(
          isNaN(params.row.price) ? 0.0 : params.row.price
        );
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 70,
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              console.log(`edit clicked`, params.row);
              navigate(`/custom-floor-plans/edit`, { state: params.row });
            }}
          >
            <EditOutlinedIcon sx={{ color: "#031f0a" }} />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 70,
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={(e) => {
              console.log(`delete clicked`, params.row);
              e.preventDefault();

              const deleteDataFromDB = async () => {
                const options = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                };

                const response = await fetch(
                  `http://localhost:8088/customFloorPlans/${params.row.id}`,
                  options
                );

                const responseFromApi = await response.json();
                setIsRowDeleted(true);
                navigate(`/custom-floor-plans`);
              };

              deleteDataFromDB();
            }}
          >
            <DeleteOutlineIcon sx={{ color: "#031f0a" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box
      sx={{ height: 400, width: "100%", padding: "1rem", marginTop: "1rem" }}
    >
      <DataGrid
        rows={customFloorPlanList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
        }}
        sx={{
          borderColor: "#181f1c",
          border: 2,
          boxShadow: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#d8f3dc",
            fontSize: "1rem",
            fontWeight: "bolder",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#181f1c",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f1f7ee",
            fontSize: "1.25rem",
            fontWeight: "bold",
          },
          bgcolor: "background.paper",
          overflow: "auto",
        }}
      />
    </Box>
  );
}
