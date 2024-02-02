export interface WsMessage<T> {
	type: number;
	data: T;
}