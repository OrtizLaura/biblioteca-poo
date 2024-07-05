import { emprestimos, livros } from './app';
import promptSync from 'prompt-sync';
import fs from 'fs';

const prompt = promptSync();

export class Livro {
    protected _titulo: string;
    protected _autor: string;
    protected _ano: number;
    protected _editora: string;
    protected _isbn:number;

    constructor(titulo: string, autor: string, ano: number, editora: string, isbn: number) {
        this._titulo = titulo;
        this._autor = autor;
        this._ano = ano;
        this._editora = editora;
        this._isbn = isbn;
    }

    get titulo(): string {
        return this._titulo;
    }
    set titulo(titulo: string) {
        this._titulo = titulo;
    }

    get autor(): string {
        return this._autor;
    }
    set autor(autor: string) {
        this._autor = autor;
    }

    get ano(): number {
        return this._ano;
    }
    set ano(ano: number) {
        this._ano = ano;
    }

    get editora(): string {
        return this._editora;
    }
    set editora(editora: string) {
        this._editora = editora;
    }

    get isbn(): number {
        return this._isbn;
    }
    set isbn(isbn: number) {
        this._isbn = isbn;
    }

    /*
    * Método que cadastra um novo livro
    */
    static adicionarLivro(){
        console.log("\n =================================");
        let titulo = prompt("Qual o título do livro? ");
        let autor = prompt("Qual o autor do livro? ");
        let ano = Number(prompt("Qual o ano do livro? "));
        let editora = prompt("Qual a editora do livro? ");
        let isbn = Number(prompt("Qual o ISBN do livro? "));

        let livro = new Livro(titulo, autor, ano, editora, isbn);

        console.log(" ========= ");
        console.log(" Livro cadastrado com sucesso!");
        console.log(" ========= ");
        
        livros.push(livro);
        Livro.salvarDados();
    }

    /*
    * Método que lista todos os livros cadastrados ou 
    * somente os livros emprestados, fazendo esse controle
    * por um parâmetro passado para o método
    */
    static listar(emprestimo = false) {
        if (livros.length === 0) {
            console.log("=============== \n");
            console.log("Não há livros cadastrados! \n");
            console.log("=============== \n");
            return;
        }

        console.log('# =================================');
        console.log('# Lista de livros:');
        console.log('---------------------------------------------------------------------------------------------');
        console.log('|   |  TITULO              | AUTOR                | ANO   | EDITORA              | ISBN     |');
        console.log('---------------------------------------------------------------------------------------------');
        livros.forEach((livro, indice) => {
            let sair = false;
            if (emprestimo == true) {
                for (let emp of emprestimos) {
                    if (emp.dataDevolucao == null) {
                        sair = true;
                        break;
                    }
                }
            }
            if (sair == true) {
                return;
            }
            console.log(`| ${indice + 1} | ${livro.titulo.padEnd(20)} | ${livro.autor.padEnd(20)} | ${livro.ano} | ${livro.editora.padEnd(20)} | ${livro.isbn} |`);
        });
        console.log('# =================================');
    }

    /*
    * Método que atualiza os dados dos livros
    */
    static atualizar() {
        Livro.listar();
        
        let livro_atualizar = Number(prompt("Digite o número do livro que deseja atualizar:"));
        if (livro_atualizar > (livros.length + 1)) {
            console.log("ERRO: Este livro não existe!");
            return;
        }

        livro_atualizar = livro_atualizar - 1;

        console.log("\n ==========================================");
        console.log("== Deixe em branco para não atualizar! == ");
        let titulo = prompt("Qual o novo título do livro? ");
        let autor = prompt("Qual o novo autor do livro? ");
        let ano = Number(prompt("Qual o novo ano do livro? "));
        let editora = prompt("Qual a nova editora do livro? ");
        let isbn = Number(prompt("Qual o novo ISBN do livro? "));

        if (titulo) {
            livros[livro_atualizar].titulo = titulo;
        }
        
        if (autor) {
            livros[livro_atualizar].autor = autor;
        }

        if (ano) {
            livros[livro_atualizar].ano = ano;
        }

        if (editora) {
            livros[livro_atualizar].editora = editora;
        }

        if (isbn) {
            livros[livro_atualizar].isbn = isbn;
        }

        Livro.salvarDados();

        console.log("========= ");
        console.log("# Livro atualizado com sucesso!");
        console.log("========= ");
    }

    /*
    * Método que remove um livro
    */
    static remover() {
        Livro.listar();

        let livro_deletar = Number(prompt("Digite o número do livro que deseja remover:"));
        if (livro_deletar > (livros.length + 1)) {
            console.log("ERRO: Este livro não existe!");
            return;
        }

        //- serve para remover uma posição do array
        livros.splice(livro_deletar - 1, 1)

        Livro.salvarDados();

        console.log(" ========= ");
        console.log(" Livro removido com sucesso!");
        console.log(" ========= ");
    }

    /*
    * Método para salvar os dados no arquivo
    */
    static salvarDados() {
        const arquivo = "livros.txt";

        // transforma os dados do array de livros em JSON para salvar no arquivo de texto
        const data = JSON.stringify(livros, (key, value) => {
            return value;
        }, 2);

        // escreve no arquivo texto
        fs.writeFileSync(arquivo, data);
    }
    
    /*
    * Método para recuperar os dados do arquivo
    */
    static recuperarDados() {
        const arquivo = "livros.txt";

        // verifica se o arquivo existe
        if (fs.existsSync(arquivo)) {
            // le os dados de dentro do arquivo
            const dados = fs.readFileSync(arquivo, 'utf-8');
            // transforma os dados de string para um objeto
            const livrosArquivo = JSON.parse(dados);

            // transforma o objeto e salva em array novamente
            livrosArquivo.map((l: any) => {
                let objeto = new Livro(l._titulo, l._autor, l._ano, l._editora, l._isbn);
                livros.push(objeto);
            });
        }
    }
}

