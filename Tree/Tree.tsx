"use client"
import {useEffect, useMemo, useState} from "react";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import {TreeItem} from "@mui/x-tree-view/TreeItem";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {useStore} from "@/hooks/useStore";
import {TreeType} from "./Tree.d";
import SearchInput from "@/view/components/SerachInput/SearchInput";
import DataControlPanel from "@/view/components/DataControlPanel/DataControlPanel";
import {ActionType} from "@/appConstants/constants";

import {ISubCategoryElm} from "@store/subCategoryStore/ISubCategory";
import {ICategoryItem} from "@store/categoryStore/ICategory";

const Tree: TreeType = observer(() => {
    const [selectedOptions, setSelectedOption] = useState("");
    const store = useStore();

    useEffect(() => {
        store.categoryStore.fetchCategory();
        store.subCategoryStore.fetchSubCategory({query: ""});
    }, []);

    const {categoryStore, subCategoryStore} = store;

    const categoryList: Array<ICategoryItem> = useMemo((): Array<ICategoryItem> => {
        const {data: {categoryList}} = categoryStore;
        return toJS(categoryList);
    }, [categoryStore.data, selectedOptions, subCategoryStore.data]);

    const subCategoryList: Array<ISubCategoryElm> = useMemo((): Array<ISubCategoryElm> => {
        const {data: {subCategoryList}} = subCategoryStore
        const content = toJS(subCategoryList)
        return selectedOptions ? content.filter((elm: any) => elm?.title?.toLowerCase()
            .includes(selectedOptions.toLowerCase())) : content;
    }, [subCategoryStore.data, selectedOptions, categoryStore.data]);

    const selectSubCategoryHandle = (data: object) => {
        store.subCategoryStore.selectSubCategory(data);
    }

    const searchOptions = useMemo(() => {
        return subCategoryList ? [...subCategoryList] : [];
    }, [subCategoryList]);

    const handleAction = (type: ActionType) => {

        switch (type) {
            case ActionType.CREATE: {
                store.subCategoryStore.postSubCategory({title: "new sub category", categoryId: 18});
                return
            }
            case ActionType.DELETE: {
                store.categoryStore.deleteCategory({id: 24});
                return
            }

            case ActionType.EDIT: {
                store.categoryStore.updateCategory({id: 26, newTitle: "111111"});
                return
            }
        }
    }

    return (
        <div className={"container h-full flex flex-row-reverse"}>
            <div className={"container"}>
                <div className={"mr-2 ml-2"}>
                    <SearchInput options={searchOptions} title={"Search "} selectHandle={setSelectedOption}/>
                </div>
                <SimpleTreeView sx={{zIndex: "0", marginTop: "15px"}}>
                    {categoryList?.map((categoryElm: ICategoryItem, i: Number) => {
                        const subCategory = subCategoryList?.filter((elm: any) => {
                            return elm.category_id === categoryElm.id;
                        })

                        return (
                            <TreeItem key={`${categoryElm.title}-${i}`} itemId={`${categoryElm.title}-${i}`}
                                      label={categoryElm.title}>
                                {subCategory?.map((elm: ISubCategoryElm, i) => {
                                    return (<TreeItem onClick={() => selectSubCategoryHandle(elm)}
                                                      key={`${elm.title}-${i}`} itemId={`${elm.title}-${i}`}
                                                      label={`${elm.title}`}/>)
                                })}
                            </TreeItem>)
                    })}

                </SimpleTreeView>
            </div>
            <div className={"shadow"}>
                <DataControlPanel actionHandle={handleAction}/>
            </div>
        </div>
    )
})

export default Tree;