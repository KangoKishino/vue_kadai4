<template>
  <div class="about">
    <div class="my-information">
      <div>
        <p class="block">{{ this.$store.getters.signInUser.displayName }}さんようこそ！！</p>
      </div>
      <div>
        <p class="block">残高:{{ this.$store.getters.myBalance }}</p>
        <button type="button" @click="signOut" class="btn btn-primary ml-2">ログアウト</button>
      </div>
    </div>
    <h1 class='mt-5'>ユーザ一覧</h1>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
      .then(() => {
        this.$router.push({ name: 'Signin' })
      })
    },
  }
}
</script>

<style>
.my-information {
  padding: 2.5% 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.block {
  display: inline-block
}
</style>