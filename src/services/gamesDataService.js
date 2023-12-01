import axios from "axios";

class GameDataService {
  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games?page=${page}`
    );
  }

  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games/id/${id}`
    );
  }
  find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games?${by}=${query}&page=${page}`
    );
  }

  createComment(data) {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games/comment`,
      data
    );
  }

  updateComment(data) {
    console.log(data);
    return axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games/comment`,
      data
    );
  }
  deleteComment(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games/comment`,
      { data: { comment_id: id, user_id: userId } }
    );
  }

  getGenres() {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/mm355/games/genres`
    );
  }
}
export default new GameDataService();
