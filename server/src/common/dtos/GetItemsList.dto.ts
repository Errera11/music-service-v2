export class GetItemsListDto<T> {
    readonly items: T[] | []
    readonly totalCount: number
}