const {defineConfig} = require('@vue/cli-service')
const {VuetifyPlugin} = require('webpack-plugin-vuetify')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            plugins: [new VuetifyPlugin(({autoImport: true}))]
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    }
})
