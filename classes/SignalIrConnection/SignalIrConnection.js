/* eslint-disable max-len */
import {HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {WSConnectionStatuses} from "constants/commonConstants";
import {debounce} from "lodash";

import {Logger} from "./Logger";
import {LOG_TYPE} from "constants/signalIrConnectionConstants";

export class SignalIrConnection {
    #refreshTokenCounter = 0;
    #maxCountRefreshToken = 0;
    #isMaxCountRenewTokenReached = false;
    #clearRenewTokenCounter = () => {
    };

    constructor({connectionSettings, setConnectionState, eventHandlerPairs}) {
        this.onHandleStartError = () => {
        };
        this.eventHandlerPairs = eventHandlerPairs;
        this.setConnectionState = setConnectionState;
        this.connectionSettings = connectionSettings;
        this.shopId = connectionSettings.shopId;
        this.connection = this.buildHubConnection();
        this.#maxCountRefreshToken = connectionSettings.maxCountRefreshToken;

        this.logger = new Logger({
            connectionUrl: connectionSettings.connectionUrl,
            context: this.connection,
            transportType: connectionSettings.connectionOptions.transport,
        });

        this.onReconnectingHandler = (error) => {
            this.setConnectionState(WSConnectionStatuses.failed);
            this.logger
                .printLog({logType: LOG_TYPE.RECONNECT, error})
                .trackLog({logType: LOG_TYPE.RECONNECT});
        };

        this.onReconnectedHandler = async () => {
            this.setConnectionState(WSConnectionStatuses.success);
            const {subscribeList} = this.connectionSettings;
            const pairsHandlers = this.eventHandlerPairs;
            await this.unsubscribeShopGroup(subscribeList);
            await this.subscribeShopGroup(subscribeList);

            pairsHandlers.forEach((pair) => {
                this.connection.off(pair[0]);
                this.connection.on(pair[0], pair[1]);
            });
        };

        this.connection.onclose((error) => {
            this.logger.printLog({logType: LOG_TYPE.CLOSED_CONNECTION, error});
        });

        const isReconnectedHandlerRegistered = (handlerName) => {
            const handlersNamesArray = this.connection?._reconnectingCallbacks?.map((elm) => elm.name);
            return handlersNamesArray.includes(handlerName);
        };

        const isOnReconnectionRegistered = isReconnectedHandlerRegistered("onReconnectingHandler");
        !isOnReconnectionRegistered && this.connection.onreconnecting(this.onReconnectingHandler);

        // todo @yaroslav fix this check for onReconnected as well;
        !isOnReconnectionRegistered && this.connection.onreconnected(this.onReconnectedHandler);

        this.handleStartWithDebounce = debounce(async (options) => {
            this.setConnectionState(WSConnectionStatuses.pending);
            this.logger.printLog({logType: LOG_TYPE.DEBOUNCE_START});

            if (this.connection.state !== HubConnectionState.Disconnected) {
                await this.connection.stopPromise;
            }

            this.setMaxAttemptFetchToken = () => {
                this.#refreshTokenCounter = ++this.#refreshTokenCounter;
                this.#isMaxCountRenewTokenReached = this.#refreshTokenCounter >= this.#maxCountRefreshToken;
            };

            await this.connection
                .start()
                .then(async () => {
                    this.setConnectionState(WSConnectionStatuses.success);
                    const {subscribeList} = this.connectionSettings;
                    await this.subscribeShopGroup(subscribeList);
                    this.eventHandlerPairs.forEach((pair) => {
                        this.connection.off(pair[0]);
                        this.connection.on(pair[0], pair[1]);
                    });
                    this.logger.printLog({logType: LOG_TYPE.CONNECTED});
                })
                .catch((error) => {
                    this.logger.printLog({logType: LOG_TYPE.ERROR_AFTER_START, error});

                    if (this.#isMaxCountRenewTokenReached) {
                        this.logger
                            .printLog({logType: LOG_TYPE.FAILED_AFTER_RETRY, error})
                            .trackLog({logType: LOG_TYPE.FAILED_AFTER_RETRY});
                    }

                    this.onHandleStartError({
                        error,
                        setMaxAttemptFetchToken: this.setMaxAttemptFetchToken,
                        isMaxCountRenewTokenReached: this.#isMaxCountRenewTokenReached,
                    });
                });
        }, 1000);
    }

    async handleInvokeShopMethods(method, groupType, id) {
        try {
            await this.connection.invoke(`${method}`, id, groupType);
            this.logger.printLog({
                logType: LOG_TYPE.INVOKE_METHOD,
                logText: `${method} ${id} ${groupType}`,
            });
        } catch (error) {
            this.logger.printLog({
                logText: `${method} ${id} ${groupType}`,
                logType: LOG_TYPE.INVOKE_METHOD,
                error,
            });
        }
    }

    async subscribeShopGroup(subscribeList) {
        if (this.connection.state === HubConnectionState.Connected) {
            subscribeList?.forEach(async (elm) => {
                await this.handleSubscribeShopMethod(elm);
            });
        }
    }

    async unsubscribeShopGroup(subscribeList) {
        if (this.connection.state === HubConnectionState.Connected) {
            subscribeList.forEach(async (elm) => {
                await this.handleUnSubscribeShopMethod(elm);
            });
        }
    }

    async handleSubscribeShopMethod(groupType) {
        await this.handleInvokeShopMethods("SubscribeToShopGroup", groupType, this.shopId);
    }

    async handleUnSubscribeShopMethod(groupType) {
        await this.handleInvokeShopMethods("UnsubscribeFromShopGroup", groupType, this.shopId);
    }

    buildHubConnection() {
        return new HubConnectionBuilder()
            .withUrl(this.connectionSettings.connectionEndpoint, {
                ...this.connectionSettings.connectionOptions,
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    if (retryContext.previousRetryCount < 3) {
                        return 2 * 1000;
                    }
                    if (retryContext.previousRetryCount === 3) {
                        this.logger.trackLog({logType: LOG_TYPE.FAILED_AFTER_SIGNAL_RETRY});
                    }
                    if (retryContext.previousRetryCount < 10) {
                        return 3 * 1000;
                    }
                    if (retryContext.previousRetryCount < 120) {
                        return 30 * 1000;
                    } else {
                        this.logger.trackLog({logType: LOG_TYPE.FAILED_SOCKET_HOUR});
                        return null;
                    }
                },
            })
            .build();
    }

    start() {
        this.#clearRenewTokenCounter = setInterval(() => {
            this.#refreshTokenCounter = 0;
            this.#isMaxCountRenewTokenReached = false;
        }, 3600000);

        this.handleStartWithDebounce();
    }

    async stop() {
        clearInterval(this.#clearRenewTokenCounter);

        await this.connection
            .stop()
            .then(() => {
                this.logger.printLog({logType: LOG_TYPE.UNMOUNT});
            })
            .catch((error) => {
                this.logger
                    .printLog({logType: LOG_TYPE.CLOSED_AFTER_CONNECTION, error})
                    .trackLog({logType: LOG_TYPE.CLOSED_AFTER_CONNECTION});
            });
    }

    async refreshPairs({eventHandlerPairs, storageShopId}) {
        const {subscribeList} = this.connectionSettings;

        if (this.shopId !== storageShopId) {
            const pairsHandlers = eventHandlerPairs ? eventHandlerPairs : this.eventHandlerPairs;
            await this.unsubscribeShopGroup(subscribeList);
            this.shopId = storageShopId;
            await this.subscribeShopGroup(subscribeList);

            pairsHandlers.forEach((pair) => {
                this.connection.off(pair[0]);
                this.connection.on(pair[0], pair[1]);
            });
        }
    }

    async restart() {
        await this.connection.stop();
        this.connection = this.buildHubConnection();
        this.handleStartWithDebounce();
    }
}
