import { Pessoa } from "./Pessoa";
import { membros } from "./app";
import { Utils } from "./Utils";
import promptSync from "prompt-sync";
import fs from 'fs';

const prompt = promptSync();

/*
* A classe membro estende a classe pessoa, e 
* herda os atributos da classe pessoa
*/
export class Membro extends Pessoa{
    protected _numeroMatricula: string; 

    constructor(nome: string, cpf: string, nascimento: Date, telefone: number, endereco: string, numeroMatricula: string) {
        // enviando os dados para a classe pessoa
        super(nome, cpf, nascimento, telefone, endereco);
        this._numeroMatricula = numeroMatricula;
    }

    get numeroMatricula(): string {
        return this._numeroMatricula;
    }
    set numeroMatricula(numeroMatricula: string) {
        this._numeroMatricula = numeroMatricula;
    }
    
    /*
    * Verifica se o formato da data de nascimento é válido
    */
    static verificaNascimento(dataNasc: string): boolean {
        const [day, month, year] = dataNasc.split('/').map(Number);
        const nascimento = new Date(year, month - 1, day);

        if (isNaN(nascimento.getTime())) {
            console.log('!!! Data de nascimento inválida. Tente novamente.');
            return true;
        } else {
            return false
        }
    }

    /*
    * Método para adicionar novo membro
    */
    static adicionarMembro() {
        console.log("\n =================================");
        let nome = prompt("Qual o nome do membro? ");

        let nascimentoString: string;
        let verificaNascimento: boolean = true;

        do {
            nascimentoString = prompt('Data de nascimento (DD/MM/YYYY): ');

            verificaNascimento = Membro.verificaNascimento(nascimentoString);
        } while (verificaNascimento);

        const [day, month, year] = nascimentoString.split('/').map(Number);
        const nascimento = new Date(year, month - 1, day);

        let cpf = prompt("Qual o cpf do membro? ");
        let telefone = Number(prompt("Qual o telefone do membro? "));
        let endereco = prompt("Qual o endereço do membro? ");
        let matricula = prompt("Qual a matricula do membro? ");

        let membro = new Membro(nome, cpf, nascimento, telefone, endereco, matricula);

        console.log(" ========= ");
        console.log(" Membro cadastrado com sucesso!");
        console.log(" ========= ");
        
        membros.push(membro);
        Membro.salvarDados();
    }

    /*
    * Método para listar os dados dos membros
    */
    static listarCadastro() {
        if (membros.length === 0) {
            console.log("=============== \n");
            console.log("Não há membros cadastrados! \n");
            console.log("=============== \n");
            return;
        }

        console.log('# =================================');
        console.log('# Lista de membros:');
        console.log('------------------------------------------------------------------------------------------------------------------------');
        console.log('|   |  NOME                | TELEFONE     | NASCIMENTO | TELEFONE       | ENDERECO              | MATRICULA              |');
        console.log('------------------------------------------------------------------------------------------------------------------------');
        membros.forEach((membro, indice) => {
            const nascimentoFormatado = Utils.formatarData(membro.nascimento);
            console.log(`| ${indice + 1} | ${membro.nome.padEnd(20)} | ${membro.cpf.padEnd(12)} | ${nascimentoFormatado} | ${membro.telefone} | ${membro.endereco.padEnd(30)} | ${membro.numeroMatricula.padEnd(15)} |`);
        });
        console.log('# =================================');
    }

    /*
    * Método para atualizar as informações dos membros
    */
    static atualizarInformacoes() {
        Membro.listarCadastro();
        
        let membro_atualizar = Number(prompt("Digite o número do membro que deseja atualizar:"));
        if (membro_atualizar > (membros.length + 1)) {
            console.log("ERRO: Este membro não existe!");
            return;
        }

        membro_atualizar = membro_atualizar - 1;
        let nascimentoString: string;
        let verificaNascimento: boolean = true;

        console.log("\n ==========================================");
        console.log("== Deixe em branco para não atualizar! == ");
        let nome = prompt("Qual o novo nome do membro? ");
        let cpf = prompt("Qual o novo CPF do membro? ");

        // Enquanto o formato da data de nascimento estiver errada, é pedido novamente 
        do {
            nascimentoString = prompt("Qual a nova data de nascimento do membro? (DD/MM/YYYY) ");
            
            if (nascimentoString) {
                verificaNascimento = Membro.verificaNascimento(nascimentoString);
                if (verificaNascimento == false) {
                    const [day, month, year] = nascimentoString.split('/').map(Number);
                    const nascimento = new Date(year, month - 1, day);
            
                    membros[membro_atualizar].nascimento = nascimento;
                }
            } else {
                verificaNascimento = false;
            }
        } while (verificaNascimento);

        let telefone = Number(prompt("Qual o novo telefone do membro? "));
        let endereco = prompt("Qual o novo endereço do membro? ");
        let numeroMatricula = prompt("Qual o novo número de Matrícula do membro? ");

        if (nome) {
            membros[membro_atualizar].nome = nome;
        }

        if (cpf) {
            membros[membro_atualizar].cpf = cpf;
        }
        
        if (telefone) {
            membros[membro_atualizar].telefone = telefone;
        }

        if (endereco) {
            membros[membro_atualizar].endereco = endereco;
        }

        if (numeroMatricula) {
            membros[membro_atualizar].numeroMatricula = numeroMatricula;
        }

        Membro.salvarDados();

        console.log("========= ");
        console.log("# Membro atualizado com sucesso!");
        console.log("========= ");
    }

    /*
    * Método para remover membro
    */
    static removerMembro() {
        Membro.listarCadastro();

        let livro_deletar = Number(prompt("Digite o número do membro que deseja remover:"));
        if (livro_deletar > (membros.length + 1)) {
            console.log("ERRO: Este membro não existe!");
            return;
        }

        membros.splice(livro_deletar - 1, 1)
        Membro.salvarDados();

        console.log("========= ");
        console.log("# Membro removido com sucesso!");
        console.log("========= ");
    }

    /*
    * Método para salvar os dados no arquivo
    */
    static salvarDados() {
        const arquivo = "membros.txt";

        // transforma os dados do array de livros em JSON para salvar no arquivo de texto
        const data = JSON.stringify(membros, (key, value) => {
            return value;
        }, 2);
        // escreve no arquivo texto
        fs.writeFileSync(arquivo, data);
    }
    
    /*
    * Método para recuperar os dados do arquivo
    */
    static recuperarDados() {
        const arquivo = "membros.txt";

        // verifica se o arquivo existe
        if (fs.existsSync(arquivo)) {
            // le os dados de dentro do arquivo
            const dados = fs.readFileSync(arquivo, 'utf-8');
            // transforma os dados de string para um objeto
            const membrosArquivo = JSON.parse(dados);

            // transforma o objeto e salva em array novamente
            membrosArquivo.map((m: any) => {
                let objeto = new Membro(m._nome, m._cpf, new Date(m._nascimento), m._telefone, m._endereco, m._numeroMatricula);
                membros.push(objeto);
            });
        }
    }
}