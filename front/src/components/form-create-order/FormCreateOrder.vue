<template>
  <div class="form">
    <h1 class="title">Добавление заявки</h1>
    <label class="label" for="comment">Комментарий для заявки</label>
    <input v-model="comment" class="input" id="comment" type="text">
    <button @click="createOrder" class="button">Отправить</button>
  </div>
</template>

<script>
import axios from 'axios';
const http = axios.create({
  baseURL: `http://${import.meta.env.HOST}:3000`,
  headers: {
    'Content-Type': 'application/json',
  },
})
export default {
  data() {
    return {
      comment: ""
    }
  },
  methods: {
    async createOrder() {

      const order = {
        'comment': this.comment
      }
      try {
        const response = await http.post(`/api/v1/bipium/order/create`, order)
        console.log(response)
      } catch (e) {
        alert(e.message)
      }
    }
  }
}
</script>

<style>
.title {
  color: #34373f;
}

.form {
  background-color: #b1b1b1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 345px;
  height: 226px;
  margin: -123px 0 0 -182.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.input {
  width: 150px;
  color: #34373f;
}

.button {
  margin-top: 20px;
  color: #34373f;
}

.label {
  color: #34373f;
}
</style>