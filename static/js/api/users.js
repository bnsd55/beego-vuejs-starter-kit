import axios from 'axios'

export default {
  getAllUsers (cb) {
    axios.get(`/api/users`)
      .then(response => {
        cb(response)
      })
  },
  deleteUser (userID, cb) {
    axios.delete(`/api/users/` + userID).then(response => {
      cb(response)
    }).catch(err => {
      cb(err)
    })
  },
  addUser (user, cb) {
    axios.post(`/api/users/`, user).then(response => {
      cb(response)
    }).catch(err => {
      cb(err)
    })
  },
  updateUser (user, cb) {
    axios.put(`/api/users/`, user).then(response => {
      cb(response)
    }).catch(err => {
      cb(err)
    })
  }
}
