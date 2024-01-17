export interface IGetItemsList<T> {
    readonly items: T[] | []
    readonly totalCount: number
}
