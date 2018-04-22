# tsmodels
Implementation of the model system for the TypeScript language

## Features
- Convert format fields from server to client and back
- Creates instances of models rather than typing (with conversion)
- Perceives both nested (connected) models and collections of any depth

## Installation
Install `tsmodels` from `npm` or `yarn`:
```bash
# from `npm`
npm i tsmodels --save

# from `yarn`
yarn add tsmodels --save
```

## Usage
It is necessary to inherit the model from the class `Model`:
```typescript
import { Alias, Model } from 'tsmodels';

export class User extends Model {
  // ...
}
```
For the model instance, methods will be available `_fromJSON(value)` and `_toJSON()` methods

### Model clear static methods

- `Model.new<modeType>(<model-type>, <data>)` - Creates an instance of pass model class with data
- `Model.newCollection<modeType>(<model-type>, <data[]>)` - Creates an instances collection of pass model class with data array

### @Alias(...)
Decorator of fields for model

- Optional param `field_name` - Name of server format field
- Optional param `type` - Optional. Type of related model

### _toJSON()

Convert model to object using Alias's metadata

Parameters:
  {string[]} only - Array of field's aliases to export

## Example

##### Town model
```typescript
// ...

export class Town extends Model {
  @Alias('main_title') public mainTitle: string;
}
```

##### User model
```typescript
// ...

export class User extends AppnModel {
  @Alias() public name: string;
  @Alias('last_name') public lastName: string;
  @Alias('towns', Town) public towns: Town[];
  @Alias('main_town', Town) public townMain: Town;
}
```

```typescript
// ...

const townMock = { main_title: 'Sulonia' };
const townMock2 = { main_title: 'Sulon' };

const userMock = {
  name: 'Kyle Katarn',
  last_name: 'Katarn',
  towns: [townMock, townMock2],
  main_town: [townMock2],
};

class ModelExample {
  public user: User = new User();
  
  constructor() {
    this.user._fromJSON(userMock);
    this.user._toJSON();
  }
}
```

##### _fromJSON()
User will be:
```json
{
  "name": "Kyle Katarn", 
  "lastName": "Katarn", 
  "towns": [
    {
      "mainTitle": "Sulonia"
    },
    {
      "mainTitle": "Sulon"
    }
  ],
  "townMain": {
    "mainTitle": "Suloniaaaa3"
  }
}
```

##### _toJSON()
User will be:
```json
{
  "name": "Kyle Katarn", 
  "last_name": "Katarn", 
  "towns": [
    {
      "main_title": "Sulonia"
    },
    {
      "main_title": "Sulon"
    }
  ],
  "main_town": {
    "main_title": "Suloniaaaa3"
  }
}
```
