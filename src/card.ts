import { Suit, Value } from "./enums";

export class Card {
	id: string;
	suit: Suit;
	value: Value;

	constructor({ suit, value }: { suit: Suit; value: Value }) {
		this.suit = suit;
		this.value = value;

		this.id = `${this.value}-${this.suit}`;
	}
}
