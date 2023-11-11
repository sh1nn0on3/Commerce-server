import base64 from 'base-64'

export const EncodeBase64 = (token: string) => {
  const encodedToken = base64?.encode(token)
  return encodedToken
}

export const DecodeBase64 = (token: string) => {
  const decodedToken = base64?.decode(token)
  return decodedToken
}
