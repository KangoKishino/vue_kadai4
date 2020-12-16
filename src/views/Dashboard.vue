<template>
  <div class="about">
    <div class="my-information">
      <div>
        <p class="block">{{ this.$store.getters.signInUser.displayName }}さんようこそ！！</p>
      </div>
      <div>
        <p class="block">残高:{{ this.$store.getters.myBalance }}</p>
        <button type="button" @click="signOut" class="btn btn-outline-primary ml-2">ログアウト</button>
      </div>
    </div>
    <h1 class='mt-5'>ユーザ一覧</h1>
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>
          <th class="space"></th>
        </tr>
      </thead>
      <tbody id="list">
        <tr v-for="(todo, key) in filteredList" :key="key">
          <td>{{ todo.name }}</td>
          <td></td>
          <td><button @click="openWalletModal(todo)" type="button" class="btn btn-primary ml-2">walletを見る</button></td>
          <td><button type="button" class="btn btn-primary ml-2">送る</button></td>
        </tr>
      </tbody>
    </table>

    <ModalWindow @close="closeWalletModal()" v-show="showWallet">
      <p> {{ otherUser.name }} さんの残高</p>
      <p> {{ otherUser.balance }} </p>
      <template slot="footer">
        <button class="btn btn-primary" @click="closeWalletModal()">close</button>
      </template>
    </ModalWindow>

  </div>
</template>

<script>
import ModalWindow from '../components/ModalWindow'

export default {
  components: {
    ModalWindow
  },
  created() {
    this.$store.dispatch('fetchUser')
    this.filteredList = this.$store.getters.userList
    this.$delete(this.filteredList, this.$store.getters.signInUser.uid)
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
        .then(() => {
          this.$router.push({ name: 'Signin' })
        })
    },
    openWalletModal(todo){
      this.otherUser.balance = todo.balance
      this.otherUser.name = todo.name
      this.showWallet = true
    },
    closeWalletModal: function(){
      this.showWallet = false
    },
  },
  mounted() {
    this.$store.subscribe(mutation => {
      if(mutation.type === 'setUserList') {
        this.filteredList = this.$store.getters.userList
        this.$delete(this.filteredList, this.$store.getters.signInUser.uid)
      }
    })
  },
  data() {
    return {
      filteredList: [],
      showWallet: false,
      otherUser: [],
    }
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

.space {
  width: 400px;
}
</style>