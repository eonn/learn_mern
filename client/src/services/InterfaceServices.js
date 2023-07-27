import http from "./http-common";

const getAll = () => {
  return http.get("/interfaces");
};

const get = (id) => {
  return http.get(`/interfaces/${id}`);
};

const create = (data) => {
  return http.post("/interfaces", data);
};

const update = (id, data) => {
  return http.put(`/interfaces/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/interfaces/${id}`);
};

const removeAll = () => {
  return http.delete(`/interfaces`);
};

const findByTitle = (title) => {
  return http.get(`/interfaces?title=${title}`);
};

const InterfaceService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default InterfaceService;