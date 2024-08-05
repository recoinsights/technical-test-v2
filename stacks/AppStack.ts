import { StackContext, Api, NextjsSite } from "sst/constructs";

export function AppStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {},
    },
    routes: {
      "GET /surveys": "backend/functions/src/handlers/survey.findMany",
      "POST /survey": "backend/functions/src/handlers/survey.createOne",
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
