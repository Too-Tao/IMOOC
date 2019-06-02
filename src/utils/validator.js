export const validatorName = (rule, value = '', callback) => {
  if (~value.indexOf('  ')) {
    callback('用户名不能包含空格')
  } else {
    callback()
  }
}

export const validatorPassword = (rule, value = '', callback) => {
  const len = value.length
  if ((len < 6 || len > 16) && len !== 0) {
    callback('密码长度在6-16个字符')
  } else if (~value.indexOf(' ')) {
    callback('密码不能包含空格')
  } else {
    callback()
  }
}
