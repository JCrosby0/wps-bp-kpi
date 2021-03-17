<template>
  <div>
    <div class="uk-child-width-1-2" uk-grid>
      <div>
        <router-link
          v-for="indicator in leftIndicators"
          :key="indicator.id"
          :to="{ name: 'indicators-id', params: { id: indicator.id } }"
          class="uk-link-reset"
        >
          <div class="uk-card uk-card-muted">
            <div v-if="indicator.image" class="uk-card-media-top">
              <img :src="api_url + indicator.image.url" alt="" height="100" />
            </div>
            <div class="uk-card-body">
              <p
                v-if="indicator.category"
                id="category"
                class="uk-text-uppercase"
              >
                {{ indicator.category.name }}
              </p>
              <p id="title" class="uk-text-large">{{ indicator.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div>
        <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
          <router-link
            v-for="indicator in rightIndicators"
            :key="indicator.id"
            :to="{ name: 'Indicators-id', params: { id: indicator.id } }"
            class="uk-link-reset"
          >
            <div class="uk-card uk-card-muted">
              <div v-if="indicator.image" class="uk-card-media-top">
                <img :src="api_url + indicator.image.url" alt="" height="100" />
              </div>
              <div class="uk-card-body">
                <p
                  v-if="indicator.category"
                  id="category"
                  class="uk-text-uppercase"
                >
                  {{ indicator.category.name }}
                </p>
                <p id="title" class="uk-text-large">{{ indicator.title }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import indicatorsQuery from '~/apollo/queries/indicators/indicators'

export default {
  props: {
    indicators: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
    }
  },
  computed: {
    leftIndicatorsCount() {
      return Math.ceil(this.indicators.length / 5)
    },
    leftIndicators() {
      return this.indicators.slice(0, this.leftIndicatorsCount)
    },
    rightIndicators() {
      return this.indicators.slice(
        this.leftIndicatorsCount,
        this.indicators.length
      )
    },
  },
}
</script>
