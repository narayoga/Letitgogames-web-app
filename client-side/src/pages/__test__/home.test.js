import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from '../home'

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from '../../redux/combine'
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

test('profile user page', () => {
    render(
        <Provider store={store}>
            <Router>
                <Home/>
            </Router>
        </Provider>
    );
    const banner = screen.getByTestId('banner')
    const content = screen.getByTestId('content')
    const footer = screen.getByTestId('footer')
    expect(banner).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

})