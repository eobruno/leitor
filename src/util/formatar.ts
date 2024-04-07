export class Formatar {
  static data(data: string): string {
    let ano = parseInt(data.slice(0, 2), 10);

    // Adicionando 1900 para anos de 25 a 99
    // Adicionando 2000 para anos de 00 a 24
    ano = ano >= 25 ? 1900 + ano : 2000 + ano;

    const mes = parseInt(data.slice(2, 4), 10) - 1; // Subtraindo 1 para ajustar o índice do mês
    const dia = parseInt(data.slice(4), 10);

    const dataObj = new Date(ano, mes, dia);

    // Array com os nomes dos meses
    const nomesDosMeses = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];

    // Obtendo o dia, mês e ano
    const diaFormatado = ("0" + dia).slice(-2); // Garantindo que o dia tenha dois dígitos
    const mesAbreviado = nomesDosMeses[mes];
    const anoFormatado = ano;

    // Construindo a data formatada
    const dataFormatada = `${diaFormatado}/${mesAbreviado}/${anoFormatado}`;

    return dataFormatada;
  }

  static expiryDate(data: string): string {
    const ano = parseInt(data.slice(0, 2), 10) + 2000; // Adicionando 1900 para tratar anos no formato yy
    const mes = parseInt(data.slice(2, 4), 10) - 1; // Subtraindo 1 para ajustar o índice do mês
    const dia = parseInt(data.slice(4), 10);

    const dataObj = new Date(ano, mes, dia);

    // Array com os nomes dos meses
    const nomesDosMeses = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];

    // Obtendo o dia, mês e ano
    const diaFormatado = ("0" + dia).slice(-2); // Garantindo que o dia tenha dois dígitos
    const mesAbreviado = nomesDosMeses[mes];
    const anoFormatado = ano;

    // Construindo a data formatada
    const dataFormatada = `${diaFormatado}/${mesAbreviado}/${anoFormatado}`;

    return dataFormatada;
  }

  static documentType(documentType: string): string {
    switch (documentType) {
      case "P":
        return "P - PASSAPORTE";
      case "I":
        return "I - IDENTIDADE";
      case "V":
        return "V - VISTO";
      case "D":
        return "M - MOTORISTA";
      case "R":
        return "R - Residência";
      // Adicione mais casos conforme necessário para outros tipos de documentos
      default:
        return "Tipo de documento não reconhecido";
    }
  }

  static sex(sex: string): string {
    return sex.toUpperCase() === "M"
      ? "M - MASCULINO"
      : sex.toUpperCase() === "F"
      ? "F - FEMININO"
      : "Valor de sexo inválido";
  }
}
