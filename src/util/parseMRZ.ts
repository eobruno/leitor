
import { MrzObject } from "../types/types";

export const parseMRZ = (text: string) => {
  const lines = text.split("\n");
  let mrzObject: MrzObject = {
    id:"",
    documentType: "",
    countryCode: "",
    lastName: "",
    firstName: "",
    documentNumber: "",
    nationality: "",
    passportNumber: "",
    birthDate: "",
    sex: "",
    expiryDate: "",
    personalNumber: "",
    checksum: "",
    optionalData: "",
    photo64:"",
  };

  if (lines.length >= 2) {
    mrzObject.id = ""

    // Primeira Linha
    const firstLine = lines[0];
    mrzObject.documentType = firstLine.charAt(0);
    mrzObject.countryCode = firstLine.substr(2, 3).replace(/</g, "").replace(/\d/g, '');

    const nameField = firstLine.substr(5, 39).replace(/0/g,"O").replace(/5/g,"S");
    const nameParts = nameField.split("<<");
    mrzObject.lastName = nameParts[0].replace(/0/g,"O").replace(/5/g,"S").replace(/</g, " ").trim();

    // Tratar '<<' no firstName
    if (nameParts.length > 1) {
      mrzObject.firstName = nameParts
        .slice(1)
        .join(" ")
        .replace(/</g, " ")
        .trim();
    }

    //mrzObject.documentNumber = firstLine.substr(44, 9).replace(/</g, "").trim();
    

    // Segunda Linha
    const secondLine = lines[1];
    mrzObject.passportNumber = secondLine.substr(0, 8).replace(/</g, "").replace(/K/g, "").trim();
    mrzObject.nationality = secondLine.substr(10, 3).replace(/</g, "").replace(/\d/g, '');
    mrzObject.birthDate = secondLine.substr(13, 6); // YYMMDD
    mrzObject.sex = secondLine.charAt(20);
    mrzObject.expiryDate = secondLine.substr(21, 6); // YYMMDD
    //mrzObject.personalNumber = secondLine.substr(28, 14).replace(/</g, "").replace(/K/g, "").replace(/o/g, "0").replace(/O/g, "0").trim();
    mrzObject.checksum = secondLine.substr(42, 2).replace(/</g, "").replace(/o/g, "0").replace(/O/g, "0").trim();;

    // Campos opcionais (pode variar entre países)
    //mrzObject.optionalData = secondLine.substr(44).trim().replace(/</g, "").replace(/o/g, "0").replace(/O/g, "0").trim();
  }

  return mrzObject;
};
