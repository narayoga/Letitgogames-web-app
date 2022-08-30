import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GameDetail from '../gamepage'

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from '../../redux/combine'
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

import axios from "axios";
jest.mock("axios")
const BASE_URL = 'https://challenge-chapter-9.herokuapp.com/games/1';
const fetchUsers = async () => {
  try {
    return await axios.get(`${BASE_URL}`);
  } catch (e) {
    return [];
  }
};

describe("fetchUsers", () => {
    describe("when API call is successful", () => {
      it("should return player list", async () => {
        // given
        const player = [
            {
                "id": 12,
                "playerId": 26,
                "gameId": 1,
                "points": null,
                "Game": {
                    "id": 1,
                    "gamesname": "Pingsut",
                    "createdAt": "2022-05-23T06:59:42.947Z",
                    "updatedAt": "2022-05-23T06:59:42.947Z"
                },
                "Player": {
                    "id": 26,
                    "username": "centro2",
                    "password": "$2b$10$XlDgZVRaF4G9OZvibieglOsuijDq4Hz8ZLuJqrR9O59nz8DGLZUay",
                    "email": "febriansyahfar.ff@gmail.com",
                    "createdAt": "2022-06-15T13:21:05.438Z",
                    "updatedAt": "2022-07-05T10:11:07.947Z"
                }
            },
            {
                "id": 6,
                "playerId": 13,
                "gameId": 1,
                "points": 8,
                "Game": {
                    "id": 1,
                    "gamesname": "Pingsut",
                    "createdAt": "2022-05-23T06:59:42.947Z",
                    "updatedAt": "2022-05-23T06:59:42.947Z"
                },
                "Player": {
                    "id": 13,
                    "username": "asuganteng",
                    "password": "$2b$10$kbJ9vWTu64so09lzBfYDkuTjbUtl1qCE0LXoAA3kkfTQ5b8.0o5Ma",
                    "email": "asuganteng@gmail.com",
                    "createdAt": "2022-05-25T17:26:35.826Z",
                    "updatedAt": "2022-05-25T17:26:35.826Z"
                }
            },
            {
                "id": 6,
                "playerId": 13,
                "gameId": 1,
                "points": 8,
                "Game": {
                    "id": 1,
                    "gamesname": "Pingsut",
                    "createdAt": "2022-05-23T06:59:42.947Z",
                    "updatedAt": "2022-05-23T06:59:42.947Z"
                },
                "Player": {
                    "id": 13,
                    "username": "asuganteng",
                    "password": "$2b$10$kbJ9vWTu64so09lzBfYDkuTjbUtl1qCE0LXoAA3kkfTQ5b8.0o5Ma",
                    "email": "asuganteng@gmail.com",
                    "createdAt": "2022-05-25T17:26:35.826Z",
                    "updatedAt": "2022-05-25T17:26:35.826Z"
                }
            },
            {
                "id": 9,
                "playerId": 21,
                "gameId": 1,
                "points": 13,
                "Game": {
                    "id": 1,
                    "gamesname": "Pingsut",
                    "createdAt": "2022-05-23T06:59:42.947Z",
                    "updatedAt": "2022-05-23T06:59:42.947Z"
                },
                "Player": {
                    "id": 21,
                    "username": "asasaasa",
                    "password": "$2b$10$wE78aVMpAql3KwkDxq5my..PnVQXckFAbI4MgKOqOcE8ZnN.FttUe",
                    "email": "asa@mail.com",
                    "createdAt": "2022-06-07T04:23:02.398Z",
                    "updatedAt": "2022-07-05T12:21:41.271Z"
                }
            },
            {
                "id": 1,
                "playerId": 1,
                "gameId": 1,
                "points": 7,
                "Game": {
                    "id": 1,
                    "gamesname": "Pingsut",
                    "createdAt": "2022-05-23T06:59:42.947Z",
                    "updatedAt": "2022-05-23T06:59:42.947Z"
                },
                "Player": {
                    "id": 1,
                    "username": "llollwawa",
                    "password": "$2b$10$q2xjQBLQn.lwwTDY7OVfEOHzuhCu8KcII/oz2pfGYsKAdTdRbcDuK",
                    "email": "llollwawa@gmail.com",
                    "createdAt": "2022-05-23T06:59:43.056Z",
                    "updatedAt": "2022-06-28T07:33:01.254Z"
                }
            }
        ];
        axios.get.mockResolvedValueOnce(player);
        // when
        const result = await fetchUsers();
        // then
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}`);
        expect(result).toEqual(player);
      });
    });
  
    describe("when API call fails", () => {
      it("should return empty player list", async () => {
        // given
        const message = "Succes";
        axios.get.mockRejectedValueOnce(new Error(message));
        // when
        const result = await fetchUsers();
        // then
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}`);
        expect(result).toEqual([]);
      });
    });
  });

test('profile user page', () => {
    render(
        <Provider store={store}>
            <Router>
                <GameDetail/>
            </Router>
        </Provider>
    );
    const gamepage = screen.getByTestId('gamepage')
    expect(gamepage).toBeInTheDocument()
})