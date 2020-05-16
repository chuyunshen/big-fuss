import axios from 'axios';

const ROOT_API_URL = 'http://localhost:8080';

export const retrieveQuestions = (gameId) => {
        return axios.get(`${ROOT_API_URL}/games/${gameId}/questions`);
};

export const retrievePlayers = (gameId) => {
        return axios.get(`${ROOT_API_URL}/games/${gameId}/players`);
};
