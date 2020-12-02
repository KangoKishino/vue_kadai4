import firebase from 'firebase'

export default {
    state() {
        return {
            signMessage: '',
            signErrorMessage: ''
        }
    },
    mutations: {
        initMessage(state) {
            state.signMessage = ''
            state.signErrorMessage = ''
        },
        signUp(state) {
            state.signErrorMessage = ''
            state.signMessage = '✔︎登録完了しました'
        },
        signIn(state) {
            state.signErrorMessage = ''
            state.signMessage = '✔︎ログインしました'
        },
        signError(state, errorCode) {
            state.signMessage = ''
            if (errorCode === 'auth/invalid-email') {
                state.signErrorMessage = '※正しいメールアドレスを入力してください'
            } else if (errorCode === 'auth/email-already-in-use'){
                state.signErrorMessage = '※このメールアドレスは既に登録されています'
            } else if (errorCode === 'auth/weak-password') {
                state.signErrorMessage = '※パスワードは6文字以上入力してください'
            } else if (errorCode === 'auth/wrong-password'){
                state.signErrorMessage = '※パスワードが違います'
            }
        }
    },
    getters: {
        signMessage(state) {
            return state.signMessage
        },
        signErrorMessage(state) {
            return state.signErrorMessage
        }
    },
    actions: {
        initMessage({ commit }) {
            commit('initMessage')
        },
        signUp({ commit }, { mailAddress, password }) {
            firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
            .then(() => {
                commit('signUp')
            })
            .catch((error) => {
                const errorCode = error.code
                commit('signError', errorCode)
            })
        },
        signIn({ commit }, { mailAddress, password}) {
            firebase.auth().signInWithEmailAndPassword(mailAddress, password)
            .then(() => {
                commit('signIn')
            })
            .catch((error) => {
                const errorCode = error.code
                commit('signError', errorCode)
            })
        }
    }
}