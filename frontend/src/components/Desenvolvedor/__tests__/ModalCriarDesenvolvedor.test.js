import { render, screen, fireEvent } from "@testing-library/react";
import ModalCriarDesenvolvedor from "../ModalCriarDesenvolvedor";

test("abre e fecha o modal de criação", () => {
  const mockClose = jest.fn();
  render(<ModalCriarDesenvolvedor open={true} onClose={mockClose} onSave={() => {}} />);
  
  expect(screen.getByText("Criar Novo Desenvolvedor")).toBeInTheDocument();
  
  fireEvent.click(screen.getByText("Cancelar"));
  expect(mockClose).toHaveBeenCalled();
});

test("preenche campos e salva um novo desenvolvedor", () => {
  const mockSave = jest.fn();
  render(<ModalCriarDesenvolvedor open={true} onClose={() => {}} onSave={mockSave} />);

  fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Carlos" } });
  fireEvent.change(screen.getByLabelText("Hobby"), { target: { value: "Futebol" } });

  fireEvent.click(screen.getByText("Salvar"));

  expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ nome: "Carlos", hobby: "Futebol" }));
});
