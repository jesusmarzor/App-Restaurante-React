import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import getObjects from 'services/getObjects';
import Menu from 'pages/menu/index';

const MOCK_MENU = [
    {
        "id": 3,
        "name": "Ñoquis con queso",
        "description": "Ñoquis con quesito fundido",
        "image": "menu/1650302719-ñoquis-queso.jpg",
        "price": 25,
        "allergens": "[\"gluten\", \"huevos\", \"frutos secos\", \"lacteos\"]",
        "type": "plato principal",
        "score": 3,
        "opinions": [
            {
                "id": 5,
                "name": "Jesús",
                "opinion": "Maravilloso",
                "points": 2,
                "menu_id": 3,
            }
        ]
    }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_MENU),
  })
);

let menu = {};
test('Menu obtenido', async () => {
    menu = await getObjects();
    expect(menu).toEqual(MOCK_MENU)
})
test('Vista del menu', () => {
    const component = render(
        <AuthProvider>
            <Menu menu={menu}/>
        </AuthProvider>
    );
    const container = component.container;
    menu.map( ({name, description, price, allergens,score}) => {
        expect(container).toHaveTextContent(name);
        expect(container).toHaveTextContent(description);
        expect(container).toHaveTextContent(price);
        JSON.parse(allergens).map( name => expect(container).toHaveTextContent(name));
        expect(container).toHaveTextContent(score);
    })
});