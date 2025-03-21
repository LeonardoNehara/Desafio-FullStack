import { render, screen } from "@testing-library/react";
import ModalEditarDesenvolvedor from "../ModalEditarDesenvolvedor";

const mockDesenvolvedor = { id: 1, nome: "João", nivel_id: 2, sexo: "M", data_nascimento: "1995-06-15", hobby: "Xadrez" };

test("exibe os dados corretos ao abrir para edição", () => {
  render(<ModalEditarDesenvolvedor open={true} desenvolvedorEditando={mockDesenvolvedor} onClose={() => {}} onSave={() => {}} />);
  
  expect(screen.getByDisplayValue("João")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Xadrez")).toBeInTheDocument();
});
