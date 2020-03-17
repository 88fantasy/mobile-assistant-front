// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-mobile-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? sessionStorage.getItem('antd-mobile-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || [];
}

export function setAuthority(authority) {
  const Authority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('antd-mobile-authority', JSON.stringify(Authority));
}

export function setAccount(accountid) {
  return sessionStorage.setItem('assistant-mobile-account', accountid);
}

export function getAccount() {
  return sessionStorage.getItem('assistant-mobile-account');
}
