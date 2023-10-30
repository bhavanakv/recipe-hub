export interface Recipe {
    id: number,
    name: string,
    time: number,
    cuisine: string,
    ingredients: string[],
    steps: string[]
    difficulty: number,
    author: string
}
