import { useInfiniteQuery } from '@tanstack/react-query'

import { TAKE } from '../../../constants/constants'
import { userService } from '../../../service/user.service'

export const usePayments = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading
	} = useInfiniteQuery({
		queryKey: ['my-transactions'],
		initialPageParam: 0,
		queryFn: ({ pageParam }) =>
			userService.getTransactions({
				take: TAKE,
				skip: pageParam
			}),
		getNextPageParam: (lastPage, pages) => {
			if (!lastPage.data.isHasMore) return undefined
			return pages.length * TAKE
		}
	})

	return {
		transactions: data?.pages.flatMap(p => p.data.items) ?? [],
		fetchNextPage,
		hasNextPage: !!hasNextPage,
		isFetchingNextPage,
		isLoading
	}
}
