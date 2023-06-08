export const createAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
};
