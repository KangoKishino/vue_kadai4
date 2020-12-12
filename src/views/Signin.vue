<template>
  <div class="signin">
    <h1>ログイン画面</h1>
    <table class="mt-5">
      <tbody id="list">
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
    <button type="button" @click="signIn" class="btn btn-primary mt-3">ログイン</button>
    <div>
      <router-link :to="{ name: 'Home' }">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      mailAddress: '',
      password: ''
    }
  },
  created() {
    this.$store.dispatch('initMessage')
  },
  methods: {
    signIn() {
      this.$store.dispatch('signIn', {
        mailAddress: this.mailAddress,
        password: this.password
      })
      .then(() => {
        this.$router.push({ name: 'Dashboard' })
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