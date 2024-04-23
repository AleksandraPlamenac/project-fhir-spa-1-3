
export interface Patient {
  id: string;
  login: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  labResults: string;
  labInterpretation: string;
  advise: string;
  currentMedications: string[];
}