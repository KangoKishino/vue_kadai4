<template>
  <div class="home">
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
    <p v-if="this.$store.getters.signErrorMessage" class="error-message mt-3"> {{ this.$store.getters.signErrorMessage }} </p>
    <button type="button" @click="signUp" class="btn btn-primary mt-3">新規登録</button>
    <div>
      <router-link :to="{ name: 'Signin' }">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: ''
    }
  },
  created() {
      this.$store.dispatch('initMessage')
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', {
        userName: this.userName,
        mailAddress: this.mailAddress,
        password: this.password,
        that: this
      })
    },
  }
}
</script>

<style>
table {
  margin-left: auto;
  margin-right: auto;
}
.error-message {
  color: red;
}
</style>
