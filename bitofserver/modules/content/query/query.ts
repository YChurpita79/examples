import {SelectContentType} from "./queryType";

export const selectContent: SelectContentType = ({subCategory, technology, isQueryEmpty}) => {
    const whereString = !isQueryEmpty ? ';' : `where technology.id  = '${subCategory}' and technology.id = '${technology}';`
    return `SELECT content.title, content.id, content.sub_category_id, content.content, content.code, 
             content.technology_id, sub_category.id as id_sub_category, sub_category.title as sub_category_title, 
             technology.id as id_technology, technology.title as technology_title 
             FROM snippetDb.content
             inner join snippetDb.sub_category on sub_category.id = content.sub_category_id 
             inner join snippetDb.technology on technology.id = content.technology_id
             ${whereString}`;
}