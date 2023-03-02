import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  const isProduction = process.env.NODE_ENV === 'production';

  // in the deployed: We want our cookie to be sent only under -> HTTPS we
  // in the development: we want our cookie to be sent under -> HTTP


const maxAge = 60 * 60 * 24; } // 24 hours in seconds
 return cookie.serialized('sessionToken', token, {
// new browser
  maxAge: maxAge,
  expires: new Date (
    Date.now() + maxAge * 1000 // 24 hours in milliseconds
  ),

  httpOnly; true,
  secure: isProduction,
  path: '/',
  sameSite: 'lax'
 });
}
