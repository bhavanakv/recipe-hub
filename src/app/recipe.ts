export interface Recipe {
    id: number,
    name: string,
    time: number,
    cuisine: string,
    ingredients: string[],
    steps: string[]
    difficulty: number,
    author: string,
    pieChart: {
        labels: string[],
        data: number[]
    },
    barChart: {
        labels: string[],
        data: number[]
    },
    stackedChart: {
        labels: string[],
        data: number[]
    }
}
