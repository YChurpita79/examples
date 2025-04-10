export type EventType = string | number;
export type SubscribeType = { event: EventType, consumer: function }
export type EventDispatchType = {event: EventType, payload: object}

export interface IListener {
     subscribers: Array<SubscribeType>,
     eventList: Array<EventDispatchType>,
     subscribe: function,
     dispatch: function,
}