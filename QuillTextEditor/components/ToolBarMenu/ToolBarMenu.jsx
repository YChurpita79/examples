/* eslint-disable max-len */
import React from "react";
import cn from "classnames";

import "react-quill-new/dist/quill.snow.css";
import styles from "./ToolBarMenu.module.less";
import {QUILL_LENE_HEIGHT_LIST, QUILL_FONT_SIZE} from "../../constants/constants";

const ToolBarMenu = ({toolBarId}) => {
    return (
        <div role="toolbar" id={toolBarId} className={cn("ql-toolbar ql-snow", styles.toolBarWrapper)}>
            <select aria-label="Font" className={cn("ql-font", styles.select)}></select>
            <select aria-label="Font size" className={cn("ql-size", styles.select)}>
                <option selected="selected">Default</option>
                {QUILL_FONT_SIZE.map((size) => (
                    <option value={`${size}`}>{`${size}`}</option>
                ))}
            </select>
            <button
                type="button"
                className={cn("ql-bold", styles.button)}
                aria-pressed="false"
                aria-label="bold"
            >
                <svg viewBox="0 0 18 18">
                    <path
                        className="ql-stroke"
                        d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                    ></path>
                    <path
                        className="ql-stroke"
                        d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                    ></path>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-italic", styles.button)}
                aria-pressed="false"
                aria-label="italic"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line>
                    <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-underline", styles.button)}
                aria-pressed="false"
                aria-label="underline"
            >
                <svg viewBox="0 0 18 18">
                    <path
                        className="ql-stroke"
                        d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
                    ></path>
                    <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-strike", styles.button)}
                aria-pressed="false"
                aria-label="strike"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"></line>
                    <path
                        className="ql-fill"
                        d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"
                    ></path>
                    <path
                        className="ql-fill"
                        d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"
                    ></path>
                </svg>
            </button>
            <select
                aria-label="Line height"
                className={cn("ql-line-height", styles.select, styles.lineHeight)}
            >
                {QUILL_LENE_HEIGHT_LIST?.map((elm) => (
                    <option value={`${elm}`} key={`${elm}`}/>
                ))}
            </select>
            <button
                type="button"
                className={cn("ql-list", styles.button)}
                aria-pressed="false"
                value="ordered"
                aria-label="list: ordered"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line>
                    <line className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line>
                    <line className="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line>
                    <path
                        className="ql-fill"
                        d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
                    ></path>
                    <path
                        className="ql-stroke ql-thin"
                        d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
                    ></path>
                    <path
                        className="ql-stroke ql-thin"
                        d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
                    ></path>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-list", styles.button)}
                aria-pressed="false"
                value="bullet"
                aria-label="list: bullet"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>
                    <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>
                    <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line>
                    <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>
                </svg>
            </button>
            <select
                className={cn("ql-align", styles.select, styles.align)}
                aria-pressed="false"
                value="ordered"
                aria-label="Align"
            ></select>
            <button
                type="button"
                className={cn("ql-indent", styles.button)}
                aria-pressed="false"
                value="-1"
                aria-label="indent: -1"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
                    <line className="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
                    <polyline className="ql-stroke" points="5 7 5 11 3 9 5 7"></polyline>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-indent", styles.button)}
                aria-pressed="false"
                value="+1"
                aria-label="indent: +1"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="3" x2="15" y1="14" y2="14"></line>
                    <line className="ql-stroke" x1="3" x2="15" y1="4" y2="4"></line>
                    <line className="ql-stroke" x1="9" x2="15" y1="9" y2="9"></line>
                    <polyline className="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-link", styles.button)}
                aria-pressed="false"
                aria-label="link"
            >
                <svg viewBox="0 0 18 18">
                    <line className="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line>
                    <path
                        className="ql-even ql-stroke"
                        d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                    ></path>
                    <path
                        className="ql-even ql-stroke"
                        d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                    ></path>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-image", styles.button)}
                aria-pressed="false"
                aria-label="image"
            >
                <svg viewBox="0 0 18 18">
                    <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                    <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
                    <polyline
                        className="ql-even ql-fill"
                        points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                    ></polyline>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-video", styles.button)}
                aria-pressed="false"
                aria-label="video"
            >
                <svg viewBox="0 0 18 18">
                    <rect className="ql-stroke" height="12" width="12" x="3" y="3"></rect>
                    <rect className="ql-fill" height="12" width="1" x="5" y="3"></rect>
                    <rect className="ql-fill" height="12" width="1" x="12" y="3"></rect>
                    <rect className="ql-fill" height="2" width="8" x="5" y="8"></rect>
                    <rect className="ql-fill" height="1" width="3" x="3" y="5"></rect>
                    <rect className="ql-fill" height="1" width="3" x="3" y="7"></rect>
                    <rect className="ql-fill" height="1" width="3" x="3" y="10"></rect>
                    <rect className="ql-fill" height="1" width="3" x="3" y="12"></rect>
                    <rect className="ql-fill" height="1" width="3" x="12" y="5"></rect>
                    <rect className="ql-fill" height="1" width="3" x="12" y="7"></rect>
                    <rect className="ql-fill" height="1" width="3" x="12" y="10"></rect>
                    <rect className="ql-fill" height="1" width="3" x="12" y="12"></rect>
                </svg>
            </button>
            <button
                type="button"
                className={cn("ql-emoji", styles.button)}
                aria-pressed="false"
                aria-label="emoji"
            >
                <svg viewBox="0 0 18 18">
                    <circle className="ql-fill" cx="7" cy="7" r="1"></circle>
                    <circle className="ql-fill" cx="11" cy="7" r="1"></circle>
                    <path className="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path>
                    <circle className="ql-stroke" cx="9" cy="9" r="6"></circle>
                </svg>
            </button>
        </div>
    );
};

export default ToolBarMenu;
