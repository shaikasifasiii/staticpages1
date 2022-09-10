<template>
  <div class="flex items-center m-2">
    <input class="p-2 border border-blue-700 text-base text-black mr-4" :id="firstName" @input="cleanAndAttach" />
    <input class="p-2 border border-blue-700 text-base text-black mr-4" :id="secondName" @input="cleanAndAttach" />
    <div class="capitalize">{{ output }}</div>
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
      const alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
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