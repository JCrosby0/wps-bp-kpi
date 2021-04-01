<template>
  <div class="modal" @click="$emit('close')">
    <div class="container" @click.stop>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="actions">
          <button title="OK" class="buttons positive" @click="$emit('ok')">
            OK
          </button>
          <button
            title="Cancel"
            class="buttons negative"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.container {
  margin: 10vh 10vw;
  padding: 0;
  width: 80vw;
  height: 80vh;
  background: #efefef;
  box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}
.title {
  flex: 0 0 2.5rem;
  background: var(--color-light-orange);
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 2rem;
}
.content {
  padding: 1rem;
  flex: 1 1 100%;
  overflow-y: auto;
}
.footer {
  flex: 0 0 3.5rem;
  background: #ccc;
  text-align: right;
}
.buttons {
  margin: 0.5rem;
  margin-left: 0;
  height: 2.5rem;
  width: 5rem;
  border-radius: 0.5rem;
  padding: 1rem, 2rem;
}
.buttons:hover {
  box-shadow: 0px 0px 6px 6px rgba(255, 255, 255, 0.5);
}
.positive {
  background: var(--color-orange);
}
</style>
