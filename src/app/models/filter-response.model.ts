export class FilterResponse {
    public data: [];
    public totalCount: number;

    constructor(data?: [], totalCount?: number) {
        this.data = data;
        this.totalCount = totalCount;
    }
}