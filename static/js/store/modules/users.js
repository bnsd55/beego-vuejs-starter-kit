import * as types from '../mutation-types'
import users from '../../api/users'

// initial state
const state = {
  allUsers: [],
  editUser: {}
}

// actions
const actions = {
  [types.GET_ALL_USERS]({ commit }) {
    users.getAllUsers((allUsers) => {
      commit(types.GET_ALL_USERS, allUsers)
    })
  },
  [types.DELETE_USER]({ commit }, userID) {
    users.deleteUser(userID, (apiResult) => {
      if (apiResult.status === 204) {
        commit(types.DELETE_USER, { userID })
      }
    })
  },
  [types.ADD_USER]({ commit }, addedUser) {
    users.addUser(addedUser, (apiResult) => {
      commit(types.ADD_USER, { addedUser } )
    })
  },
  [types.INITIALIZE_TEMP]({ commit }, tempUser) {
    commit(types.INITIALIZE_TEMP, { tempUser })
  },
  [types.UPDATE_USER]({ commit }, data) {
    commit(types.UPDATE_USER, { data })
  },
  [types.SUBMIT_UPDATE_USER]({ commit }, userIndex) {
    users.updateUser(state.editUser, (apiResult) => {
      commit(types.SUBMIT_UPDATE_USER, { userIndex })
    })
  }
}

// mutations
const mutations = {
  [types.GET_ALL_USERS](state, allUsers) {
    state.allUsers = allUsers.data
  },
  [types.DELETE_USER](state, { userID }) {
    state.allUsers = state.allUsers.filter(currentObject => currentObject.id !== userID);
  },
  [types.ADD_USER](state, { addedUser }) {
    state.allUsers.push(addedUser)
  },
  [types.INITIALIZE_TEMP](state, { tempUser }) {
    state.editUser = Object.assign({}, tempUser)
  },
  [types.UPDATE_USER](state, { data }) {
    state.editUser[data.field] = data.value
  },
  [types.SUBMIT_UPDATE_USER](state, { userIndex }) {
    for (var key in state.allUsers[userIndex]) {
      if (state.editUser.hasOwnProperty(key)) {
        state.allUsers[userIndex][key] = state.editUser[key]
      }
    }

    state.editUser = {}
  }
}

export default {
  state,
  actions,
  mutations
}
