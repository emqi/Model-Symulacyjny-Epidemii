export class Animal {
  age: number;
  phase: number;
  isResistant: boolean;
  breedPhase: number;

  constructor(age = 1, phase, isResistant, breedPhase = 0) {
    this.age = age;
    //phase = 0 - nie chory, 1 - chory bezobjawowy, 2 - chory objawowy
    this.phase = phase;
    this.isResistant = isResistant;
    //breedPhase = 0 - nie jest w ciazy ; 1 - jest, ale nie rodzi w tej turze; 2 - w biezacej turze rodzi
    this.breedPhase = breedPhase;
  }
}

export class Result {
  startingNumber: number;
  endingNumber: number;
  bornNumber: number;
  sickDeathsNumber: number;
  ageDeathsNumber: number;
  healthyNumber: number;
  sickNumber: number;
  resistantNumber: number;
  sickPhaseOneNumber: number;
  sickPhaseTwoNumber: number;

  constructor(
    startingNumber,
    endingNumber,
    bornNumber,
    sickDeathsNumber,
    ageDeathsNumber,
    healthyNumber,
    sickNumber,
    resistantNumber,
    sickPhaseOneNumber,
    sickPhaseTwoNumber
  ) {
    this.startingNumber = startingNumber;
    this.endingNumber = endingNumber;
    this.bornNumber = bornNumber;
    this.sickDeathsNumber = sickDeathsNumber;
    this.ageDeathsNumber = ageDeathsNumber;
    this.healthyNumber = healthyNumber;
    this.sickNumber = sickNumber;
    this.resistantNumber = resistantNumber;
    this.sickPhaseOneNumber = sickPhaseOneNumber;
    this.sickPhaseTwoNumber = sickPhaseTwoNumber;
  }
}
