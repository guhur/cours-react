
let nextUserId = 0;
// addUser({
//  name: "ezoigjet fpprojg",
//  gender: "female"
//  picture: ""
// })
export function addUser(user) {
  const action = {
    type: 'ADD_USER',
    name: user.name,
    gender: user.gender,
    picture: user.picture,
    id: nextUserId++
  }  
  return action;
}
// store.dispatch(addUser(user))

