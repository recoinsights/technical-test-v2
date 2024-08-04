import { ApiHandler } from "sst/node/api";

export const create = ApiHandler(async (_evt) => {
  console.log("Creating todo");

  return {
    statusCode: 200,
    body: "Todo created",
  };
});

export const list = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: 1,
        text: "Buy milk",
      },
      {
        id: 2,
        text: "Buy eggs",
      }
    ]),
  };
});
