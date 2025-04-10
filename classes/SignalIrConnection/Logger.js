/* eslint-disable max-len */
import {TrackJS} from "trackjs";
import {LOG_TYPE, LOG_TRANSPORT} from "constants/signalIrConnectionConstants";
import {getFromLocalStorage} from "utils/localStorageUtils";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "constants/localStorageConstants";

export class Logger {
    constructor({connectionUrl, context, transportType}) {
        this.context = context;
        this.connectionUrl = connectionUrl;
        this.transportType = transportType;
        this.logMessages = {
            [LOG_TYPE.ERROR_AFTER_START]: `${LOG_TRANSPORT[this.transportType]} %c${
                this.connectionUrl
            }%c: happened something wrong`,
            [LOG_TYPE.CONNECTED]: `${LOG_TRANSPORT[this.transportType]} %c${
                this.connectionUrl
            }%c: Connected after start`,
            [LOG_TYPE.RECONNECT]: `${LOG_TRANSPORT[this.transportType]} %c${
                this.connectionUrl
            }%c: reconnect error`,
            [LOG_TYPE.UNMOUNT]: `${LOG_TRANSPORT[this.transportType]} %c${
                this.connectionUrl
            }%c connection is closed on unmount`,
            [LOG_TYPE.CLOSED_AFTER_CONNECTION]: `Error while closing %c${this.connectionUrl} %c connection`,
            [LOG_TYPE.DEBOUNCE_START]: `Debounced start for %c${this.connectionUrl}%c ${
                LOG_TRANSPORT[this.transportType]
            }, current connection status is: `,
            [LOG_TYPE.CLOSED_CONNECTION]: `Connection closed for %c${this.connectionUrl}%c ${
                LOG_TRANSPORT[this.transportType]
            }, current connection status is: `,

            [LOG_TYPE.INVOKE_METHOD]: `Invoke Method to group - `,
            [LOG_TYPE.FAILED_AFTER_RETRY]: `${
                LOG_TRANSPORT[this.transportType]
            } failed after retry !!!!!`,
            [LOG_TYPE.FAILED_AFTER_SIGNAL_RETRY]: `${
                LOG_TRANSPORT[this.transportType]
            } failed after signalR 3 retry !!!!!`,
            [LOG_TYPE.FAILED_SOCKET_HOUR]: `${
                LOG_TRANSPORT[this.transportType]
            } failed after hours of retry attempts `,
        };
    }

    printLog({logType, logText, error}) {
        const messageString = logText
            ? `${this.logMessages[logType]} ${logText}`
            : this.logMessages[logType];
        const logMethod = !error ? "log" : "warn";
        const logContext = !error ? this.context : error;
        console[logMethod](messageString, "color: #bada55", "color: auto", logContext);
        return this;
    }

    #cutToken = (token) => {
        return token?.length > 0 ? token.substr(token?.length - 20, token?.length) : "is empty";
    };

    trackLog({logType, logText}) {
        const messageString = logText
            ? `${this.logMessages[logType]} ${logText}`
            : this.logMessages[logType];
        const accessToken = getFromLocalStorage(ACCESS_TOKEN_KEY);
        const cutAccessToken = this.#cutToken(accessToken);
        const refreshToken = getFromLocalStorage(REFRESH_TOKEN_KEY);
        const cutRefreshToken = this.#cutToken(refreshToken);

        TrackJS.track(
            `${messageString} AccessToken - ${cutAccessToken} RefreshToken - ${cutRefreshToken}`,
        );
    }
}
