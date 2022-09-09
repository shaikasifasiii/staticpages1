<template>
  <div class="main-content">
    <h1 class="header">Tasks</h1>
    <div class="tab">
      <div class="tab-labels">
        <div class="label cursor-pointer" @click="changeTab(0)">
          <span>IMAGES TASK</span>
          <span
            :class="[
              'inline-block',
              'active',
              this.state.tab === 0 ? 'block' : 'hidden',
            ]"
          ></span>
        </div>
        <div class="label cursor-pointer" @click="changeTab(1)">
          <span>EXTRA CHALLENGE</span>
          <span
            :class="[
              'inline-block',
              'active',
              this.state.tab === 1 ? 'block' : 'hidden',
            ]"
          ></span>
        </div>
      </div>
      <div class="tab-content" @scroll="checkScroll">
        <template v-if="this.state.tab === 0">
          <div class="flex justify-end actions">
            <button @click="openModal" class="button">Add</button>
          </div>
          <div class="image-section row">
            <template v-for="image in state.fetchedImages" :key="image.id">
              <div class="image-grid" @click="openImageTab(image)">
                <div class="image-title" :title="'Title: ' + image.title">
                  {{ image.title }}
                </div>
                <div :class="'image-thumbnail'">
                  <img :src="image.thumbnailUrl" :class="image.local ? 'fixed-size' : ''" @error="changeSrc($event)" alt="image" />
                </div>
              </div>
            </template>
            <div
              v-if="this.state.dialog"
              class="popup-container"
            >
              <div class="form-container">
                <div class="form-content">
                  <h1 class="form-header">ADD A IMAGE</h1>
                  <div class="form">
                    <input
                      class="mr-2 form-field"
                      placeholder="Title"
                      @input="this.state.dialogTitle = $event.target.value"
                    />
                    <input
                      class="mr-2 form-field"
                      placeholder="Enter Url"
                      @input="this.state.dialogUrl = $event.target.value"
                    />

                    <button class="button form-submit" type="button" @click="onSubmit">
                      Submit
                    </button>
                    <button class="button form-cancel" type="button" @click="closeModal">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="this.state.tab === 1">
          <div class="row m-2">
            <input class="mr-2" :id="firstName" @input="cleanAndAttach" />
            <input class="mr-2" :id="secondName" @input="cleanAndAttach" />
            <div class="text-capitalize">{{ output }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MainPage",
  props: {
    msg: String,
  },
  beforeCreate() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        // console.log(response)
        this.state.images = response.data.map(val => {
          val.local = false;
          return val
        });
        let localImages = [];
        if (localStorage.getItem('localImages')) {
          localImages = JSON.parse(localStorage.getItem('localImages'))
          this.state.images = [...localImages, ...this.state.images]
        }
        this.state.fetchedImages = this.state.images.slice(0, this.state.numImages);
      });
  },
  data() {
    return {
      state: {
        tab: 0,
        images: [],
        numImages: 100,
        fetchedImages: [],
        dialog: false,
        dialogTitle: '',
        dialogUrl: ''
      },
      firstName: "first-name",
      secondName: "second-name",
      output: "",
    };
  },
  methods: {
    changeTab(tab) {
      this.state.tab = tab;
    },
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
        if (alpha.includes(char) || number.includes(char)) {
          newFirst.push(char);
        }
      });
      second.split("").forEach((char) => {
        if (alpha.includes(char) || number.includes(char)) {
          newSecond.push(char);
        }
      });
      first = newFirst.join("");
      second = newSecond.reverse().join("");
      this.output = first + second;
    },
    changeSrc(event) {
      event.target.src = '../assets/image-placeholder.png'
    },
    checkScroll(event) {
      const el = event.target;
      if (el.scrollTop > el.scrollHeight - el.clientHeight - 50) {
        this.state.numImages = this.state.numImages + 200;
        this.state.fetchedImages = this.state.images.slice(
          0,
          this.state.numImages
        );
      }
    },
    openImageTab(image) {
      window.open(image.url, "_blank");
    },
    openModal() {
      this.state.dialog = true;
    },
    onSubmit() {
      let localImages = [];
      if (localStorage.getItem('localImages')) {
        localImages = JSON.parse(localStorage.getItem('localImages'));
        localImages.push({
          id: Math.floor(Math.random() * 10000),
          url: this.state.dialogUrl,
          thumbnailUrl: this.state.dialogUrl,
          title: this.state.dialogTitle,
          local: true,
        })
      } else {
        localImages = [
          {
            id: Math.floor(Math.random() * 10000),
            url: this.state.dialogUrl,
            thumbnailUrl: this.state.dialogUrl,
            title: this.state.dialogTitle,
            local: true,
          }
        ]
      }
      localStorage.setItem('localImages', JSON.stringify(localImages))
      this.state.images = [...localImages, this.state.images]
      this.state.fetchedImages = this.state.images.slice(0, this.state.numImages);
      this.closeModal()
    },
    closeModal() {
      this.state.dialog = false
      this.state.dialogTitle = ''
      this.state.dialogUrl = ''
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
.button {
  width: 140px;
  height: 34px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 14px;
  outline: none;
  cursor: pointer;
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

.main-content {
  margin: 0 2rem;
}

.main-content .header {
  font-weight: 500;
  font-size: 30px;
  margin: 0;
  padding: 1rem 0;
  letter-spacing: 0.58px;
}

.main-content .tab .tab-labels {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #d8d8d8;
}

.main-content .tab .tab-labels .label {
  margin: 0 44px 0 0;
  font-family: "Poppins";
  font-weight: 500;
  padding: 0 0 16px 0;
  font-size: 12px;
  letter-spacing: 0.6px;
  position: relative;
}

.main-content .tab .tab-content {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.main-content .tab .tab-content .actions {
  margin: 8px 0 44px 0;
}

.main-content .tab .active {
  background-color: #5d57f4;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 25px;
  height: 3px;
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
