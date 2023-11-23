<template>
  <div class="form">
    <h1 class="title">Добавление заявки</h1>
    <label class="label" for="status">Статус заявки</label>
    <input class="input" id="status" type="text">
    <label class="label" for="comment">Комментарий для заявки</label>
    <input class="input" id="comment" type="text">
    <button class="button">Отправить</button>
  </div>
</template>

<script>
export default {
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