import React, { useState } from "react";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    useTheme,
    Box
  } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { undangan } from "../../data/undangan";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Undangan = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleEditCellChange = ({ id, field, value }) => {
      setEditedCells((prevEditedCells) => ({
        ...prevEditedCells,
        [id]: {
          ...prevEditedCells[id],
          [field]: value
        }
      }));
    };
  
    const handleSesiChange = (event, row) => {
      handleEditCellChange({
        id: row.id,
        field: "sesi",
        value: event.target.value
      });
    };
  
    const handleTanggalChange = (event, row) => {
      handleEditCellChange({
        id: row.id,
        field: "tanggal",
        value: event.target.value
      });
    };

    const columns = [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'namaWp', headerName: 'Nama WP', width: 200 },
      { field: 'npwpd', headerName: 'NPWPD', width: 150 },
      { field: 'alamat', headerName: 'Alamat', width: 300 },
      {
        field: 'downloadButton',
        headerName: 'Download',
        width: 125,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleDownload(params.row)}
          >
            Download
          </Button>
        ),
      },
      {
        field: "sesi",
        headerName: "Sesi",
        editable: true,
        renderCell: (params) => (
          <Select
            value={params.row.sesi || ""}
            onChange={(event) => handleSesiChange(event, params.row)}
          >
            <MenuItem value="Sesi 1">Sesi 1</MenuItem>
            <MenuItem value="Sesi 2">Sesi 2</MenuItem>
            <MenuItem value="Sesi 3">Sesi 3</MenuItem>
          </Select>
        )
      },
      {
        field: "tanggal",
        headerName: "Tanggal",
        editable: true,
        renderCell: (params) => (
          <TextField
            value={params.row.tanggal || ""}
            onChange={(event) => handleTanggalChange(event, params.row)}
            size="small"
            variant="outlined"
          />
        )
      }
    ];

    return (
        <Box m="20px">
        <Header title="Surat Undangan Pemeriksaan" subtitle="Buat Surat Undangan Pemeriksaan" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
            
          }}
        >
          <DataGrid
            rows={undangan}
            checkboxSelection
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowHeight={() => 'auto'}
            sx={{
              fontFamily: ["Source Sans 3", "sans-serif"].join(","),
              fontSize: 13
            }}
          />
        </Box>
      </Box>
    )
}

export default Undangan;