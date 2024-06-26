export class Utils
{
    static formatarData(data: Date): string {
        let dataObjeto = new Date(data);

        let dia = dataObjeto.getDate();
        let mes = dataObjeto.getMonth() + 1;
        let ano = dataObjeto.getFullYear();

        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    }

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