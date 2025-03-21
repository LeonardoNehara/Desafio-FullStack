import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 200 },
  { field: 'sexo', headerName: 'Sexo', width: 130 },
  { field: 'idade', headerName: 'Idade', type: 'number', width: 130 },
  { field: 'hobby', headerName: 'Hobby', width: 160 },
  { field: 'nivel', headerName: 'Nível', width: 150 },
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
            onClick={() => params.row.onEditar(params.row.id)}
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

const TabelaDesenvolvedores = ({ desenvolvedores, onEditar, onDeletar }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDeletar(selectedId);
    }
    handleCloseDialog();
  };

  const rows = desenvolvedores.map(desenvolvedor => ({
    id: desenvolvedor.id,
    nome: desenvolvedor.nome,
    sexo: desenvolvedor.sexo,
    idade: desenvolvedor.idade,
    hobby: desenvolvedor.hobby,
    nivel: desenvolvedor.nivel.nivel,
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
          Tem certeza de que deseja excluir este item? Esta ação não pode ser desfeita.
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
    </div>
  );
};

export default TabelaDesenvolvedores;
