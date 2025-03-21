import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from "@mui/material";
import { getNiveis } from "../../services/nivelService";

const ModalEditarDesenvolvedor = ({ open, desenvolvedorEditando, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    nivel_id: "",
    sexo: "",
    data_nascimento: "",
    hobby: "",
  });
  const [niveis, setNiveis] = useState([]);
  const [loadingNiveis, setLoadingNiveis] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && desenvolvedorEditando) {
      setFormData({
        id: desenvolvedorEditando.id,
        nome: desenvolvedorEditando?.nome || "",
        nivel_id: desenvolvedorEditando?.nivel_id || "",
        sexo: desenvolvedorEditando?.sexo || "",
        data_nascimento: desenvolvedorEditando?.data_nascimento
          ? new Date(desenvolvedorEditando?.data_nascimento).toISOString().split("T")[0]
          : "",
        hobby: desenvolvedorEditando?.hobby || "",
      });
    }
  }, [open, desenvolvedorEditando]);

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const response = await getNiveis();
        setNiveis(response.data);
      } catch (error) {
        console.error("Erro ao carregar níveis:", error);
      } finally {
        setLoadingNiveis(false);
      }
    };
    fetchNiveis();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    }

    if (!formData.sexo) {
      errors.sexo = "Sexo é obrigatório";
    }

    if (!formData.nivel_id) {
      errors.nivel_id = "Nível é obrigatório";
    }

    const today = new Date();
    const nascimento = new Date(formData.data_nascimento);
    if (nascimento > today) {
      errors.data_nascimento = "Data de nascimento não pode ser no futuro";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await onSave(formData);
        setAlertMessage("Desenvolvedor editado com sucesso!");
        setAlertSeverity("success");
        setAlertOpen(true);
        onClose();
      } catch (error) {
        setAlertMessage("Erro ao editar desenvolvedor!");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Desenvolvedor</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <FormControl fullWidth margin="normal" error={!!errors.nivel_id}>
            <InputLabel>Nível</InputLabel>
            <Select
              name="nivel_id"
              value={formData.nivel_id}
              onChange={handleChange}
              disabled={loadingNiveis}
            >
              {niveis.map((nivel) => (
                <MenuItem key={nivel.id} value={nivel.id}>
                  {nivel.nivel}
                </MenuItem>
              ))}
            </Select>
            {errors.nivel_id && <div style={{ color: "red", fontSize: "12px" }}>{errors.nivel_id}</div>}
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.sexo}>
            <InputLabel>Sexo</InputLabel>
            <Select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              label="Sexo"
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Feminino</MenuItem>
              <MenuItem value="O">Outro</MenuItem>
            </Select>
            {errors.sexo && <div style={{ color: "red", fontSize: "12px" }}>{errors.sexo}</div>}
          </FormControl>
          <TextField
            fullWidth
            name="data_nascimento"
            type="date"
            value={formData.data_nascimento}
            onChange={handleChange}
            margin="normal"
            error={!!errors.data_nascimento}
            helperText={errors.data_nascimento}
          />
          <TextField
            fullWidth
            label="Hobby"
            name="hobby"
            value={formData.hobby}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalEditarDesenvolvedor;
