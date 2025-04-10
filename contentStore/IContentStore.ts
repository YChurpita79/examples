import {RootStore} from "@store/RootStore";
import IContent from "@store/contentStore/IContent";

export default interface IContentStore {
    rootStore: RootStore,
    state: string,
    data: Array<IContent>,
    fetchContent: Function
}

