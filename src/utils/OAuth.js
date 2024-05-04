import router from '@/router/router'
import store from '@/store'

const Module = {
    getTokenHeader: () => {
        const token = localStorage.getItem('access_token')

        return { 'Authorization': `Bearer ${token}` }
    },
    logout: () => {
        localStorage.removeItem('access_token')
        store.commit('reset')
        router.push({ path: '/', query: { ignore: true } })
    },
    buildParamQuery: (baseUrl, params) => {
        let url = baseUrl
        const active = params.filter((i) => i.value !== undefined && i.value !== null)

        active.forEach((item, index) => {
            if (index == 0) url += `?${item.key}=${item.value}`
            else url += `&${item.key}=${item.value}`
        })

        return url
    },
    checkResponse: (response) => {
        if (response.status === 200 || response.status === 201) return true
        else if (response.status === 403 || response.status === 401) Module.logout()
    },
    async parseResponse(response) {
        if (response.status === 200 || response.status === 201) return await response.json()
        else if (response.status === 403 || response.status === 401) Module.logout()
    },
    async parseResponseAsBlob(response) {
        if (response.status === 200 || response.status === 201) return await response.blob()
        else if (response.status === 403 || response.status === 401) Module.logout()
    }
}

export default Module