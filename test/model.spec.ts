import { Alias, Model } from '../src';

class Town extends Model {
  @Alias('coord_x') coordX: number;
  @Alias('coord_y') coordY: number;
  @Alias() name: string;
}

class Address extends Model {
  @Alias() country: string;
  @Alias() city: string;
}

class User extends Model {
  @Alias('first_name') firstName: string;
  @Alias('last_name') lastName: string;
  @Alias() email: string;
  @Alias('address', Address) currentAddress: Address;
  @Alias('towns', Town) towns: Town[];
}

const townsStub = [
  { name: 'Moscow', coord_x: 1, coord_y: 2 },
  { name: 'Novosibirsk', coord_x: 3, coord_y: 4 }
];

const addressStub = {
  country: 'Russia',
  city: 'Rostov-on-Don'
};

const userStub = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@johnmail.com',
  address: addressStub,
  towns: townsStub
}

describe('Model', () => {
  describe('fromJSON', () => {
    const user = new User();

    beforeEach(() => {
      user._fromJSON(userStub);
    });

    it('should convert the field name', () => {
      expect(user.firstName).toEqual(userStub['first_name']);
    });

    it('should assing the value with the same name', () => {
      expect(user.email).toEqual(userStub['email']);
    })

    it('should deserialize single nested model', () => {
      expect(user.currentAddress.constructor).toEqual(Address);
      expect(user.currentAddress.city).toEqual(addressStub['city']);
    });

    it('should deserialize array of nested models', () => {
      user.towns.forEach(town => {
        expect(town.constructor).toEqual(Town);
      });
    });
  });

  describe('toJSON', () => {
    const user = new User();

    beforeEach(() => {
      user._fromJSON(userStub);
    });

    it('should serialize model by aliases map', () => {
      const userData = user._toJSON();
      expect(userData).toEqual(userStub);
    });

    it('should serialize ONLY passed array of aliases', () => {
      const uData = user._toJSON(['first_name', 'email']);

      expect(uData['first_name']).toEqual(userStub['first_name']);
      expect(uData['last_name']).toBeUndefined();
      expect(uData['email']).toEqual(userStub['email']);
    });

    it('should serialize nested single model', () => {
      expect(user._toJSON()['address']).toEqual(addressStub);
    });

    it('should serialize array of nested models', () => {
      const uData = user._toJSON();
      expect(uData['towns']).toEqual(townsStub);
    });
  });

  describe('updateFromJSON', () => {
    const user = new User();

    beforeEach(() => {
      user._fromJSON(userStub);
    });

    it('should extract the backend data to object', () => {
      const newUserData = {email: 'new@e.mail', last_name: 'newLastname'};

      expect(user._toJSON()).toEqual(userStub);

      user._updateFromJSON(newUserData);
      expect(user._toJSON()).toEqual(Object.assign({}, userStub, newUserData));
    });
  });
});
