export const host = 'https://api.lincor.uz/api/v1'

export const apiGet = (url, token, method = 'GET') => {
  return fetch(host + url, {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      'autharization': token,
    },
  })
}

export const apiCU = (url, method, body, token) => {
  return fetch(host + url, {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      'autharization': token,
    },
    body,
  })
}
