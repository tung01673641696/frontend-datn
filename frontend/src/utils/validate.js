
export function validateName(name) {
  let regex = new RegExp(/^[A-Za-zÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐđ]+$/)
  let checkName = regex.test(name)
  return checkName
}

export function validatePhone(phone) {
 let regex = new RegExp(/^(0[3|5|7|8|9])+([0-9]{8})$/)
 let checkPhone = regex.test(phone)
 return checkPhone
}

export function validatePassword(password) {
  let regex = new RegExp(/^.{8,}$/)
  let checkPassword = regex.test(password)
  return checkPassword
}