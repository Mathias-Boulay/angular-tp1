import { Optional } from '@angular/core';

export class Game {
  constructor(
    public id: string,
    public editorId: string,
    public name: string,
    @Optional() public type: 'child' | 'family' | 'expert' | 'rpg' = 'child',
    @Optional() public ageMin: number = 5,
    @Optional() public ageMax: number = 15,
    @Optional() public nbMin: number = 0,
    @Optional() public nbMax: number = 10
  ) {}
}
