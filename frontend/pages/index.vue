<template>
  <div class="container">
    <div class="main">
      <p class="description">
        A summary of Strategies for Improvement, Measuring Success and
        Performance Targets along with indicators showing progress towards
        achieving the Business Plan's goals
      </p>
    </div>
    <nuxt-view> </nuxt-view>
  </div>
</template>

<style>
.container {
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main {
  padding: 1rem;
}

.description {
  background: black;
  padding: 1rem;
  border: 1px grey solid;
  color: #efefef;
}

.subtitle {
  font-weight: 300;
  font-size: 2rem;
  color: #333333;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
