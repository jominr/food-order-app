import { auth } from "express-oauth2-jwt-bearer";

// 检查token, Validate Access Token, 401 Unauthorized
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});
