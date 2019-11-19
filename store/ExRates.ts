import {observable, action, computed} from 'mobx';

/**
 *
 */
export interface ExRate {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
}

/**
 *
 */
class ExRatesStore {
  /**
   *
   */
  @observable rates: ExRate[] = [];

  /**
   * Add characters to store
   */
  @action
  initRates(rates: ExRate[]) {
    this.rates = rates;
  }
}

export const exRatesStore = new ExRatesStore();
