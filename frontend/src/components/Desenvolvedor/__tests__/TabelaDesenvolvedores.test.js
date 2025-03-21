import { render, screen, fireEvent } from "@testing-library/react";
import TabelaDesenvolvedores from "../TabelaDesenvolvedores";

const mockDesenvolvedores = [
  { id: 1, nome: "João", sexo: "M", idade: 25, hobby: "Programação", nivel: { nivel: "Júnior" } },
  { id: 2, nome: "Maria", sexo: "F", idade: 30, hobby: "Desenho", nivel: { nivel: "Pleno" } },
];

test("renderiza a tabela com desenvolvedores", () => {
  render(<TabelaDesenvolvedores desenvolvedores={mockDesenvolvedores} onEditar={() => {}} onDeletar={() => {}} />);
  
  expect(screen.getByText("João")).toBeInTheDocument();
  expect(screen.getByText("Maria")).toBeInTheDocument();
  expect(screen.getByText("Júnior")).toBeInTheDocument();
});

test("clique no botão Alterar chama a função de edição", () => {
  const mockEditar = jest.fn();
  render(<TabelaDesenvolvedores desenvolvedores={mockDesenvolvedores} onEditar={mockEditar} onDeletar={() => {}} />);
  
  fireEvent.click(screen.getAllByText("Alterar")[0]);
  expect(mockEditar).toHaveBeenCalled();
});

test("clique no botão Deletar abre o modal de confirmação", () => {
  render(<TabelaDesenvolvedores desenvolvedores={mockDesenvolvedores} onEditar={() => {}} onDeletar={() => {}} />);
  
  fireEvent.click(screen.getAllByText("Deletar")[0]);
  expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
});
