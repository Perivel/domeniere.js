import { DoubleNumberQuery } from './../artifacts/services/double-number.query';

test('Test the double number query.', async () => {
    expect.assertions(1);
    const query = new DoubleNumberQuery();
    const double = await query.execute(2);
    expect(double).toEqual(4);
});