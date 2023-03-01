import { Optional } from "@angular/core";

export class Festival {
  static sqmTable = 6;
  public id?: string;
  public name!: string;

  public tablemax_1: number = 100;
  public tableprice_1: number = 120;
  public sqmprice_1: number = 120;
  public tablebooked_1: number = 0;
  public sqmbooked_1: number = 0;

  public tablemax_2: number = 100;
  public tableprice_2: number = 120;
  public sqmprice_2: number = 120;
  public tablebooked_2: number = 0;
  public sqmbooked_2: number = 0;

  public tablemax_3: number = 100;
  public tableprice_3: number = 120;
  public sqmprice_3: number = 120;
  public tablebooked_3: number = 0;
  public sqmbooked_3: number = 0;

  public revenue: number = 0;
  public visitor: boolean = false;
  public get tableTotal() : number {
    return this.tablemax_1 + this.tablemax_2 + this.tablemax_3;
  }


  constructor(
    name: string,
    @Optional() id?: string,
    @Optional() tablemax_1: number = 100,
    @Optional() tableprice_1: number = 120,
    @Optional() tablebooked_1: number = 0,
    @Optional() sqmprice_1: number = 120,
    @Optional() sqmbooked_1: number = 0,
    

    @Optional() tablemax_2: number = 100,
    @Optional() tableprice_2: number = 120,
    @Optional() tablebooked_2: number = 0,
    @Optional() sqmprice_2: number = 120,
    @Optional() sqmbooked_2: number = 0,

    @Optional() tablemax_3: number = 100,
    @Optional() tableprice_3: number = 120,
    @Optional() tablebooked_3: number = 0,
    @Optional() sqmprice_3: number = 120,
    @Optional() sqmbooked_3: number = 0,
  ){
    this.id = id;
    this.name = name
    this.tablemax_1 = tablemax_1
    this.tableprice_1 = tableprice_1
    this.tablebooked_1 = tablebooked_1
    this.sqmprice_1 = sqmprice_1
    this.sqmbooked_1 = sqmbooked_1
    this.tablemax_2 = tablemax_2
    this.tableprice_2 = tableprice_2
    this.tablebooked_2 = tablebooked_2
    this.sqmprice_2 = sqmprice_2
    this.sqmbooked_2 = sqmbooked_2
    this.tablemax_3 = tablemax_3
    this.tableprice_3 = tableprice_3
    this.tablebooked_3 = tablebooked_3
    this.sqmprice_3 = sqmprice_3
    this.sqmbooked_3 = sqmbooked_3
  }
}