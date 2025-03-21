import React from "react";
import useDesenvolvedores from "../hooks/useDesenvolvedores";
import TabelaDesenvolvedores from "../components/Desenvolvedor/TabelaDesenvolvedores";
import ModalEditarDesenvolvedor from "../components/Desenvolvedor/ModalEditarDesenvolvedor";
import ModalCriarDesenvolvedor from "../components/Desenvolvedor/ModalCriarDesenvolvedor";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const Desenvolvedores = () => {
  const {
    desenvolvedores,
    desenvolvedorEditando,
    loading,
    open,
    openCreate,
    handleDelete,
    handleEdit,
    handleCreate,
    handleClose,
    handleSave,
  } = useDesenvolvedores();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>Lista de Desenvolvedores</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Novo Desenvolvedor
        </Button>
      </div>
      <TabelaDesenvolvedores 
        desenvolvedores={desenvolvedores} 
        onEditar={handleEdit} 
        onDeletar={handleDelete} 
      />

      <ModalEditarDesenvolvedor 
        open={open} 
        desenvolvedorEditando={desenvolvedorEditando} 
        onClose={handleClose} 
        onSave={handleSave} 
      />

      <ModalCriarDesenvolvedor 
        open={openCreate} 
        onClose={handleClose} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Desenvolvedores;
