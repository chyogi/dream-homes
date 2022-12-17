import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

export default function CustomFloorPlans({ customFloorPlans }) {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "stories",
      headerName: "Stories",
      type: "number",
      width: 110,
    },
    {
      field: "sqFt",
      headerName: "Sq Ft",
      type: "number",
      width: 110,
    },
    {
      field: "bedrooms",
      headerName: "Bedrooms",
      type: "number",
      width: 110,
    },
    {
      field: "fullBaths",
      headerName: "Full Baths",
      type: "number",
      width: 110,
    },
    {
      field: "halfBaths",
      headerName: "Half Baths",
      type: "number",
      width: 110,
    },
    {
      field: "garage",
      headerName: "Garage",
      type: "number",
      width: 110,
    },
    {
      field: "isFav",
      headerName: "Fav?",
      type: "text",
      width: 110,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
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
    <Box sx={{ height: 400, width: "100%", padding: "1rem" }}>
      <DataGrid
        rows={customFloorPlans}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
