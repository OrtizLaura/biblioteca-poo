export class Pessoa {
    protected _nome: string;
    protected _cpf: string;
    protected _nascimento: Date;
    protected _telefone: number;
    protected _endereco: string;


    constructor(nome: string, cpf: string, nascimento: Date, telefone: number, endereco: string) {
        this._nome = nome;
        this._cpf = cpf;
        this._nascimento = nascimento;
        this._telefone = telefone;
        this._endereco = endereco;
    }

    get nome(): string {       
        return this._nome;
    }
    set nome(nome: string) {       
        this._nome = nome
    }

    get cpf(): string {
        return this._cpf;
    }
    set cpf(cpf: string) {
        this._cpf = cpf
    }

    get nascimento(): Date {
        return this._nascimento;
    }
    set nascimento(nascimento: Date) {
        this._nascimento = nascimento
    }

    get telefone(): number {
        return this._telefone;
    }
    set telefone(telefone: number) {
        this._telefone = telefone
    }

    get endereco(): string {
        return this._endereco;
    }
    set endereco(endereco: string) {
        this._endereco = endereco
    }


}
