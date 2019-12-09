let nextTodoId = 0

export const addUser = user => ({
  type: 'ADD_USER',
  picture: user.picture,
  id: nextTodoId++,
  name: user.name,
  gender: user.gender
});


export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const fetchUsers = (callback) => {
    fetch("https://randomuser.me/api/?results=50")
    .then(res => res.json())
    .then(callback)
}
