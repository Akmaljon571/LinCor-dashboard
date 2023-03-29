import useComponent from "../hooks/useComponent";

export const apiGet = (url) => {
  return fetch(`https://api.lincor.uz/api/v1` + url);
};

export const apiCUD = (url, method, body) => {
  const {token} = useComponent
  console.log(token)
  return fetch(`https://api.lincor.uz/api/v1` + url, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      "autharization": token,
    },
    body
  });

}
