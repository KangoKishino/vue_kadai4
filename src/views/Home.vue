<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>新規登録画面</h1>
    <table class="mt-5">
      <tbody id="list">
        <tr>
          <td>ユーザ名</td>
          <td>
            <input type="text" v-model="userName" placeholder="userName">
          </td>
        </tr>
        <tr>
          <td>メールアドレス</td>
          <td>
            <input type="email" v-model="mailAddress" placeholder="E-mail">
          </td>
        </tr>
        <tr>
          <td>パスワード</td>
          <td>
            <input type="password" v-model="password" placeholder="Password">
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="signUp" class="btn btn-primary mt-3">新規登録</button>
    <div>
      ログインはこちらから
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.mailAddress, this.password)
      .then(() => {
        this.userName = ''
        this.mailAddress = ''
        this.password = ''
        alert('登録できました')
      })
      .catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style>
table {
  margin-left: auto;
  margin-right: auto;
}
</style>
