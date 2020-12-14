<template>
  <div class="about">
    <div class="my-information">
      <p>{{ this.$store.getters.signInUser.displayName }}さんようこそ！！</p>
      <p>残高:{{ this.$store.getters.myBalance }}</p>
    </div>
    <h1 class='mt-5'>ユーザ一覧</h1>
  </div>
</template>

<style>
.my-information {
  padding: 2.5% 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>