import {
	chain,
	WagmiConfig,
	createClient,
	useConnect,
	defaultChains,
	configureChains
} from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { configChains } from './connectors'

const { provider } = configChains()

export const client = createClient({
	autoConnect: true,
	provider
})