import {JSX} from "react";
import {ActionType} from "@/appConstants/constants";
import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/joy";

type optionsType = {id: number, title: string, type:ActionType, Icon:  OverridableComponent<SvgIconTypeMap<{}, "svg">> }

export type DataControlMenuType = ({options, actionHandle}:{options:optionsType[],actionHandle: Function}) => JSX.Element;