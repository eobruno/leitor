export type MrzObject = {
  id: string;
  documentType: string;
  countryCode: string;
  lastName: string;
  firstName: string;
  documentNumber: string;
  nationality: string;
  passportNumber: string;
  birthDate: string;
  sex: string;
  expiryDate: string;
  personalNumber: string;
  checksum: string;
  optionalData: string;
  photo64: string;
};

// Tipagem do seu objeto matchMRZList
export type MrzItem = {
  value: string;
  matchCount: number;
};

export type MRZList = {
  documentType: MrzItem[];
  countryCode: MrzItem[];
  lastName: MrzItem[];
  firstName: MrzItem[];
  documentNumber: MrzItem[];
  nationality: MrzItem[];
  passportNumber: MrzItem[];
  birthDate: MrzItem[];
  sex: MrzItem[];
  expiryDate: MrzItem[];
  personalNumber: MrzItem[];
  checksum: MrzItem[];
  optionalData: MrzItem[];
};

export type CanvasOptions = {
  width: number;
  height: number;
  x: number;
  y: number;
};
