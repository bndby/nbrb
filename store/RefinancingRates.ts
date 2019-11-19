import {observable, action, computed} from 'mobx';

/**
 *
 */
export interface RefinancingRate {
  Date: string;
  Value: number;
}

/**
 *
 */
class RefinancingRatesStore {
  /**
   *
   */
  @observable rates: RefinancingRate[] = [];

  /**
   * Add characters to store
   */
  @action
  initRates(rates: RefinancingRate[]) {
    this.rates = rates;
  }
}

export const refinancingRatesStore = new RefinancingRatesStore();
