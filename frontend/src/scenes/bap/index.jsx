import { Box, useTheme, Link } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { bap } from "../../data/bap";
import Header from "../../components/Header";

const BAP = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "tanggalPemeriksaan", headerName: "Tanggal Pemeriksaan", flex: 1, minWidth: 150 },
    { 
        field: "jenisPajakPemeriksaan", 
        headerName: "Jenis Pajak Pemeriksaan", 
        flex: 1, 
        minWidth: 150,
    },
    { 
        field: "namaWajibPajak", 
        headerName: "Nama Wajib Pajak", 
        flex: 1, 
        minWidth: 150,
        renderCell: (params) => {
            const namaWp = params.value;
            const sentences = namaWp.split(";");
            
            return (
              <div>
                {sentences.map((sentence, index) => (
                  <div key={index}>{sentence}</div>
                ))}
              </div>
            );
          },
    },
    { field: "namaPengelolaPenanggungjawab", headerName: "Nama Pengelola Penanggungjawab", flex: 1, minWidth: 150 },
    { 
        field: "npwpdNop", 
        headerName: "NPWPD/NOP", 
        flex: 1, 
        minWidth: 150,
        renderCell: (params) => {
            const npwpd = params.value;
            if (npwpd) {
                const sentences = npwpd.split(";");
                
                return (
                    <div>
                        {sentences.map((sentence, index) => (
                            <div key={index}>{sentence}</div>
                        ))}
                    </div>
                );
            } else {
                return null; 
            }
        },
        
    },
    { field: "alamat", headerName: "Alamat", flex: 1, minWidth: 150 },
    { field: "nomorTelepon", headerName: "Nomor Telepon", flex: 1, minWidth: 150 },
    { field: "dasarPemeriksaan", headerName: "Dasar Pemeriksaan", flex: 1, minWidth: 150 },
    {
        field: "hasilPemeriksaan",
        headerName: "Hasil Pemeriksaan",
        flex: 4,
        minWidth: 1300,
        cellClassName: "multi-line-cell",
        renderCell: (params) => {
          const hasilPemeriksaan = params.value;
          const sentences = hasilPemeriksaan.split(";");
          
          return (
            <Box m="8px">
                {sentences.map((sentence, index) => (
                    <div key={index}>{sentence}</div>
                ))}
            </Box>
          );
        },
      },
      {
        field: "petugasPemeriksaan",
        headerName: "Petugas Pemeriksaan",
        flex: 1,
        minWidth: 150,
        renderCell: (params) => {
          const petugasPemeriksaan = params.value;
          if (petugasPemeriksaan) {
            const sentences = petugasPemeriksaan.includes(";")
              ? petugasPemeriksaan.split(";")
              : [petugasPemeriksaan];
      
            return (
              <div>
                {sentences.map((sentence, index) => (
                  <div key={index}>{sentence}</div>
                ))}
              </div>
            );
          } else {
            return null;
          }
        },
      },
    { field: "ketPemeriksaan", headerName: "Keterangan Pemeriksaan", flex: 1, minWidth: 150 },
    { 
        field: "dokumentasiPemeriksaan", 
        headerName: "Dokumentasi Pemeriksaan", 
        flex: 1, 
        minWidth: 150,
        renderCell: (params) => {
            const link = params.value;
            return (
              <Link 
              sx={{
                color: colors.grey[100],
                fontWeight: 800
              }} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer">
                Click Here
              </Link>
            );
          }
    },
    { 
        field: "bapFisik", 
        headerName: "BAP Fisik", 
        flex: 1, 
        minWidth: 150,
        renderCell: (params) => {
            const link = params.value;
            return (
              <Link 
              sx={{
                color: colors.grey[100],
                fontWeight: 800
              }} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer">
                Click Here
              </Link>
            );
          }
    },
    { 
        field: "dokumenPendukung", 
        headerName: "Dokumen Pendukung", 
        flex: 1, 
        minWidth: 150,
        renderCell: (params) => {
            const link = params.value;
            return (
              <Link 
              sx={{
                color: colors.grey[100],
                fontWeight: 800
              }} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer">
                Click Here
              </Link>
            );
          }
    },
    { field: "tanggalPenting", headerName: "Tanggal Penting", flex: 1, minWidth: 150 },
  ];

  return (
    <Box m="20px">
      <Header title="Rekap Berita Acara Pemeriksaan" subtitle="List of Berita Acara Pemeriksaan" />
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
          rows={bap}
          checkboxSelection
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.timestamp}
          getRowHeight={() => 'auto'}
          sx={{
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 13
          }}
        />
      </Box>
    </Box>
  );
};

export default BAP;