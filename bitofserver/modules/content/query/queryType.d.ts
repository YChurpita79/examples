export type SelectContentType = ({subCategory, technology, isQueryEmpty}: {
    subCategory: number,
    technology: number,
    isQueryEmpty: boolean
}) => string;