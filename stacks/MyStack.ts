import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {},
    },
    routes: {
      "GET /": "backend/functions/src/lambda.handler",
      "GET /todo": "backend/functions/src/todo.list",
      "POST /todo": "backend/functions/src/todo.create",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
