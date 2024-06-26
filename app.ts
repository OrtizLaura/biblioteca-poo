import { Livro } from "./Livro";
import { Emprestimo } from "./Emprestimo";
import { Membro } from "./Membro";
import { Menu } from "./Menu";

export const livros: Livro[] = [];
export const membros: Membro[] = [];
export const emprestimos: Emprestimo[] = [];

function main() {
    Livro.recuperarDados();
    Emprestimo.recuperarDados();
    Membro.recuperarDados();

    Menu.iniciar();

}

main();


