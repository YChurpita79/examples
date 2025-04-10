import React, { useMemo } from "react";
import DragHandle from "../DragHandle/DragHandle";
import PropTypes from "prop-types";

import styles from "./StaticTableRow.module.less";

const StaticTableRow = ({ row, tableConfig }) => {
  const { isSelectable } = tableConfig;

  const getRepeat = useMemo(() => {
    return row?.cells
      ?.map((item, index) => {
        if (index === 0 && isSelectable) return " 20px";
        return " 1fr";
      })
      .join("");
  }, [row]);

  return (
    <tr
      className={styles.StyledStaticTableRow}
      style={{ gridTemplateColumns: `${getRepeat}` }}
      {...row.getRowProps()}
    >
      {row.cells.map((cell, i) => {
        if (i === 0) {
          return (
            <td className={styles.StyledStaticData} {...cell.getCellProps()}>
              <DragHandle isSelectable={isSelectable} isDragging />
              <span>{cell.render("Cell")}</span>
            </td>
          );
        }
        return (
          <td className={styles.StyledStaticData} {...cell.getCellProps()}>
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
};

StaticTableRow.propTypes = {
  row: PropTypes.object,
  tableConfig: PropTypes.object,
};
export default StaticTableRow;
