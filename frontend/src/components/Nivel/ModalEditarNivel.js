import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Modal, Snackbar, Alert } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEditarNivel = ({ open, nivelEditando, onClose, onSave }) => {
  const [nivel, setNivel] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertSeverity, setAlertSeverity] = useState("success"); 

  useEffect(() => {
    if (nivelEditando) {
      console.log(nivelEditando); 
      setNivel(nivelEditando);  
    }
  }, [nivelEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNivel((prevNivel) => ({
      ...prevNivel,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await onSave(nivel); 
      setAlertMessage("Nível editado com sucesso!");
      setAlertSeverity("success");
      setAlertOpen(true);
      onClose(); 
    } catch (error) {
      setAlertMessage("Erro ao editar nível!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  if (!nivel) return null; 

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Nível
          </Typography>

          <TextField
            label="Nível"
            name="nivel"
            value={nivel.nivel || ""}  
            onChange={handleChange} 
            fullWidth
            margin="normal"
          />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Salvar
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalEditarNivel;
