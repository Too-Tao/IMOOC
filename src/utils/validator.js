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

export const validatorEmail = (rule, value = '', callback) => {
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  if (!reg.test(value)) {
    callback('邮箱地址不正确')
  } else {
    callback()
  }
}

export const validatorPhone = (rule, value = '', callback) => {
  const mobile = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/
  if (!mobile.test(value)) {
    callback('手机号码不正确')
  } else {
    callback()
  }
}