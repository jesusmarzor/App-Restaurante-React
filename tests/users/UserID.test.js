import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import showObject from 'services/showObject';
import CreateUser from 'pages/users/[id]';

const MOCK_USER = {
        "id": 1,
        "name": "Jesús",
        "email": "jesus@hola.com",
        "image": "users/1648716119-perfil.jpg",
        "role": "admin"
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_USER),
  })
);

let user = {};
test('Usuario obtenido', async () => {
    user = await showObject();
    expect(user).toEqual(MOCK_USER);
})
test('Vista de la creación de usuario', () => {
    const component = render(
        <AuthProvider>
            <CreateUser user={user} response={true}/>
        </AuthProvider>
    );
});