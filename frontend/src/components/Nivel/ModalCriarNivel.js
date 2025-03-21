import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ModalCriarNivel = ({ open, onClose, onSave }) => {
  const [novoNivel, setNovoNivel] = useState({ nivel: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoNivel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!novoNivel.nivel.trim()) {
      errors.nivel = "Nome do nível é obrigatório";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(novoNivel);
      setNovoNivel({ nivel: "" });
      setOpenSnackbar(true);
      setErrors({}); // Limpa os erros após o salvamento bem-sucedido
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 2,
            width: "300px",
            backgroundColor: "white",
            margin: "auto",
            marginTop: "100px",
            borderRadius: "8px",
          }}
        >
          <h3>Criar Novo Nível</h3>
          <TextField
            label="Nome do Nível"
            name="nivel"
            value={novoNivel.nivel}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.nivel}
            helperText={errors.nivel}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Nível cadastrado com sucesso!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ModalCriarNivel;
