import instance from "./axiosInstance";

export const getUsers = async () => {
  try {
    const { data } = await instance.get("/api/users");
    return data.result;
  } catch (error) {
    const response = {
      message: error.response.data.message,
      statusCode: error.response.status,
    };
    console.log(response.message);
  }
};

export const getDayWaterAmount = async (date) => {
  try {
    const response = await instance.get(`api/water/day/${date}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
