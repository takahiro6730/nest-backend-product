import { HttpException } from "@nestjs/common";

export const errorHandler = (
  res = null,
  statusCode = 500,
  message = "Internal Server Error."
) => {
  throw new HttpException(message, statusCode);
};



export const sendResponse = (
  res = null,
  statusCode = 200,
  message = "Success",
  isSuccess = true,
  data = null
) => {
  return res.json({
    statusCode,
    isSuccess,
    message,
    data ,
  })
};

export const userSuccessResponse = {
  status: 201,
  description: "Success! Returns the user data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 201 },
          isSuccess: { type: "boolean", example: true },
          message: { type: "string", example: "Record Created" },
          data: { type: "object", example: "Record Created" },
        },
      },
      example: {
        statusCode: 201,
        isSuccess: true,
        message: "Record Created",
        data: {
          username: "test username",
          first_name: "pradip",
          last_name: "patil",
          email: "pradip@test.com",
          email_code: "DAQJ1",
          password: "4xeuIuIK3XGXHX3xtMBAM4uYeWlWsOg8RC",
          password_reset_code: "122222",
          createdAt: "2023-12-22T04:45:45.710Z",
          updatedAt: "2023-12-22T04:45:45.710Z",
          _id: "6585147f97b06",
        },
      },
    },
  },
};

export const userErrorResponse = {
  status: 400,
  description: "Error : Invalid input data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 400 },
          isSuccess: { type: "boolean", example: false },
          message: { type: "string", example: "Record Created" },
          data: { type: "object", example: null},
          timestamp: { type: "date", example: "2023-12-22T05:17:16.499Z" },
          error: { type: "array", example:  [
            "username should not be empty",
            "username must be a number string"
        ] }
        },
      },
      example: {
          "statusCode": 400,
          "message": "Bad Request Exception",
          "error": [
              "username should not be empty",
              "username must be a number string"
          ],
          "timestamp": "2023-12-22T05:17:16.499Z",
          "path": "/v1/users",
          "isSuccess": false,
          "data": null
      
      },
    },
  },
};


export const userListSuccessResponse = {
  status: 200,
  description: "Success! Returns the user data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 201 },
          isSuccess: { type: "boolean", example: true },
          message: { type: "string", example: "SUCCESS" },
          data: {
            type: "array",
            example: [
              {
                createdAt: "2023-12-22T05:44:35.286Z",
                updatedAt: "2023-12-22T05:44:35.286Z",
                _id: "657845cf5dc54b24021ecf04",
                username: "11",
                first_name: "test",
                last_name: "test",
                email: "te@test.com",
                email_code: "eee",
                password: "rBbjMr00UhkxZAX3C/fR/tt3nwjua",
                password_reset_code: "1",
              },
            ],
          },
        },
      },
      example: {
        statusCode: 200,
        isSuccess: true,
        message: "SUCCESS",
        data: [
          {
            createdAt: "2023-12-22T05:44:35.286Z",
            updatedAt: "2023-12-22T05:44:35.286Z",
            _id: "657845cf5dc54b24021ecf04",
            username: "11",
            first_name: "test",
            last_name: "test",
            email: "te@test.com",
            email_code: "eee",
            password: "7rBbjMr00UhkxZAX3C/fR/tt3nwjua",
            password_reset_code: "1",
          }
        ]
      }
    }
  }
};

export const loginSuccessResponse = {
  status: 200,
  description: "Success! Returns the user data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 201 },
          isSuccess: { type: "boolean", example: true },
          message: { type: "string", example: "SUCCESS" },
          data: { type: "object", example: null },
        },
      },
      example: {
        statusCode: 200,
        isSuccess: true,
        message: "SUCCESS",
        data:null
    
      },
    },
  },
};

export const loginErrorResponse = {
  status: 401,
  description: "Unauthorized access.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 400 },
          isSuccess: { type: "boolean", example: false },
          message: { type: "string", example: "Unauthorized" },
          data: { type: "object", example: null },
          timestamp: { type: "date", example: "2023-12-22T05:17:16.499Z" },
          path: { type: "string", example: "/login" },
        },
      },
      example: {
        statusCode: 401,
        message: "Unauthorized",
        error: "Unauthorized",
        timestamp: "2023-12-22T06:00:04.100Z",
        path: "/auth/login",
        isSuccess: false,
        data: null,
      },
    },
  },
};

export const refreshErrorResponse = {
  status: 401,
  description: "Unauthorized access",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 400 },
          isSuccess: { type: "boolean", example: false },
          message: { type: "string", example: "Unauthorized" },
          data: { type: "object", example: null },
          timestamp: { type: "date", example: "2023-12-22T05:17:16.499Z" },
          path: { type: "string", example: "/login" },
        },
      },
      example: {
        statusCode: 401,
        message: "Unauthorized",
        error: "Unauthorized",
        timestamp: "2023-12-22T06:00:04.100Z",
        path: "/auth/refesh",
        isSuccess: false,
        data: null,
      },
    },
  },
};