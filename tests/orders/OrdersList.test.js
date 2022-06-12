import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import getObjects from 'services/getObjects';
import OrdersList from 'pages/orders/index';

const MOCK_ORDERS = [
    {
        "id": 0,
        "menu_id": 1,
        "reservation_id": 3,
        "note": null,
        "number": 2,
        "tracking": "Pendiente",
        "paid": 1,
        "menu": {
            "id": 1,
            "name": "Ensalada",
            "description": "Ensalada con tomate, huevo, cebolla y macarrones",
            "image": "menu/1648716154-ensalada.jpg",
            "price": 12,
            "allergens": "[\"gluten\", \"pescado\"]",
            "type": "entrante",
        },
        "reservation": {
            "id": 3,
            "key": "H1LGK",
            "date": "2022-06-06 19:00:00",
            "name": "Jesús",
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
    }
]

beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'reservationKey=H1LGK',
    });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_ORDERS),
  })
);

let orders = {};
test('Pedidos obtenidos', async () => {
    orders = await getObjects();
    expect(orders).toEqual(MOCK_ORDERS)
})
test('Vista de la lista de pedidos', () => {
    const component = render(
        <AuthProvider>
            <OrdersList orders={orders}/>
        </AuthProvider>
    );
    const container = component.container;
    orders.map( ({paid, tracking, note, menu, reservation}) => {
        expect(container).toHaveTextContent(menu.name);
        reservation.tables.map( ({number}) => {
            expect(container).toHaveTextContent(number);
        })
        expect(container).toHaveTextContent((note === null) ? 'No' : note);
        expect(container).toHaveTextContent((paid && tracking === 'Completado') ? "Pagado" : tracking);
    })
});