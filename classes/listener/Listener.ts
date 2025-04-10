import {IListener, SubscribeType, EventDispatchType} from "./IListener";

class Listener implements  IListener {
        private subscribers: Array<SubscribeType>;
        private eventList:  Array<EventDispatchType>;
        private interval: NodeJS.Timeout | undefined;

        constructor() {
            this.subscribers = [];
            this.eventList = [];

            try {
                this.interval = setInterval( () => {
                    if ( this.eventList.length && this.subscribers.length ) {
                        const currentAction: EventDispatchType | undefined = this.eventList.pop()

                        this.subscribers.forEach( ( elm ) => {
                            if ( currentAction?.event === elm.event ) {
                                elm.consumer( currentAction?.payload )
                            }
                        } )
                    }

                }, 100 );
            } catch ( e ) {
                clearInterval(this.interval)
                console.error( e )
            }
        }

        subscribe(consumer: SubscribeType) {
            this.subscribers.push(consumer)
        }

        dispatch(action: EventDispatchType) {
            this.eventList.push(action);
        }
}

export default Listener;