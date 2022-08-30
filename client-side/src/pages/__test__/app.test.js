import { render, screen, cleanup } from "@testing-library/react";
import App from '../../App'

test('render upload image component', () => {
    render(<App/>);
    expect(screen.getByTestId('app')).toBeInTheDocument()

})