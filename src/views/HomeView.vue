<template>
  <div class="flex justify-end mb-4">
    <div class="dropdown-container">
      <div
        class="dropdown flex items-center justify-between"
        @click="menuClicked($event, 'album-dropdown')"
      >
        <div class="dropdown-value ml-2">
          {{ state.albumId !== "" ? getAlbum(state.albumId) : "Select album" }}
        </div>
        <div
          class="dropdown-menu shadow-lg shadow-zinc-200"
          id="album-dropdown"
        >
          <div
            class="dropdown-menu-item"
            v-for="item of state.albums"
            :key="item.id"
            @click="changeAlbum(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="remove" @click="removeAlbum">X</div>
        <div class="dropdown-toggle"></div>
      </div>
    </div>
    <button @click="openModal" class="button">Add</button>
  </div>
  <div class="tab-content" @scroll="checkScroll">
    <div class="image-section flex items-center flex-wrap">
      <template v-for="image in state.fetchedImages" :key="image.id">
        <div class="image-grid" @click="openImageTab(image)">
          <div class="image-title" :title="'Title: ' + image.title">
            {{ image.title }}
          </div>
          <div class="image-title" :title="'Album: ' + getAlbum(image.albumId)">
            {{ getAlbum(image.albumId) }}
          </div>
          <div :class="'image-thumbnail'">
            <img
              :src="image.thumbnailUrl"
              :class="image.local ? 'fixed-size' : ''"
              @error="changeSrc($event)"
              alt="image"
            />
          </div>
        </div>
      </template>
      <div v-if="this.state.dialog" class="popup-container">
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

              <button
                class="button form-submit"
                type="button"
                @click="onSubmit"
              >
                Submit
              </button>
              <button
                class="button form-cancel"
                type="button"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import img from "../assets/image-placeholder.png";
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
        this.state.images = response.data.map((val) => {
          val.local = false;
          return val;
        });
        let localImages = [];
        if (localStorage.getItem("localImages")) {
          localImages = JSON.parse(localStorage.getItem("localImages"));
          this.state.images = [...localImages, ...this.state.images];
        }
        this.state.fetchedImages = this.state.images.slice(
          0,
          this.state.numImages
        );
      });
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        // console.log(response)
        this.state.albums = response.data;
      });
  },
  created() {
    window.addEventListener("click", (event) => {
      if (!event.target.classList.value.includes("dropdown")) {
        const elements = document.getElementsByClassName("show");
        if (elements.length > 0) {
          event.preventDefault();
          for (let i = 0; i < elements.length; i++) {
            if (elements.item(i).classList.value.includes("dropdown")) {
              const classes = elements
                .item(i)
                .classList.value.split(" ")
                .filter((val) => val !== "show");
              elements.item(i).setAttribute("class", classes.join(" "));
            }
          }
        }
      }
    });
  },
  deactivated() {
    window.addEventListener("click", (event) => {
      console.log(event.target.classList);
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
        dialogTitle: "",
        dialogUrl: "",
        albumId: "",
        albums: [],
      },
    };
  },
  methods: {
    changeSrc(event) {
      event.target.src = img;
    },
    removeAlbum() {
      const ele = document.getElementById("album-dropdown");
      const parentNode = ele.parentNode;
      const classes = parentNode.classList.value
        .split(" ")
        .filter((val) => val !== "show");
      parentNode.setAttribute("class", classes.join(" "));
      this.state.albumId = "";
      this.state.fetchedImages = this.state.images.slice(
        0,
        this.state.numImages
      );
    },
    changeAlbum(value) {
      const ele = document.getElementById("album-dropdown");
      const parentNode = ele.parentNode;
      parentNode.setAttribute("class", parentNode.classList.value + " show");
      this.state.albumId = parseInt(value);
      this.state.fetchedImages = this.state.images
        .filter((image) => this.state.albumId === image.albumId)
        .slice(0, this.state.numImages);
    },
    menuClicked(event, id) {
      if (event.target.classList.value.includes("dropdown")) {
        const ele = document.getElementById(id);
        if (!ele.classList.value.includes("show")) {
          ele.setAttribute("class", ele.classList.value + " show");
        }
      }
    },
    getAlbum(albumId) {
      return (
        this.state.albums.find((val) => val.id === albumId)?.title ||
        "Local album"
      );
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
      const elements = document.getElementsByClassName("show");
      if (elements.length < 0) {
        if (image.url.includes("http")) {
          window.open(image.url, "_blank");
        }
      }
    },
    openModal() {
      this.state.dialog = true;
    },
    onSubmit() {
      let localImages = [];
      if (localStorage.getItem("localImages")) {
        localImages = JSON.parse(localStorage.getItem("localImages"));
        localImages.push({
          id: Math.floor(Math.random() * 10000),
          url: this.state.dialogUrl,
          thumbnailUrl: this.state.dialogUrl,
          title: this.state.dialogTitle,
          albumId: "something",
          local: true,
        });
      } else {
        localImages = [
          {
            id: Math.floor(Math.random() * 10000),
            url: this.state.dialogUrl,
            thumbnailUrl: this.state.dialogUrl,
            title: this.state.dialogTitle,
            local: true,
          },
        ];
      }
      localStorage.setItem("localImages", JSON.stringify(localImages));
      this.state.images = [...localImages, this.state.images];
      this.state.fetchedImages = this.state.images.slice(
        0,
        this.state.numImages
      );
      this.closeModal();
    },
    closeModal() {
      this.state.dialog = false;
      this.state.dialogTitle = "";
      this.state.dialogUrl = "";
    },
  },
};
</script>
  