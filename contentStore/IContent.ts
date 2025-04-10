export interface List {
    id: number;
    sub_category_id: number;
    content: string;
    code: string;
    title: string;
    technology_id: number;
}

export default interface IContent {
    contentList: Array<List>
}

