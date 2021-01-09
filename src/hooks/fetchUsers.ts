import { useEffect, useReducer } from 'react'
import axios from 'axios'

interface UserProps {
	page: number
	gender: string
}

const ACTIONS = {
	MAKE_REQUEST: ' make-request',
	GET_DATA: 'get-data',
	ERROR: 'error',
	UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
}

const BASE_URL = 'https://randomuser.me/api/'

function reducer(state: any, action: { type: string; payload?: any }) {
	switch (action.type) {
		case ACTIONS.MAKE_REQUEST:
			return { loading: true, users: [] }
		case ACTIONS.GET_DATA:
			return { ...state, loading: false, users: action.payload }
		case ACTIONS.ERROR:
			return { ...state, loading: false, error: action.payload }
		case ACTIONS.UPDATE_HAS_NEXT_PAGE:
			return { ...state, hasNextPage: action.payload.hasNextPage }
		default:
			return state
	}
}

export default function fetchUsers(params: {}, page: number) {
	const [state, dispatch] = useReducer(reducer, { users: [] })

	useEffect(() => {
		const cancelToken1 = axios.CancelToken.source()
		// dispatch({ type: ACTIONS.MAKE_REQUEST })

		axios
			.get(BASE_URL, {
				cancelToken: cancelToken1.token,
				params: { seed: 'abc', page: page, ...params, results: 5 },
			})
			.then(res => {
				dispatch({
					type: ACTIONS.GET_DATA,
					payload: { users: res.data.results },
				})
			})
			.catch(e => {
				if (axios.isCancel(e)) return
				dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
			})

		const cancelToken2 = axios.CancelToken.source()
		axios
			.get(BASE_URL, {
				cancelToken: cancelToken2.token,
				params: { seed: 'abc', page: page + 1, ...params },
			})
			.then(res => {
				dispatch({
					type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
					payload: { hasNextPage: res.data.length !== 0 },
				})
			})
			.catch(e => {
				if (axios.isCancel(e)) return
				dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
			})
		return () => {
			cancelToken1.cancel()
			cancelToken2.cancel()
		}
	}, [params, page])

	return state
}