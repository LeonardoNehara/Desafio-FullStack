import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getNiveis } from "../../services/nivelService"; 
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ModalCriarDesenvolvedor = ({ open, onClose, onSave }) => {
  const [novoDesenvolvedor, setNovoDesenvolvedor] = useState({
    nome: "",
    sexo: "",
    data_nascimento: "",
    hobby: "",
    nivel_id: "",
  });

  const [niveis, setNiveis] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadNiveis = async () => {
      try {
        const response = await getNiveis();
        if (response && response.data) {
          const niveis = response.data;
          const currentPage = response.meta?.current_page;
          if (currentPage) {
            setNiveis(niveis);
          } else {
            console.error("Erro: Dados de paginação não encontrados.");
          }
        } else {
          console.error("Erro: Resposta da API não contém os dados esperados.");
        }
      } catch (error) {
        console.error("Erro ao carregar níveis:", error);
      }
    };
    loadNiveis();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoDesenvolvedor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    console.log(errors);
    if (!novoDesenvolvedor.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    }

    console.log("Erros de validação:", errors);

    if (!novoDesenvolvedor.sexo) {
      errors.sexo = "Sexo é obrigatório";
    }

    if (!novoDesenvolvedor.nivel_id) {
      errors.nivel_id = "Nível é obrigatório";
    }

    const today = new Date();
    const nascimento = new Date(novoDesenvolvedor.data_nascimento);
    if (nascimento > today) {
      errors.data_nascimento = "Data de nascimento não pode ser no futuro";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(novoDesenvolvedor);
      setNovoDesenvolvedor({
        nome: "",
        sexo: "",
        data_nascimento: "",
        hobby: "",
        nivel_id: "",
      });
      setOpenSnackbar(true);
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
          <h3>Criar Novo Desenvolvedor</h3>
          <TextField
            label="Nome"
            name="nome"
            value={novoDesenvolvedor.nome}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <TextField
            label="Data de Nascimento"
            name="data_nascimento"
            type="date"
            value={novoDesenvolvedor.data_nascimento}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.data_nascimento}
            helperText={errors.data_nascimento}
          />
          <TextField
            label="Hobby"
            name="hobby"
            value={novoDesenvolvedor.hobby}
            onChange={handleChange}
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel>Sexo</InputLabel>
            <Select
              name="sexo"
              value={novoDesenvolvedor.sexo}
              onChange={handleChange}
              label="Sexo"
              error={!!errors.sexo}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Feminino</MenuItem>
              <MenuItem value="O">Outro</MenuItem>
            </Select>
            {errors.sexo && <div style={{ color: "red", fontSize: "12px" }}>{errors.sexo}</div>}
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Nível</InputLabel>
            <Select
              name="nivel_id"
              value={novoDesenvolvedor.nivel_id}
              onChange={handleChange}
              label="Nível"
              error={!!errors.nivel_id}
            >
              {niveis.map((nivel) => (
                <MenuItem key={nivel.id} value={nivel.id}>
                  {nivel.nivel}
                </MenuItem>
              ))}
            </Select>
            {errors.nivel_id && <div style={{ color: "red", fontSize: "12px" }}>{errors.nivel_id}</div>}
          </FormControl>
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
          Desenvolvedor cadastrado com sucesso!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ModalCriarDesenvolvedor;
