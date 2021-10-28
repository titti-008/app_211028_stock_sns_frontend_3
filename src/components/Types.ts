export type Data = {
  text: string;
};

export type ApiResponse = {
  text: string;
};

export type BaseApiResponse = {
  success: boolean;
  errorMessage: string;
};

export type SuccessResponse = BaseApiResponse & {
  success: true;
  payload: {
    data: Data;
  };
};

export type FailerResponse = BaseApiResponse & {
  success: false;
  payload: null;
};

// export type ApiResponse = SuccessResponse | FailerResponse;
