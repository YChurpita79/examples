/* eslint-disable max-len */
import { useSelector } from "react-redux";
import { getAllShops, getSelectedShopId } from "store/app";
import { utcToZonedTime } from "date-fns-tz";

export const useTimezone = () => {
  const shops = useSelector(getAllShops);
  const shopId = useSelector(getSelectedShopId);
  const timeZone = shops?.find((elm) => elm?.id === shopId)?.timeZone;

  return (date) => {
    const dateObject = date ? new Date(date) : new Date();

    const dateTimeAccordingTimezone =
      date === null ? null : utcToZonedTime(dateObject.toISOString(), timeZone);
    return {
      dateTimeAccordingTimezone,
    };
  };
};
