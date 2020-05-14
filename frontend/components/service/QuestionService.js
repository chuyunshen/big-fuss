import axios from 'axios'

const ROOT_API_URL = 'http://localhost:8080';

class GameService {

    retrieveQuestions(gameId) {
        const GAME_API_URL = `${ROOT_API_URL}/games/${gameId}`;
        return axios.get(`${GAME_API_URL}/questions`);
    }
}

export default new CourseDataService()