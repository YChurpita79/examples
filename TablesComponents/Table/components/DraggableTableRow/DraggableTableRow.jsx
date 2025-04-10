/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import cn from "classnames";

import DragHandle from "../DragHandle/DragHandle";
import styles from "./DraggableTableRow.module.less";
import Collapse from "view/components/DataDisplay/Collapse/Collapse";
import { useScreenSize } from "utility/hooks";

const DraggableTableRow = ({ tableConfig, row, collapsedRowId, setCollapsedRowId }) => {
  const { isMobile, windowWidth } = useScreenSize();
  const {
    isDraggable,
    CollapseRowComponent,
    data,
    isSelectable,
    showRowBorder,
    ToggleComponent,
    isShowGapBetweenRows,
    isShowRowBorder,
    classes = {},
  } = tableConfig;
  const { togglerClassName = "", dragPointer = "" } = classes;

  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const { isSelected } = row;

  const getRepeat = useMemo(() => {
    return row?.cells
      ?.map((item, index) => {
        if (index === 0 && isSelectable) return " 20px";
        return " 1fr";
      })
      .join("");
  }, [row]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridTemplateColumns: ` ${isMobile ? "1fr" : getRepeat} `,
  };

  const isExpanded = collapsedRowId === row.id;

  const RenderRow = () => (
    <>
      {isDragging ? (
        <td className={cn(styles.DraggingRow, dragPointer)} colSpan={row.cells.length}>
          &nbsp;
        </td>
      ) : (
        row.cells.map((cell, i) => {
          if (i === 0) {
            return (
              <td className={styles.cellWrapper} {...cell.getCellProps()}>
                {isDraggable && !isExpanded && (
                  <DragHandle isSelectable={isSelectable} {...attributes} {...listeners} />
                )}
                <span className={cn(styles.cellText)}>{cell.render("Cell")}</span>
              </td>
            );
          }
          return (
            <td className={cn(styles.cellWrapper)} {...cell.getCellProps()}>
              <span className={cn(styles.cellText)}>{cell.render("Cell")}</span>
            </td>
          );
        })
      )}
    </>
  );
  const handleCollapse = (id) => {
    if (isExpanded) {
      setCollapsedRowId(null);
      return;
    }
    setCollapsedRowId(id);
  };

  return (
    <tr
      ref={setNodeRef}
      className={cn(styles.rowWrapper, {
        [styles.rowExpanded]: isExpanded,
        [styles.isSelected]: isSelected && !isExpanded,
        [styles.isShowGapBetweenRows]: isShowGapBetweenRows,
        [styles.isShowRowBorder]: isShowRowBorder,
      })}
      style={style}
      {...row.getRowProps()}
    >
      {CollapseRowComponent && isMobile && (
        <Collapse
          isOpened={isExpanded}
          content={<RenderRow />}
          collapseArrowOpenedClassName={styles.arrowOpened}
          onCollapse={() => handleCollapse(row.id)}
          className={styles.togglerWrapper}
          togglerClassName={cn(styles.toggler, togglerClassName, {
            [styles.togglerExpanded]: isExpanded,
            [styles.isSelected]: isSelected && !isExpanded,
            [styles.rowBorder]: showRowBorder && !isExpanded && row?.index !== data.length - 1,
          })}
          contentContainerClassName={styles.contentContainer}
          ToggleComponent={ToggleComponent ? <ToggleComponent isExpanded={isExpanded} /> : null}
        >
          <CollapseRowComponent row={row} />
        </Collapse>
      )}
      {!isMobile && <RenderRow />}
    </tr>
  );
};

export default DraggableTableRow;
