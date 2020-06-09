import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { Animal, Result } from "./animal.model";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <div *ngIf="results.length === 0">
        <h1 class="header">Rozpocznij symulację:</h1>
        <label for="quantity">Liczba u.j.c.:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          [value]="numberOfTicks"
          (input)="numberOfTicks = $event.target.value"
        />
        <button
          class="margin-2px"
          (click)="numberOfTicks > 0 ? timeTick(numberOfTicks) : false"
        >
          Uruchom
        </button>
      </div>
      <div *ngIf="results.length > 0">
        <h1 class="header">Log:</h1>
        <div *ngFor="let result of results; index as i">
            <h3>U.J.C #{{ i + 1 }}:</h3>
            <span>Startowa liczba zwierząt wynosiła: {{ result.startingNumber }}.</span><br>
            <span> Zginęło {{ result.sickDeathsNumber + result.ageDeathsNumber }} z czego {{ result.sickDeathsNumber }} z powodu choroby, a {{ result.ageDeathsNumber }} ze starości.</span><br>
            <span>Urodziło się {{ result.bornNumber }} zwierząt.</span><br>
            <span>{{ result.healthyNumber }} było zdrowych, a {{ result.resistantNumber }} było odpornych na chorobę.</span><br>
            <span>Chorych było {{ result.sickNumber }} ({{result.sickPhaseOneNumber}} w 1 fazie, a {{ result.sickPhaseTwoNumber }} w 2 fazie).</span><br>
            <span>Końcowa liczba zwierząt wyniosła: {{ result.endingNumber }}.</span><br><br>
        </div>
      </div>
      <h1>Stan zwierząt:</h1>
      <table>
        <thead>
          <tr>
            <th>L.p.</th>
            <th>Wiek zwierzęcia</th>
            <th>Stan choroby</th>
            <th>Odporność</th>
            <th>Rozmnaża się?</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let animal of animals; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ animal.age }} u.j.c.</td>
            <td [ngSwitch]="animal.phase">
              <span *ngSwitchCase="0">Zdrowe</span>
              <span *ngSwitchCase="1">Chore - etap 1</span>
              <span *ngSwitchCase="2">Chore - etap 2</span>
            </td>
            <td [ngSwitch]="animal.isResistant">
              <span *ngSwitchCase="true">Tak</span>
              <span *ngSwitchCase="false">Nie</span>
            </td>
            <td [ngSwitch]="animal.breedPhase">
              <span *ngSwitchCase="0">Nie</span>
              <span *ngSwitchCase="1">Tak - etap 1</span>
              <span *ngSwitchCase="2">Tak - etap 2</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  numberOfTicks: number = 10;
  animals = new Array<Animal>();
  results = new Array<Result>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.animals = this.getInitialArray();
  }

  getRandomBreedPhaseForTwoYear = () => {
    const options = [0, 1];
    return options[Math.floor(Math.random() * options.length)];
  };

  getRandomBreedPhase = () => {
    const options = [0, 1, 2];
    return options[Math.floor(Math.random() * options.length)];
  };

  getInitialArray = () => {
    const animalArray = new Array<Animal>();
    // Age 1 - not sick
    for (let i = 0; i < 80; i++) {
      if (i < 20) {
        //age, phase,  isResistant, breedPhase
        animalArray.push(new Animal(1, 0, true, 0));
      } else {
        //age, phase, isResistant, breedPhase
        animalArray.push(new Animal(1, 0, false, 0));
      }
    }

    //sick
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        animalArray.push(new Animal(1, 1, true, 0));
      } else {
        animalArray.push(new Animal(1, 2, true, 0));
      }
    }

    // Age 2 - - not sick
    for (let i = 0; i < 90; i++) {
      if (i < 30) {
        animalArray.push(
          new Animal(2, 0, false, this.getRandomBreedPhaseForTwoYear())
        );
      } else {
        animalArray.push(
          new Animal(2, 0, false, this.getRandomBreedPhaseForTwoYear())
        );
      }
    }

    //sick
    for (let i = 0; i < 30; i++) {
      if (i < 10) {
        animalArray.push(
          new Animal(2, 1, true, this.getRandomBreedPhaseForTwoYear())
        );
      } else {
        animalArray.push(
          new Animal(2, 2, true, this.getRandomBreedPhaseForTwoYear())
        );
      }
    }

    // Age 3  - not sick
    for (let i = 0; i < 80; i++) {
      if (i < 10) {
        animalArray.push(new Animal(3, 0, false, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(3, 0, false, this.getRandomBreedPhase()));
      }
    }

    //sick
    for (let i = 0; i < 15; i++) {
      if (i < 10) {
        animalArray.push(new Animal(3, 1, true, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(3, 2, true, this.getRandomBreedPhase()));
      }
    }

    // Age 4 - not sick
    for (let i = 0; i < 70; i++) {
      if (i < 10) {
        animalArray.push(new Animal(4, 0, false, 0));
      } else {
        animalArray.push(new Animal(4, 0, false, 0));
      }
    }

    //sick
    for (let i = 0; i < 15; i++) {
      if (i < 10) {
        animalArray.push(new Animal(4, 1, true, 0));
      } else {
        animalArray.push(new Animal(4, 2, true, 0));
      }
    }

    // Age 5 - not sick
    for (let i = 0; i < 40; i++) {
      if (i < 20) {
        animalArray.push(new Animal(5, 0, false, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(5, 0, false, this.getRandomBreedPhase()));
      }
    }

    //sick
    for (let i = 0; i < 10; i++) {
      if (i < 7) {
        animalArray.push(new Animal(5, 1, true, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(5, 2, true, this.getRandomBreedPhase()));
      }
    }

    // Age 6 - not sick
    for (let i = 0; i < 15; i++) {
      if (i < 5) {
        animalArray.push(new Animal(6, 0, false, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(6, 0, false, this.getRandomBreedPhase()));
      }
    }

    //sick
    for (let i = 0; i < 10; i++) {
      if (i < 6) {
        animalArray.push(new Animal(6, 1, true, this.getRandomBreedPhase()));
      } else {
        animalArray.push(new Animal(6, 2, true, this.getRandomBreedPhase()));
      }
    }

    // Age 7 - not sick
    for (let i = 0; i < 10; i++) {
      animalArray.push(new Animal(7, 0, false, 0));
    }

    //sick
    for (let i = 0; i < 3; i++) {
      animalArray.push(new Animal(7, 2, true, 0));
    }

    return animalArray;
  };

  countSickByAge = (age: number) => {
    let count = 0;
    const animalsByAge = this.animals.filter(
      (animal) => animal.age === age && animal.phase > 0
    );
    for (let i = 0; i < animalsByAge.length; i++) {
      count++;
    }
    return count;
  };

  countByAge = (age: number) => {
    let count = 0;
    const animalsByAge = this.animals.filter((animal) => animal.age === age);
    for (let i = 0; i < animalsByAge.length; i++) {
      count++;
    }
    return count;
  };

  calculateChance = (age: number) => {
    return this.countSickByAge(age) / this.countByAge(age);
  };

  calculateChances = () => {
    return [
      this.calculateChance(2),
      this.calculateChance(3),
      this.calculateChance(4),
      this.calculateChance(5),
      this.calculateChance(6),
    ];
  };

  breedAnimals = (chances: number[]): Animal[] => {
    const arr = new Array<Animal>();
    const animalsInBreedPhaseTwo = this.animals.filter(
      (animal) => animal.breedPhase === 2
    );
    for (let i = 0; i < animalsInBreedPhaseTwo.length; i++) {
      let animal = animalsInBreedPhaseTwo[i];

      if (animal.age === 2) {
        Math.random() <= chances[0]
          ? arr.push(new Animal(1, 1, true, 0))
          : arr.push(new Animal(1, 0, false, 0));
      }
      if (animal.age === 3) {
        Math.random() <= chances[1]
          ? arr.push(new Animal(1, 1, true, 0))
          : arr.push(new Animal(1, 0, false, 0));
      }
      if (animal.age === 4) {
        Math.random() <= chances[2]
          ? arr.push(new Animal(1, 1, true, 0))
          : arr.push(new Animal(1, 0, false, 0));
      }
      if (animal.age === 5) {
        Math.random() <= chances[3]
          ? arr.push(new Animal(1, 1, true, 0))
          : arr.push(new Animal(1, 0, false, 0));
      }
      if (animal.age === 6) {
        Math.random() <= chances[4]
          ? arr.push(new Animal(1, 1, true, 0))
          : arr.push(new Animal(1, 0, false, 0));
      }
    }
    return arr;
  };

  killSick = () => {
    const animalsLeft: any = this.animals;
    let count = 0;
    for (let i = 0; i < this.animals.length; i++) {
      let animal = this.animals[i];
      let random = Math.random();
      if (
        animal.age <= 3 &&
        animal.phase > 1 &&
        random <= Math.random() * (0.25 - 0.15) + 0.15
      ) {
        animalsLeft[i] = null;
        count++;
      }

      if (
        animal.age >= 4 &&
        animal.age <= 5 &&
        animal.phase > 1 &&
        random <= Math.random() * (0.37 - 0.23) + 0.23
      ) {
        animalsLeft[i] = null;
        count++;
      }

      if (
        animal.age === 6 &&
        animal.phase > 1 &&
        random <= Math.random() * (0.65 - 0.35) + 0.35
      ) {
        animalsLeft[i] = null;
        count++;
      }
    }

    this.animals = animalsLeft.filter((animal) => animal != null);
    return count;
  };

  killOld = () => {
    const animalsLeft: any = this.animals;
    let count = 0;
    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];
      const death = Math.random();
      if (animal.age === 7) {
        animalsLeft[i] = null;
        count++;
      }
      if (animal.age >= 5 && death < 0.25) {
        animalsLeft[i] = null;
        count++;
      }
    }
    this.animals = animalsLeft.filter((animal) => animal != null);
    return count;
  };

  advanceBreeding = () => {
    let twoYearAnimalsOffspring = Math.floor(
      (this.animals.filter((animal) => animal.age === 2).length *
        (Math.round(Math.random()) * (17 - 13) + 13)) /
        100
    );
    let threeYearAnimalsOffspring = Math.floor(
      (this.animals.filter((animal) => animal.age === 3).length *
        (Math.round(Math.random()) * (17 - 13) + 13)) /
        100
    );
    let fourYearAnimalsOffspring = Math.floor(
      (this.animals.filter((animal) => animal.age === 4).length *
        (Math.round(Math.random()) * (17 - 13) + 13)) /
        100
    );

    let fiveYearAnimalsOffSpring = Math.floor(
      (this.animals.filter((animal) => animal.age === 5).length *
        (Math.round(Math.random()) * (11 - 9) + 9)) /
        100
    );
    let sixYearAnimalsOffspring = Math.floor(
      (this.animals.filter((animal) => animal.age === 6).length *
        (Math.round(Math.random()) * (11 - 9) + 9)) /
        100
    );
    console.log(twoYearAnimalsOffspring);
    this.animals.forEach((animal) => {
      if (animal.breedPhase !== 0) {
        if (animal.breedPhase === 1) {
          animal.breedPhase = 2;
        } else if (animal.breedPhase === 2) {
          animal.breedPhase = 0;
        }
      } else {
        if (animal.age === 2 && twoYearAnimalsOffspring !== 0) {
          animal.breedPhase = 1;
          twoYearAnimalsOffspring--;
        }
        if (animal.age === 3 && threeYearAnimalsOffspring !== 0) {
          animal.breedPhase = 1;
          threeYearAnimalsOffspring--;
        }
        if (animal.age === 4 && fourYearAnimalsOffspring !== 0) {
          animal.breedPhase = 1;
          fourYearAnimalsOffspring--;
        }
        if (animal.age === 5 && fiveYearAnimalsOffSpring !== 0) {
          animal.breedPhase = 1;
          fiveYearAnimalsOffSpring--;
        }
        if (animal.age === 6 && sixYearAnimalsOffspring !== 0) {
          animal.breedPhase = 1;
          sixYearAnimalsOffspring--;
        }
      }
    });
  };

  updateAnimals = () => {
    this.animals.forEach((animal) => {
      animal.age += 1;
      if (animal.phase === 1) {
        animal.phase = 2;
      } else if (animal.phase === 2) {
        animal.phase = 0;
        animal.isResistant = true;
      }
    });
  };

  timeTick = (numberOfTicks: number) => {
    let startingAnimalNumber = 0;
    let endingAnimalNumber = 0;
    let healthyAnimals = 0;
    let sickAnimals = 0;
    let resistantAnimals = 0;
    let sickAnimalsPhaseOne = 0;
    let sickAnimalsPhaseTwo = 0;

    let chances = new Array<number>();

    for (let i = 0; i < numberOfTicks; i++) {
      startingAnimalNumber = this.animals.length;
      // obliczamy stosunek chorych do zdrowych
      chances = this.calculateChances();
      // obliczamy ile sie urodzi
      let breedingArr = this.breedAnimals(chances);
      // aktualziacja danych odnośnie ciazy
      this.advanceBreeding();
      // symulacja zgonów wśród chorych
      let sickDeaths = this.killSick();
      // zgony ze starosci
      let ageDeaths = this.killOld();
      // aktualizacja zwierzat
      this.updateAnimals();
      //dodanie urodzonych zwierzat
      this.animals = this.animals.concat(breedingArr);

      endingAnimalNumber = this.animals.length;
      healthyAnimals = this.animals.filter((animal) => animal.phase == 0)
        .length;
      sickAnimals = this.animals.filter((animal) => animal.phase != 0).length;
      resistantAnimals = this.animals.filter(
        (animal) => animal.isResistant === true
      ).length;
      sickAnimalsPhaseOne = this.animals.filter((animal) => animal.phase === 1)
        .length;
      sickAnimalsPhaseTwo = this.animals.filter((animal) => animal.phase === 2)
        .length;

      this.results.push({
        startingNumber: startingAnimalNumber,
        endingNumber: endingAnimalNumber,
        bornNumber: breedingArr.length,
        sickDeathsNumber: sickDeaths,
        ageDeathsNumber: ageDeaths,
        healthyNumber: healthyAnimals,
        sickNumber: sickAnimals,
        resistantNumber: resistantAnimals,
        sickPhaseOneNumber: sickAnimalsPhaseOne,
        sickPhaseTwoNumber: sickAnimalsPhaseTwo,
      });

      console.log(this.results);
    }
  };
}
