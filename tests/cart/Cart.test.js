import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cart from 'pages/cart/index';

test('Vista del Carrito de compra', () => {
    const component = render(<Cart/>);
});