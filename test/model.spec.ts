import { Alias, Model } from '../src';

// user data in backend format
const userStub = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@johnmail.com'
}

class User extends Model {
  @Alias('first_name') firstName: string;
  @Alias('last_name') lastName: string;
  @Alias() email: string;
}

describe('fromJSON', () => {
  let user = new User();

  beforeEach(() => {
    user._fromJSON(userStub);
  });

  it('should convert the field name', () => {
    expect(user.firstName).toEqual(userStub['first_name']);
  });

  it('should assing the value with the same name', () => {
    expect(user.email).toEqual(userStub['email']);
  })
});
