import { render, screen, cleanup, fireEvent  } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from '../signin'

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from '../../redux/combine'
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

afterEach(() => {
    cleanup();
})

test('render username input', () => {
    render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput).toBeInTheDocument()    
    expect(userInput.value).toBe("")    
    
})

test('render email input', () => {
    render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()   
    expect(emailInput.value).toBe("")    
})

test('render password input', () => {
    render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument() 
    expect(passwordInput.value).toBe("")  
})

test("submit button render", ()=> {
    const onSubmit = jest.fn()
    const { getByTestId } = render(
                                <Provider store={store}>
                                    <Router>
                                        <Login/>
                                    </Router>
                                </Provider>
                            );
    fireEvent.submit(getByTestId('form'))
    expect(onSubmit).toHaveBeenCalledTimes(0)
})

