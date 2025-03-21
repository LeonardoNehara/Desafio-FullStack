import useNiveis from "../hooks/useNiveis";
import TabelaNiveis from "../components/Nivel/TabelaNiveis";
import ModalEditarNivel from "../components/Nivel/ModalEditarNivel";
import ModalCriarNivel from "../components/Nivel/ModalCriarNivel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const Niveis = () => {
  const {
    niveis,
    nivelEditando,
    loading,
    open,
    openCreate,
    handleDelete,
    handleEdit,
    handleCreate,
    handleClose,
    handleSave,
  } = useNiveis();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>Lista de Níveis</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Novo Nível
        </Button>
      </div>
      <TabelaNiveis niveis={niveis} onEditar={handleEdit} onDeletar={handleDelete} />

      <ModalEditarNivel open={open} nivelEditando={nivelEditando} onClose={handleClose} onSave={handleSave} />
      <ModalCriarNivel open={openCreate} onClose={handleClose} onSave={handleSave} />
    </div>
  );
};

export default Niveis;
