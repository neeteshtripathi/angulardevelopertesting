describe('Stuff that JavaScript  Thinks is Ok but can lead to bad code', () => {
  it('Equality', () => {
    let x: any;
    let y: any;

    // eslint-disable-next-line prefer-const
    x = '12.01';

    // eslint-disable-next-line prefer-const
    y = 12;

    expect(x === y).toBe(false);
    expect(x !== y).toBe(true);
    expect(parseInt(x, 10) === y).toBe(true);
    expect(+x === y).toBe(false);
  });
});

describe('Writing basic specs', () => {
  it('Super Simple Example', () => {
    // Given - Arrange
    const a = 10;
    const b = 20;
    // When - Act
    const answer = a + b; // System Under Test (SUT)
    // Then - Assert
    expect(answer).toEqual(30);
  });
});

describe('Some Quick TypeScript Stuff', () => {
  it('Annotating Types', () => {
    let x: number | string;

    x = 12;
    expect(typeof x).toBe('number');

    x = 'Dog';
    expect(typeof x).toBe('string');

    // x = ['Bird', 32];

    // expect(typeof x).toBe('object');
  });

  it('Duck Typing', () => {
    // "Structural Typing"

    function sendReminder(who: IEmailableThing): void {
      console.log('Sending a reminder to ' + who.name);
      console.log('Sending reminder to address ' + who.email);
      who.sendEmail('Your Reminder is here!');
    }

    const joe = new EmailablePerson();
    joe.email = 'joe@aol.com';
    joe.name = 'Joe Schmidt';

    const sue = {
      name: 'Sue Jones',
      email: 'sue@compuserve.com',
      sendEmail: (x: string) => console.log('The message is ' + x),
      phoneNumber: '555-1212',
      boss: 'Jill',
    };

    sendReminder(joe);
    sendReminder(sue);
  });
});

class EmailablePerson implements IEmailableThing {
  name = '';
  email = '';

  sendEmail(message: string) {
    console.log('Sending an email!' + message);
  }
}

interface IEmailableThing {
  name: string;
  email: string;
  sendEmail: (x: string) => void;
}
