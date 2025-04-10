import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./HeaderCell.module.less";
import ColumnSortArrow from "./components/ColumnSortArrow/ColumnSortArrow";
const HeaderCell = ({ tableConfig, tableConfig: { classes = {} }, column }) => {
  const { disableSortBy, isSorted } = column;

  const { headRowWrapper = "", headRowContentWrapper = "" } = classes;

  return (
    <div
      {...column.getHeaderProps()}
      className={cn(styles.headRow, headRowWrapper, {
        [styles.isSorted]: isSorted,
        [styles.headCell]: !disableSortBy,
        "d-none": column.isHeaderHidden,
      })}
    >
      <div className={cn(styles.contentWrapper, headRowContentWrapper)}>
        {column.render("Header")}
      </div>
      {!disableSortBy && (
        <ColumnSortArrow tableConfig={tableConfig} isSortByDesc={column.isSortedDesc} />
      )}
    </div>
  );
};

HeaderCell.propTypes = {
  tableConfig: PropTypes.object,
  classes: PropTypes.object,
  column: PropTypes.object,
};
export default HeaderCell;
