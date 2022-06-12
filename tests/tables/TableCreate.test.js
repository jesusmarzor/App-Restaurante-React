import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from 'contexts/AuthContext';
import CreateTable from 'pages/tables/create/index';

test('Vista de creación de la mesa', () => {
    const component = render(
        <AuthProvider>
            <CreateTable/>
        </AuthProvider>
    );
});