import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nivel', headerName: 'Nível', width: 200 },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 180,
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '5px' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => params.row.onEditar(params.row)}
            style={{ marginRight: 10 }}
          >
            Alterar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => params.row.onConfirmarDeletar(params.row.id)}
          >
            Deletar
          </Button>
        </div>
      );
    }
  }
];

const TabelaNiveis = ({ niveis, onEditar, onDeletar }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      try {
        await onDeletar(selectedId);
        handleCloseDialog();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('Não é possível excluir este nível, pois está vinculado a um desenvolvedor.');
          setOpenSnackbar(true);
        }
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const rows = niveis.map(nivel => ({
    id: nivel.id,
    nivel: nivel.nivel,
    onEditar,
    onConfirmarDeletar: handleOpenDialog,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', margin: '0 20px' }}>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este nível? Esta ação não pode ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TabelaNiveis;
