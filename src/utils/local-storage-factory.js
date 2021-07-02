export default function setLocalStorage() {
  const decodedCookie = decodeURIComponent(document.cookie);
  const co = decodedCookie.split(';');
  let value;
  let name;
  let i = 0;
  for (i; i < co.length; i += 1) {
    name = co[i].split('=')[0].trim();
    value = co[i].split('=')[1];
    localStorage.setItem(name, value);
  }
}

