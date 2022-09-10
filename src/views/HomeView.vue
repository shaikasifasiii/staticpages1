<template>
  <div class="flex justify-end mb-8">
    <div class="dropdown-container">
      <div
        class="
          dropdown
          w-96
          h-10
          rounded-lg
          cursor-pointer
          border-blue-900 border
          flex
          items-center
          justify-between
        "
        @click="menuClicked($event, 'album-dropdown')"
      >
        <div class="dropdown-value ml-2 h-9 flex items-center">
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
        <div v-if="state.albumId !== ''" class="remove" @click="removeAlbum">
          X
        </div>
        <div v-if="state.albumId === ''" class="dropdown-toggle"></div>
      </div>
    </div>
    <button @click="openModal" class="w-32 bg-blue-700 h-10 text-white rounded-lg ml-4">Add Image</button>
  </div>
  <div class="tab-content" @scroll="checkScroll">
    <div class="image-section flex items-center flex-wrap">
      <template v-for="image in state.fetchedImages" :key="image.id">
        <div
          class="image-grid mr-4 mb-6 p-6 border"
          @click="openImageTab(image)"
        >
          <div :class="'image-thumbnail mb-2'">
            <img
              :src="image.thumbnailUrl"
              :class="image.local ? 'fixed-size' : ''"
              @error="changeSrc($event)"
              alt="image"
            />
          </div>
          <div class="image-title" :title="'Title: ' + image.title">
            {{ image.title }}
          </div>
          <div class="image-title" :title="'Album: ' + getAlbum(image.albumId)">
            {{ getAlbum(image.albumId) }}
          </div>
        </div>
      </template>
      <div v-if="this.state.dialog" class="popup-container">
        <div class="form-container">
          <div class="form-content bg-white">
            <h1 class="form-header">ADD AN IMAGE</h1>
            <div class="form p-8">
              <input
                class="p-2 text-base text-black mb-8 w-full"
                placeholder="Title"
              /><input
                class="p-2 text-base text-black mb-8 w-full"
                placeholder="Enter Url"
              />
              <div class="flex w-full justify-between">
                <button
                  class="w-28 bg-blue-700 h-10 text-white rounded-lg mr-4"
                  @click="onSubmit"
                >
                  Submit
                </button>
                <button
                  class="
                    w-28
                    border-blue-700
                    h-10
                    text-blue-700
                    border
                    rounded-lg
                  "
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
            if (elements.item(i).classList.value.includes("dropdown-menu")) {
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
        console.log(this.state.numImages);
        if (this.state.albumId !== "") {
          this.state.fetchedImages = this.state.images
            .filter((image) => this.state.albumId === image.albumId)
            .slice(0, this.state.numImages);
        } else {
          this.state.fetchedImages = this.state.images.slice(
            0,
            this.state.numImages
          );
        }
      }
    },
    openImageTab(image) {
      const elements = document.getElementsByClassName("show");
      if (elements.length < 1) {
        if (image.url.includes("http")) {
          window.open(image.url, "_blank");
        }
      }
    },
    openModal() {
      this.state.dialog = true;
    },
    onSubmit() {
      this.state.dialog = false;
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
      this.state.images = [...localImages, ...this.state.images];
      const uniq = [];
      this.state.images.forEach((image) => {
        const exists = uniq.find((img) => image.id === img.id);
        if (typeof exists === "undefined") {
          uniq.push(image);
        }
      });
      this.state.images = uniq;
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
  