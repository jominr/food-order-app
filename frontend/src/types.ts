export type User = {
  _id: string,
  email: string,
  name: string,
  addressLine1: string,
  city: string,
  country: string,
}
// 这里和userSchema的区别是，多了_id, 因为userSchema中的_id是mongoose自动加的。
// 因此我们要前后端分别定义，前后端分离开，
// 这里也没有定义auth0Id, 因为这是token来的，属于前端传给后端的东西，不是后端返回给前端的东西。？