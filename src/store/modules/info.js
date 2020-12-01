import firebase from 'firebase'

export default {
    state() {
        return {
            signUpMessage: '',
            signUpErrorMessage: ''
        }
    },
    mutations: {
        initMessage(state) {
            state.signUpMessage = ''
            state.signUpErrorMessage = ''
        },
        signUp(state) {
            state.signUpErrorMessage = ''
            state.signUpMessage = '✔︎登録完了しました'
        },
        signUpError(state, errorCode) {
            state.signUpMessage = ''
            if (errorCode === 'auth/invalid-email') {
                state.signUpErrorMessage = '※正しいメールアドレスを入力してください'
            } else if (errorCode === 'auth/email-already-in-use'){
                state.signUpErrorMessage = '※このメールアドレスは既に登録されています'
            } else if (errorCode === 'auth/weak-password') {
                state.signUpErrorMessage = '※パスワードは6文字以上入力してください'
            }
        }
    },
    getters: {
        signUpMessage(state) {
            return state.signUpMessage
        },
        signUpErrorMessage(state) {
            return state.signUpErrorMessage
        }
    },
    actions: {
        initMessage({ commit }) {
            commit('initMessage')
        },
        signUp({ commit }, personal) {
            // console.log(personal)
            firebase.auth().createUserWithEmailAndPassword(personal.mailAddress, personal.password)
            .then(() => {
                commit('signUp')
            })
            .catch((error) => {
                const errorCode = error.code
                commit('signUpError', errorCode)
            })
        }
    }
}