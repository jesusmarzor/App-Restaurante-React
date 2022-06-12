import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import getObjects from 'services/getObjects';
import UsersList from 'pages/users/index';

const MOCK_USERS = [
    {
        "id": 0,
        "name": "Jesús",
        "email": "jesus@hola.com",
        "image": "users/1648716119-perfil.jpg",
        "role": "admin"
    },
    {
        "id": 1,
        "name": "Antonio",
        "email": "antonio@hola.com",
        "image": "users/1648717567-hombre.jpg",
        "role": "camarero"
    },
    {
        "id": 2,
        "name": "Belén",
        "email": "belen@hola.com",
        "image": "users/1648722385-mujer.jpg",
        "role": "cocinero"
    }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_USERS),
  })
);

let users = {};
test('Usuarios obtenidos', async () => {
    users = await getObjects();
    expect(users).toEqual(MOCK_USERS)
})
test('Vista de la lista de usuarios', () => {
    const component = render(
        <AuthProvider>
            <UsersList users={users}/>
        </AuthProvider>
    );
    const container = component.container;
    users.map( ({name, role}) => {
        expect(container).toHaveTextContent(name);
        expect(container).toHaveTextContent(role);
    })
});