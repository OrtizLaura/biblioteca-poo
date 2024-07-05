export class Utils
{
    /*
    * Método para formatar a data para exibição dd/mm/aaaa
    */
    static formatarData(data: Date): string {
        let dataObjeto = new Date(data);

        let dia = dataObjeto.getDate();
        let mes = dataObjeto.getMonth() + 1;
        let ano = dataObjeto.getFullYear();

        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    }

    /*
    * Faz a verificação se o formato da data é válido
    */
    static verificaDataValida(data: string): boolean {
        const [day, month, year] = data.split('/').map(Number);
        const dataFormatada = new Date(year, month - 1, day);

        if (isNaN(dataFormatada.getTime())) {
            console.log('!!! Data inválida. Tente novamente.');
            return true;
        } else {
            return false
        }
    }
}