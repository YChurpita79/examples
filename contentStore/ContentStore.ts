import {makeAutoObservable, runInAction, observable} from "mobx";
import {RootStore} from "@/store/RootStore";
import IContentStore from "./IContentStore";
import IContent from "./IContent";
import {AxiosResponse} from "axios";
import {fetchContent} from "@/services/api/snippetApi";

export class ContentStore implements IContentStore {
    rootStore: RootStore;
    state = "pending"
    @observable data: AxiosResponse<IContent> = {contentList: []};

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    async fetchContent({query}: { query: string }) {
        this.state = "pending"
        try {
            const jsonData = await fetchContent({query});
            runInAction(() => {
                this.data = jsonData;
                this.state = "done"
            })
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}