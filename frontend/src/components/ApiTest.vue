<template>
  <div>
    <h1>API Message</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-else-if="message">{{ message }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios'

class BadResponseFormatError extends Error {
  constructor() {
    super('Malformed response')
  }
}

export default {
  data() {
    return {
      message: '',
      error: ''
    }
  },
  mounted() {
    this.fetchMessage()
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await axios.get('/api/')
        if (!response.headers['content-type'].startsWith('application/json')) {
          throw new BadResponseFormatError(response)
        }
        this.message = response.data.message
      } catch (error) {
        this.error = 'Failed to fetch message: ' + error.message
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
