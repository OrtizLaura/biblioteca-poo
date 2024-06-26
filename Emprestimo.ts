import { Livro } from "./Livro";
import { Membro } from "./Membro";
import { Utils } from "./Utils";
import { livros, membros, emprestimos } from "./app";
import promptSync from "prompt-sync";
import fs from 'fs';

const prompt = promptSync();

export class Emprestimo {
    protected _membro: Membro;
    protected _livro: Livro;
    protected _dataEmprestimo: Date;
    protected _dataDevolucao: Date | null;

    constructor(membro: Membro, livro: Livro, dataEmprestimo: Date, dataDevolucao: Date | null = null) {
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
        this._membro = membro;
        this._livro = livro;
    }

    get livro(): Livro {
        return this._livro;
    }

    get membro(): Membro {
        return this._membro;
    }

    get dataEmprestimo(): Date {
        return this._dataEmprestimo;
    }
    set dataEmprestimo(dataEmprestimo: Date | null) {
        if (dataEmprestimo instanceof Date) {
            this._dataEmprestimo = dataEmprestimo
        }
    }

    get dataDevolucao(): Date | null {
        return this._dataDevolucao;
    }
    set dataDevolucao(dataDevolucao: Date) {
        this._dataDevolucao = dataDevolucao
    }

    static emprestar() {
        Membro.listarCadastro();
        const opcaoMembro : number = Number(prompt("Para qual membro será feito o empréstimo? "));

        if (opcaoMembro > (membros.length + 1)) {
            console.log("ERRO: Este membro não existe!");
            return;
        }

        Livro.listar(true);

        if (Emprestimo.verificaExisteLivroParaEmprestimo() == true) {
            console.log("=============== \n");
            console.log("Não há nenhum livro para empréstimo! \n");
            console.log("=============== \n");
            return;
        }


        const opcaoLivro : number = Number(prompt("Qual livro será feito o empréstimo? "));
        if (opcaoLivro > (livros.length + 1)) {
            console.log("ERRO: Este livro não existe!");
            return;
        }

        emprestimos.push(new Emprestimo(membros[opcaoMembro - 1], livros[opcaoLivro - 1], new Date()));
        Emprestimo.salvarDados();

        console.log(" ========= ");
        console.log(` Livro ${livros[opcaoLivro - 1].titulo} emprestado para ${membros[opcaoMembro - 1].nome} com sucesso!`);
        console.log(" ========= ");
    }

    static listar(escopo: string = "todos") {
        if (emprestimos.length === 0) {
            console.log("=============== \n");
            console.log("Não há empréstimos cadastrados! \n");
            console.log("=============== \n");
            return;
        }

        console.log('# =================================');
        console.log('# Lista de empréstimos:');
        console.log('---------------------------------------------------------------------------------------------');
        console.log('|   |  MEMBRO                   | LIVRO                     | DATA EMPRÉSTIMO | DATA DEVOLUÇÃO |');
        console.log('---------------------------------------------------------------------------------------------');

        emprestimos.forEach((emprestimo, indice) => {
            let dataEmprestimo = Utils.formatarData(emprestimo.dataEmprestimo);
            let dataDevolucao = "";
            if (emprestimo.dataDevolucao) {
                dataDevolucao = Utils.formatarData(emprestimo.dataDevolucao);
            }
            if (escopo === "ativos") {
                if (dataDevolucao != "") {
                    return;
                }
            }
            console.log(`| ${indice + 1} | ${emprestimo.membro.nome.padEnd(25)} | ${emprestimo.livro.titulo.padEnd(25)} | ${dataEmprestimo.padEnd(15)} | ${dataDevolucao.padEnd(15)} |`);
        });
        console.log('# =================================');
    }

    static devolver() {
        Emprestimo.listar();

        let emprestimoOpcao = Number(prompt("Digite o número do empréstimo que deseja devolver:"));
        if (emprestimoOpcao > (livros.length + 1)) {
            console.log("ERRO: Este livro não existe!");
            return;
        }

        emprestimoOpcao = emprestimoOpcao - 1;

        emprestimos[emprestimoOpcao].dataDevolucao = new Date();
        Emprestimo.salvarDados();

        console.log(" ========= ");
        console.log(` Livro devolvido com sucesso!`);
        console.log(" ========= ");
    }

    static salvarDados() {
        const arquivo = "emprestimos.txt";

        const data = JSON.stringify(emprestimos, (key, value) => {
            return value;
        }, 2);
        fs.writeFileSync(arquivo, data);
    }
    
    static recuperarDados() {
        const arquivo = "emprestimos.txt";

        if (fs.existsSync(arquivo)) {
            const dados = fs.readFileSync(arquivo, 'utf-8');
            const emprestimosArquivo = JSON.parse(dados);

            emprestimosArquivo.map((obj: any) => {
                const livro = new Livro(obj._livro._titulo, obj._livro._autor, obj._livro._ano, obj._livro._editora, obj._livro._isbn);
                const membro = new Membro(obj._membro._nome, obj._membro._cpf, obj._membro._nascimento, obj._membro._telefone, obj._membro._endereco, obj._membro._numeroMatricula)
                const objeto = new Emprestimo(membro, livro, obj._dataEmprestimo, obj._dataDevolucao);
                
                emprestimos.push(objeto);
            });
        }
    }

    static verificaExisteLivroParaEmprestimo() {
        let nenhumLivro = true;

        for (let emp of emprestimos) {
            if (emp.dataDevolucao != null) {
                
                nenhumLivro = false;
            }
        }        

        if (nenhumLivro == true) {
            return true;
        } else {
            return false;
        }

    }
}