import { render, screen, cleanup } from "@testing-library/react";
import Error from '../error'

test('render upload image component', () => {
    render(<Error/>);
    expect(screen.getByText('404 NOT FOUND')).toBeInTheDocument()

})