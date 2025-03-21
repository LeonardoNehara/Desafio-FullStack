import { useEffect, useState } from "react";
import { getNiveis, deleteNivel, updateNivel, createNivel } from "../services/nivelService";

const useNiveis = () => {
  const [niveis, setNiveis] = useState([]);
  const [nivelEditando, setNivelEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    loadNiveis();
  }, []);

  const loadNiveis = async () => {
    try {
      const { data, meta } = await getNiveis();
      setNiveis(data);
      setPagination(meta);
    } catch (error) {
      console.error("Erro ao carregar níveis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteNivel(id);
    loadNiveis();
  };

  const handleEdit = (nivel) => {
    setNivelEditando(nivel);
    setOpen(true);
  };

  const handleCreate = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCreate(false);
  };

  const handleSave = async (nivel) => {
    try {
      if (nivel.id) {
        await updateNivel(nivel.id, nivel);
      } else {
        await createNivel(nivel);
      }
      await loadNiveis();
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar nível:", error);
    }
  };

  return {
    niveis,
    nivelEditando,
    loading,
    open,
    openCreate,
    pagination,
    handleDelete,
    handleEdit,
    handleCreate,
    handleClose,
    handleSave,
  };
};

export default useNiveis;
