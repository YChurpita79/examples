import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import { SortArrowDownIcon, SortArrowUpIcon } from "icons";
import styles from "./ColumnSortArrow.module.less";
const ColumnSortArrow = (props) => {
  const {
    isSortByDesc,
    tableConfig: { classes = {} },
  } = props;
  const { sortArrowClassName = "" } = classes;

  return (
    <span className={cn(styles.arrowWrapper, sortArrowClassName)}>
      {isSortByDesc && <SortArrowDownIcon />}
      {!isSortByDesc && <SortArrowUpIcon />}
    </span>
  );
};

ColumnSortArrow.propTypes = {
  isSortByDesc: PropTypes.bool,
  classes: PropTypes.object,
};
export default ColumnSortArrow;
