import firebase from 'firebase'

export default {
    state() {
        return {
            signInUser: '',
            signErrorMessage: '',
            myBalance: ''
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
        }
    },
    actions: {
        initMessage({ commit }) {
            commit('initMessage')
        },
        signUp({ getters, commit }, { userName, mailAddress, password, that }) {
            if(!userName) {
                const errorCode = 'userName-undefine'
                commit('setSignErrorMessage', errorCode)
                return
            }
            firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
            .then(() => {
                const user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: userName
                }).then(function() {
                    commit('setSignInUser')
                    firebase.database().ref(`users/${getters.signInUser.uid}`).set({balance: 1000})
                    that.$router.push({ name: 'Dashboard' })
                })
            })
            .catch((error) => {
                const errorCode = error.code
                commit('setSignErrorMessage', errorCode)
            })
        },
        signIn({ commit }, { mailAddress, password, that}) {
            firebase.auth().signInWithEmailAndPassword(mailAddress, password)
            .then(() => {
                commit('setSignInUser')
                that.$router.push({ name: 'Dashboard' })
            })
            .catch((error) => {
                const errorCode = error.code
                commit('setSignErrorMessage', errorCode)
            })
        },
        fetchBalance({ getters, commit }) {
            const balanceRef = firebase.database().ref(`users/${getters.signInUser.uid}`)
            balanceRef.on('value', function(snapshot) {
                let balance = snapshot.val()
                commit('setMyBalance', balance)
            })
        }
    }
}