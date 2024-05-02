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