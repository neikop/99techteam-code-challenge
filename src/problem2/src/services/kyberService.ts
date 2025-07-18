import axios from "axios"

const kyberClient = axios.create({
  baseURL: `https://ks-setting.kyberswap.com`,
})
kyberClient.interceptors.response.use(({ data }) => data.data)

const fetchTokens = (params?: TokensParams): Promise<TokensPagination> => kyberClient.get(`/api/v1/tokens`, { params })

export default {
  fetchTokens,
}
