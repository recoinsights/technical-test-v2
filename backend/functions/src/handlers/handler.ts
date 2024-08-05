import { ApiHandler } from 'sst/node/api';
import {
  APIGatewayProxyEventV2,
  Context,
  APIGatewayProxyStructuredResultV2
} from 'aws-lambda';
import { getMongoService } from 'src/services/mongoService';

type HandlerFunction = (
  event: APIGatewayProxyEventV2,
  context: Context
) => Promise<void | APIGatewayProxyStructuredResultV2>;

const mongoService = getMongoService();

export const requestHandler = (handler: HandlerFunction) => {
  return ApiHandler(async (event, context) => {
    try {
      await mongoService.connect();
      // Pass both event and context to the handler
      return await handler(event, context);
    } catch (e) {
      if (e instanceof Error) {
        return responseJson(e.message, 500);
      } else {
        return responseJson('An unknown error occurred', 500);
      }
    }
  });
};

export const responseJson = <T>(data: T, statusCode = 200) => {
  return {
    statusCode,
    body: typeof data === 'string' ? data : JSON.stringify(data)
  };
};
