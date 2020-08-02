import instance from "@src/api/http";

export const getTestApi = (params = {}) =>
  instance({
    url: "/test/history",
    method: "get",
    params,
  });
