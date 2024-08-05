import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "reco-technical-test",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(AppStack);
  }
} satisfies SSTConfig;
