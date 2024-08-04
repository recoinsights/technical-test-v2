import { StackContext, Api, NextjsSite } from "sst/constructs";

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

  const site = new NextjsSite(stack, "TechnicalTestNextJsSite", {
    path: "frontend",
    bind: [ api ],
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
  });
}
