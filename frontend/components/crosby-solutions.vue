<template>
  <div class="font">
    <div v-if="['all', 'color'].includes(type)" id="logo1" class="logo">
      <!-- <div class="letter j"></div> -->
      <div class="letter c1"></div>
      <div class="letter c2"></div>
      <div class="letter s1"></div>
      <div class="letter s2"></div>
      <div class="words">
        <div class="type crosby">crosby</div>
        <div class="type solutions">solutions</div>
      </div>
    </div>
    <div v-if="['all', 'monochrome'].includes(type)" class="background">
      <div id="logo2" class="logo">
        <!-- <div class="letter j"></div> -->
        <div class="letter c1"></div>
        <div class="letter c2"></div>
        <div class="letter s1"></div>
        <div class="letter s2"></div>
        <div class="words">
          <div class="type crosby">crosby</div>
          <div class="type solutions">solutions</div>
        </div>
      </div>
    </div>
    <div v-if="['all', 'single'].includes(type)" id="logo3" class="logo">
      <!-- <div class="letter j"></div> -->
      <div class="letter c1"></div>
      <div class="letter c2"></div>
      <div class="letter s1"></div>
      <div class="letter s2"></div>
      <div class="words">
        <a href="https://crosby.solutions" target="_blank">
          <div class="type crosby">crosby</div></a
        >
        <a href="https://crosby.solutions" target="_blank">
          <div class="type solutions">solutions</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: false,
      type: String,
      default: () => {
        return 'all'
      },
    },
  },
}
</script>

<style scoped>
.font {
  font-size: 24px;
}
.logo {
  /* background: black; */
  margin: auto;
  height: 4em;
  width: 4em;
  margin: 2em;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.letter {
  width: 2em;
  border: 0.4em solid #333;
  box-sizing: border-box;
  height: 2em;
  border-top-left-radius: 100%;
  background: hsl(120, 100%, 70%);
  border-right-width: 0;
  border-bottom-width: 0;
}
.c1 {
  background: hsl(120, 100%, 35%);
}
.c2 {
  transform: rotate(270deg);
  background: hsl(120, 100%, 35%);
}
.s1 {
  border-bottom-width: 0.2em;
  background: hsl(120, 100%, 65%);
}
.s2 {
  transform: rotate(180deg);
  border-bottom-width: 0.2em;
  background: hsl(120, 100%, 65%);
}
.words {
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  line-height: 2em;
  margin-left: 0.5em;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.crosby {
  font-size: 3em;
  font-weight: 900;
  color: hsl(120, 100%, 35%);
  z-index: 2;
}
.solutions {
  font-weight: 100;
  font-size: 1.5em;
  padding-left: 0.2em;
  letter-spacing: 0.2em;
  color: hsl(120, 100%, 35%);
  z-index: 1;
}

/* logo 2 */
.background {
  padding: 1em;
  background: #333;
  width: auto;
}
#logo2,
#logo2 .words,
#logo2 .crosby,
#logo2 .solutions {
  color: white;
}
#logo2 .letter {
  background: none;
  color: white;
  border-color: white;
}
#logo2 .s1,
#logo2 .s2 {
  border-bottom-width: 0.2em;
}
/* logo 3 */
#logo3 {
  font-size: 0.3em;
  height: 2em;
}
#logo3 .letter {
  border-width: 0.3em;
  border-right-width: 0;
  border-bottom-width: 0;
  width: 1em;
  height: 1em;
}
#logo3 .words {
  flex-direction: row;
  margin-top: -0.3em;
}
#logo3 .solutions {
  font-size: 3em;
  letter-spacing: -0.1em;
  padding: 0;
}
#logo3 .s1,
#logo3 .s2 {
  border-bottom-width: 0.15em;
}
</style>
