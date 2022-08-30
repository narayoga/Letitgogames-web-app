import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from '../profile'

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from '../../redux/combine'
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

test('profile user page', () => {
    render(
        <Provider store={store}>
            <Router>
                <Profile/>
            </Router>
        </Provider>
    );
    const profile = screen.getByTestId('profile')
    const profileEmail = screen.getByPlaceholderText('email')
    const profileUsername = screen.getByPlaceholderText('username')
    const profileLink = screen.getByTestId('profile-link')
    expect(profile).toBeInTheDocument()
    expect(profileEmail).toBeInTheDocument()
    expect(profileUsername).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()

})