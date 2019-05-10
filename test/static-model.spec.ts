import { Alias, Model } from '../src';

const currenciesStub = [
  { code: 'RUB', name: 'Russian Ruble'},
  { code: 'USD', name: 'US Dollar'},
];

const orderStub = {
  price: 100,
  currency: currenciesStub[0]
};

class Currency extends Model {
  @Alias() code: string;
  @Alias() name: string;
}

class Order extends Model {
  @Alias() price: number;
  @Alias('currency', Currency) currency: Currency[];
}

describe('StaticModel', () => {
  it('new() should create the instance', () => {
    const order = Order.new<Order>(Order, orderStub);

    expect(order.constructor).toEqual(Order);
    expect(order.currency.constructor).toEqual(Currency);
  });

  it('newCollection() should create the collection of instances', () => {
    const currencies = Currency.newCollection<Currency>(Currency, currenciesStub);

    currencies.forEach(cur => {
      expect(cur.constructor).toEqual(Currency)
    });
  });
});
