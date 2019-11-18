// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? sessionStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // 以下两行，本地开发时第一行不注释，第二行注释（可以不进入登录界面）
  return authority || ['admin'];
  // return authority ? ['admin'] : [];
}

export function setAuthority(authority) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}
