import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import getObjects from 'services/getObjects';
import TablesList from 'pages/tables/index';

const MOCK_TABLES = [
    {
        "id": 0,
        "number": 1,
        "reservation_id": 1
    },
    {
        "id": 1,
        "number": 2,
        "reservation_id": 1
    },
    {
        "id": 2,
        "number": 3,
        "reservation_id": 1
    },
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_TABLES),
  })
);

let tables = {};
test('Mesas obtenidas', async () => {
    tables = await getObjects();
    expect(tables).toEqual(MOCK_TABLES)
})
test('Vista de la lista de mesas', () => {
    const component = render(
        <AuthProvider>
            <TablesList tables={tables}/>
        </AuthProvider>
    );
    const container = component.container;
    tables.map( ({number}) => {
        expect(container).toHaveTextContent(number);
    })
});