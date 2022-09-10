<template>
  <div class="row m-2">
    <input class="mr-2" :id="firstName" @input="cleanAndAttach" />
    <input class="mr-2" :id="secondName" @input="cleanAndAttach" />
    <div class="text-capitalize">{{ output }}</div>
  </div>
</template>

<script>
export default {
  name: "Task2",
  data() {
    return {
      firstName: "first-name",
      secondName: "second-name",
      output: "",
    };
  },
  methods: {
    cleanAndAttach() {
      let first = document.getElementById(this.firstName).value;
      let second = document.getElementById(this.secondName).value;
      const alpha = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let newFirst = [];
      let newSecond = [];
      first.split("").forEach((char) => {
        if (alpha.includes(char.toLowerCase()) || number.includes(char.toLowerCase())) {
          newFirst.push(char);
        }
      });
      second.split("").forEach((char) => {
        if (alpha.includes(char.toLowerCase()) || number.includes(char.toLowerCase())) {
          newSecond.push(char);
        }
      });
      first = newFirst.join("");
      second = newSecond.reverse().join("");
      this.output = first + second;
    }
  },
};
</script>
    
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container .form-content {
  width: 330px;
  background-color: white;
  box-shadow: 0 2px 10px 0 #000000;
}

.form-container .form-content .form-header {
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.8px;
  text-align: center;
  padding: 18px 0;
  margin: 0 0 19px 0;
  color: #292929;
  border-bottom: 1px solid #d8d8d8;
}

.form-container .form-content .form {
  margin: 0 40px !important;
  text-align: center;
}

.form-container .form-content .form-field {
  margin: 19px 0;
  width: 100%;
  font-size: 12px;
  color: #bbb9b9;
  letter-spacing: 0.37px;
  background-color: #ffffff;
}

.form-container .form-content select.form-field {
  padding: 10px 16px;
  border-radius: 25px;
}
.form-container .form-content .form-submit {
  background-color: #000000;
  color: #ffffff;
  margin: 40px auto 20px;
}

.form-container .form-content .form-cancel {
  background-color: #ffffff;
  color: #000000;
  margin: 20px auto;
}

.form-container .form-content select.form-field option {
  padding: 10px 16px;
  font-size: 12px;
  color: #bbb9b9;
}

.form-container .form-content button {
  display: block;
}

.table {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.table .heading-row,
.table .data-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-bottom: 1px solid #d8d8d8;
}

.table .data-row .row-value,
.table .heading-row .row-value {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.6px;
  margin: 0 35px 10px;
}

.table .data-row .row-value {
  padding: 16px 0;
}

.loader {
  width: calc(100vw - 200px);
  height: calc(100vh - 350px);
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  box-sizing: border-box;
  font-family: sans-serif;
  color: #292929;
}

.inline-block {
  display: inline-block;
}

.block {
  display: block;
}

.hidden {
  display: none;
}

.flex {
  display: flex;
}

.justify-end {
  justify-content: end;
}

.cursor-pointer {
  cursor: pointer;
}

.popup-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 10;
  left: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.m-2 {
  margin: 2rem 0;
}
.mr-2 {
  margin-right: 1rem;
}
input {
  padding: 0.5rem;
  outline: none;
  border: 1px solid #000000;
  border-radius: 4px;
}
.text-capitalize {
  text-transform: capitalize;
}
.image-section {
  margin-bottom: 50px;
}
.image-section .image-grid {
  width: 250px;
  padding: 0 0.5rem;
  box-sizing: content-box !important;
}
.image-section .image-grid .image-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.image-section .image-grid .image-title .label {
  font-weight: 500;
}
.fixed-size {
  object-fit: cover;
  width: 150px;
  height: 150px;
}
</style>
