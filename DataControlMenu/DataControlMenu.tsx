import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {DataControlMenuType} from "./DataControlMenu.d";
import {ActionType} from "@/appConstants/constants";
import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/joy";

const DataControlMenu: DataControlMenuType = ({options, actionHandle}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (type: ActionType) => {
        actionHandle(type)
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: "200px",
                            width: "20ch",
                        },
                    },
                }}
            >
                {options.map((option) => {
                    const Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> = option.Icon;
                    return (
                        <MenuItem key={option.id} onClick={() => handleItemClick(option.type)}>
                            <div>
                                <Icon color={"primary"} sx={{height:"20px", marginRight:"5px"}} />
                                {option.title}
                            </div>
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default DataControlMenu;