import Box from "@mui/material/Box";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {ActionType} from "@/appConstants/constants";
import {DataControlPanelType} from "@/view/components/DataControlPanel/DataControlPanel.d";

const DataControlPanel: DataControlPanelType = ({actionHandle}) => {
    return (
        <Box
            component="nav"
            sx={{height: "20px", width: "100%"}}
        >
            <Stack direction="column" spacing={1}>
                <IconButton onClick={() => actionHandle(ActionType.CREATE)} color={"primary"} aria-label="add">
                    <AddCircleIcon/>
                </IconButton>
                <IconButton onClick={() => actionHandle(ActionType.DELETE)} aria-label="delete" color="primary">
                    <RemoveCircleIcon/>
                </IconButton>
                <IconButton color="primary" onClick={() => actionHandle(ActionType.EDIT)} aria-label="edit">
                    <EditIcon/>
                </IconButton>
            </Stack>
        </Box>
    );
}

export default DataControlPanel;