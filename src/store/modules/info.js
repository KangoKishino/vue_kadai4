import firebase from 'firebase'

export default {
    state() {
        return {
            signInUser: '',
            signErrorMessage: '',
            myBalance: '',
            userList: []
        }
    },
    mutations: {
        initMessage(state) {
            state.signErrorMessage = ''
        },
        setSignInUser(state) {
            const user = firebase.auth().currentUser
            if(user) {
                state.signInUser = user
            } else {
                state.signInUser = ''
            }
        },
        setSignErrorMessage(state, errorCode) {
            if (errorCode === 'auth/invalid-email') {
                state.signErrorMessage = '※正しいメールアドレスを入力してください'
            } else if (errorCode === 'auth/email-already-in-use'){
                state.signErrorMessage = '※このメールアドレスは既に登録されています'
            } else if (errorCode === 'auth/weak-password') {
                state.signErrorMessage = '※パスワードは6文字以上入力してください'
            } else if (errorCode === 'auth/wrong-password'){
                state.signErrorMessage = '※パスワードが違います'
            } else if(errorCode === 'userName-undefine') {
                state.signErrorMessage = '※ユーザ名を入力してください'
            }
        },
        setMyBalance(state, balance) {
            state.myBalance = balance.balance
        },
        setUserList(state, user) {
            state.userList = user
        },
        updateMyBalance(state, newMyBalance) {
            state.myBalance = newMyBalance
        },
        deleteSignInUser(state) {
            state.signInUser = ''
            state.myBalance = ''
            state.userList = []
        }
    },
    getters: {
        signInUser(state) {
            return state.signInUser
        },
        signErrorMessage(state) {
            return state.signErrorMessage
        },
        myBalance(state) {
            return state.myBalance
        },
        userList(state) {
            return state.userList
        }
    },
    actions: {
        initMessage({ commit }) {
            commit('initMessage')
        },
        signUp({ getters, dispatch, commit }, { userName, mailAddress, password }) {
            return firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
                .then(() => {
                    const user = firebase.auth().currentUser
                    user.updateProfile({
                        displayName: userName
                    })
                        .then(() => {
                            commit('setSignInUser')
                            firebase.database().ref(`users/${getters.signInUser.uid}`).set({
                                name: userName,
                                balance: 1000
                            })
                            dispatch('fetchBalance')
                        })
                })
                .catch((error) => {
                    const errorCode = error.code
                    commit('setSignErrorMessage', errorCode)
                    return Promise.reject()
                })
        },
        signIn({ dispatch, commit }, { mailAddress, password }) {
            return firebase.auth().signInWithEmailAndPassword(mailAddress, password)
                .then(() => {
                    commit('setSignInUser')
                    dispatch('fetchBalance')
                })
                .catch((error) => {
                    const errorCode = error.code
                    commit('setSignErrorMessage', errorCode)
                    return Promise.reject()
                })
        },
        fetchBalance({ getters, commit }) {
            const balanceRef = firebase.database().ref(`users/${getters.signInUser.uid}`)
            balanceRef.on('value', function(snapshot) {
                const balance = snapshot.val()
                commit('setMyBalance', balance)
            })
        },
        fetchUser({ commit }) {
            const userRef = firebase.database().ref('users')
            userRef.on('value', function(snapshot) {
                const user = snapshot.val()
                commit('setUserList', user)
            })
        },
        signOut({ commit }) {
            return firebase.auth().signOut()
                .then(() => {
                    commit('deleteSignInUser')
                })
                .catch(() => {
                    return Promise.reject()
                })
        },
        processRemittance({ getters, commit }, { receiveUser, newMyBalance, newReceivedBalance }) {
            const myDataRef = firebase.database().ref(`users/${getters.signInUser.uid}`)
            myDataRef.transaction((currentData) => {
                myDataRef.update({
                    balance: newMyBalance
                })
                    .then(() => {
                        firebase.database().ref(`users/${receiveUser.uid}`).update({
                            balance: newReceivedBalance
                        })
                            .then(() => {
                                commit('updateMyBalance', newMyBalance)
                            })
                            .catch(() => {
                                return currentData  
                            })
                    })
            })
        }
    }
}