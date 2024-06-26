import promptSync from 'prompt-sync';
const prompt = promptSync();
import { Livro } from './Livro';
import { Membro } from './Membro';
import { Emprestimo } from './Emprestimo';

export class Menu {
    static iniciar(): void {
        let continua: boolean = true;

        while (continua) {
            console.log("---------Menu Principal--------");
            console.log("# 1 - Menu Livros            #");
            console.log("# 2 - Menu Membros           #");
            console.log("# 3 - Menu Empréstimos       #");
            console.log("# 0 - SAIR                   #");
            console.log("------------------------------");
    

            const opcao : number = Number(prompt("Escolha uma opção: "));
    
            switch(opcao){
                case 0:
                    let retorno = prompt("Deseja realmente sair? (S/N) ");
                    if (retorno == "s" || retorno == "S") {
                        continua = false;
                    }
                    break;
                    
                case 1:
                    Menu.menuLivro();
                    break;
                case 2:
                    Menu.menuMembro();
                    break;
                case 3:
                    Menu.menuEmprestimos();
                    break;
    
                default:
                    console.log("Opção inválida");
            }
        }
    }

    static menuLivro() {
        let continua: boolean = true;

        while (continua) {
            console.log("------------ Menu Livro -----------");
            console.log("# 1 - Adicionar Livro            #");
            console.log("# 2 - Listar todos               #");
            console.log("# 3 - Atualizar informações      #");
            console.log("# 4 - Remover um Livro           #");
            console.log("# 0 - Voltar ao menu anterior    #");
            console.log("----------------------------------");

            const opcao : number = Number(prompt("Escolha uma opção: "));
    
            switch(opcao){
                case 0:
                    continua = false;
                    break;                   
                case 1:
                    Livro.adicionarLivro();
                    break;
                case 2:
                    Livro.listar();
                    break;
                case 3:
                    Livro.atualizar();
                    break;
                case 4:
                    Livro.remover();
                    break;             

                default:
                    console.log("Opção inválida");
            }
        }
    }

    static menuMembro() {
        let continua: boolean = true;

        while (continua) {
            console.log("----------- Menu Membro ----------");
            console.log("# 1 - Adicionar Membro            #");
            console.log("# 2 - Listar todos                #");
            console.log("# 3 - Atualizar informações       #");
            console.log("# 4 - Remover um membro           #");
            console.log("# 0 - Voltar ao menu anterior     #");
            console.log("----------------------------------");

            const opcao : number = Number(prompt("Escolha uma opção: "));
    
            switch(opcao){
                case 0:
                    continua = false;
                    break;                   
                case 1:
                    Membro.adicionarMembro();
                    break;
                case 2:
                    Membro.listarCadastro();
                    break;
                case 3:
                    Membro.atualizarInformacoes();
                    break;
                case 4:
                    Membro.removerMembro();
                    break;             

                default:
                    console.log("Opção inválida");
            }
        }
    }

    static menuEmprestimos() {
        let continua: boolean = true;

        while (continua) {
            console.log("--------- Menu Empréstimo --------");
            console.log("# 1 - Realizar empréstimo         #");
            console.log("# 2 - Listar ativos               #");
            console.log("# 3 - Realizar devolução          #");
            console.log("# 4 - Listar histórico            #");
            console.log("# 0 - Voltar ao menu anterior     #");
            console.log("----------------------------------");

            const opcao : number = Number(prompt("Escolha uma opção: "));
    
            switch(opcao){
                case 0:
                    continua = false;
                    break;                   
                case 1:
                    Emprestimo.emprestar();
                    break;
                case 2:
                    Emprestimo.listar("ativos");
                    break;
                case 3:
                    Emprestimo.devolver();
                    break;
                case 4:
                    Emprestimo.listar();
                    break;
                default:
                    console.log("Opção inválida");
            }
        }
    }
}