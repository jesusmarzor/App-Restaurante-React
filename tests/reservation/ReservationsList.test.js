import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import getObjects from 'services/getObjects';
import ReservationsList from 'pages/reservation/index';

const MOCK_RESERVATIONS = [
    {
        "id": 12,
        "key": null,
        "date": "2022-11-10 14:00:00",
        "name": "Belen",
        "number": "123456789",
        "diners": "3",
        "tables": [],
    },
    {
        "id": 13,
        "key": null,
        "date": "2022-05-16 14:00:00",
        "name": "Jesús",
        "number": "123456789",
        "diners": "2",
        "tables": [],
    },
    {
        "id": 14,
        "key": "H1LGK",
        "date": "2022-06-06 19:00:00",
        "name": "Prueba",
        "number": "123456789",
        "diners": "1",
        "tables": [
            {
                "id": 1,
                "number": 1,
                "reservation_id": 14,
                "created_at": "2022-05-11T10:59:39.000000Z",
                "updated_at": "2022-06-06T14:31:45.000000Z"
            }
        ]
    }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_RESERVATIONS),
  })
);

let reservations = {};
test('Reservas obtenidas', async () => {
    reservations = await getObjects();
    expect(reservations).toEqual(MOCK_RESERVATIONS)
})
test('Vista de la lista de reservas', () => {
    const component = render(
        <AuthProvider>
            <ReservationsList reservations={reservations}/>
        </AuthProvider>
    );
    const container = component.container;
    reservations.map( ({name, diners, key}) => {
        expect(container).toHaveTextContent(name);
        expect(container).toHaveTextContent(diners);
        expect(container).toHaveTextContent((key === null) ? 'Inactiva' : key);
    })
});