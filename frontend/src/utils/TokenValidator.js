import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = dayjs.unix(decodedToken.exp);
    return {
      isValid: dayjs().isBefore(expirationDate),
      user: decodedToken.user_id,
    };
  } catch (error) {
    return false;
  }
};
