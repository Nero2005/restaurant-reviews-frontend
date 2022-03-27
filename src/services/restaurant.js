import http from "../http-common.js";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
    // console.log(url);
    // return http.get(url);
  }

  createReview(data) {
    return http.post(`/reviews`, data);
  }

  updateReview(data) {
    return http.put(`/reviews`, data);
  }

  deleteReview(id, userId) {
    return http.delete(`/reviews?id=${id}&user_id=${userId}`);
  }

  getCuisines() {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();