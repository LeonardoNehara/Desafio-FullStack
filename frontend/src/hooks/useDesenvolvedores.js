import { useState, useEffect } from "react";
import { getDesenvolvedores, getDesenvolvedorPorId, deleteDesenvolvedor, updateDesenvolvedor, createDesenvolvedor } from "../services/desenvolvedorService";
import { getNiveis } from "../services/nivelService";
import { Snackbar, Alert } from "@mui/material";

const useDesenvolvedores = () => {
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [desenvolvedorEditando, setDesenvolvedorEditando] = useState(null);
  const [niveis, setNiveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNiveis, setLoadingNiveis] = useState(true);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    loadDesenvolvedores();
    loadNiveis();
  }, []);

  const loadDesenvolvedores = async () => {
    try {
      const response = await getDesenvolvedores();
      setDesenvolvedores(response.data);
    } catch (error) {
      console.error("Erro ao carregar desenvolvedores:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadDesenvolvedorPorId = async (idDesenvolvedor) => {
    try {
      const response = await getDesenvolvedorPorId(idDesenvolvedor);
      setDesenvolvedorEditando(response);
    } catch (error) {
      console.error("Erro ao carregar desenvolvedor:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadNiveis = async () => {
    try {
      const response = await getNiveis();
      setNiveis(response.data);
    } catch (error) {
      console.error("Erro ao carregar níveis:", error);
    } finally {
      setLoadingNiveis(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDesenvolvedor(id);
    loadDesenvolvedores();
  };

  const handleEdit = async (idDesenvolvedor) => {
    await loadDesenvolvedorPorId(idDesenvolvedor);
    setOpen(true);
  };

  const handleCreate = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCreate(false);
  };

  const handleSave = async (desenvolvedor) => {
    console.log("Salvando desenvolvedor:", desenvolvedor);
    try {
      if (desenvolvedor.id) {
        await updateDesenvolvedor(desenvolvedor.id, desenvolvedor);
        setAlertMessage("Desenvolvedor atualizado com sucesso!");
      } else {
        await createDesenvolvedor(desenvolvedor);
        setAlertMessage("Novo desenvolvedor criado com sucesso!");
      }
      setAlertSeverity("success");
      setAlertOpen(true);
      await loadDesenvolvedores();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar desenvolvedor:", error);
      setAlertMessage("Erro ao salvar desenvolvedor!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return {
    desenvolvedores,
    desenvolvedorEditando,
    niveis,
    loading,
    loadingNiveis,
    open,
    openCreate,
    alertOpen,
    alertMessage,
    alertSeverity,
    handleDelete,
    handleEdit,
    handleCreate,
    handleClose,
    handleSave,
    handleAlertClose,
    SnackbarComponent: (
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    ),
  };
};

export default useDesenvolvedores;
