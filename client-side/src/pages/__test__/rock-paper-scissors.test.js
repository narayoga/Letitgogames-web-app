import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import Pingsut from '../rock-paper-scissors';

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from '../../redux/combine'
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

test('form submit button is enable', async () => {
    render(
        <Provider store={store}>
            <Router>
                <Pingsut />
            </Router>
        </Provider>
      )
    // screen.debug(); //tree debug
    screen.getByRole('') //role debug
    expect(screen.getByTestId('game')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeDisabled();
});