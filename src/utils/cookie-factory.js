export default function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  let i = 0;
  for (i; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name} + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'`;
  }
}
