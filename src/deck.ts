import { Card } from "./card";
import { Suit, Value } from "./enums";

export class Deck {
	/** Cards in deck (internal) */
	cards: Card[];

	/** Create cards for new deck */
	private generateCards = (): Card[] => {
		const suits = Object.values(Suit);
		const values = Object.values(Value);

		// Create cards
		const cards: Card[] = suits.reduce<Card[]>((suitsAcc, suit) => {
			// Create all cards of a suit
			const suitCards = values.reduce<Card[]>(
				(valuesAcc, value) => [...valuesAcc, new Card({ suit, value })],
				[]
			);

			return [...suitsAcc, ...suitCards];
		}, []);

		return cards;
	};

	constructor() {
		this.cards = this.generateCards();
		this.shuffle();
	}

	/** The number of cards remaining in the deck. */
	get size(): number {
		return this.cards.length;
	}

	/**
	 * Shuffle the cards array using the Knuth shuffle algorithm.
	 * @see {@link https://bost.ocks.org/mike/shuffle/}
	 */
	private shuffleAlgorithm = (cards: Card[]): Card[] => {
		const cardsCopy = [...cards];

		for (let i = cardsCopy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
		}

		return cardsCopy;
	};

	/**
	 * Shuffles the deck.
	 * @returns Shuffled deck.
	 */
	shuffle = (): Card[] => {
		this.cards = this.shuffleAlgorithm(this.cards);

		return this.cards;
	};

	/**
	 * Removes and returns a single card from the top of the deck.
	 * If `count` is provided returns that number of cards.
	 */
	draw = (count = 1): Card[] => {
		return this.cards.splice(0, count);
	};

	/**
	 * Returns a single card from the top of the deck or at a given place in the deck.
	 * _Note:_ Unlike `draw` this does not remove the card from the deck.
	 */
	peek = (count = 1): Card | undefined => {
		if (count > this.cards.length) {
			return;
		}

		const [card] = this.cards.slice(count - 1, count);

		return card;
	};
}
