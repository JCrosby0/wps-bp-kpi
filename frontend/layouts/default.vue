<template>
  <div>
    <Nav />
    <Nuxt class="main" />
  </div>
</template>
<script>
import Nav from '~/components/Nav'
export default {
  components: { Nav },
}
</script>

<style>
:root {
  --color-orange: #f6782b;
  --color-grey: #303030;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow: hidden;
  background: #efefef;
  height: 100vh;
  text-align: center;
}

.main {
  height: calc(100vh - 132px);
  overflow: auto;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--color-grey);
  color: var(--color-grey);
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: var(--color-grey);
}

.button--orange {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--color-orange);
  color: var(--color-orange);
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  margin-bottom: 15px;
}

.button--orange:hover {
  color: #fff;
  background-color: var(--color-orange);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translatey(-100vh);
  /* opacity: 0; */
}
</style>
