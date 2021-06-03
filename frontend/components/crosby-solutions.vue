<template>
  <a
    href="https://crosby.solutions"
    target="_blank"
    rel="wps-bp-kpi"
    class="logo-cs"
    >Created with 💚 by
    <object
      id="logo"
      :data="require('~/assets/cs-logo-one-line.svg')"
      type="image/svg+xml"
      alt="crosby solutions"
      height="16px"
    ></object>
  </a>
</template>

<style scoped>
.logo-cs {
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
}
#logo {
  pointer-events: none;
  vertical-align: bottom;
}
a,
a:hover,
a:visited,
a:active {
  color: black;
  text-decoration: none;
}
</style>
