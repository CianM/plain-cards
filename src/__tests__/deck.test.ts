import { isSameCardOrder } from "./utils";
import { Card } from "../card";
import { Deck } from "../deck";
import { Suit, Value } from "../enums";

describe("Creating a new deck", () => {
	it("should create a new deck", () => {
		expect(new Deck()).toBeInstanceOf(Deck);
	});

	it("should have a list of cards", () => {
		const deck = new Deck();

		expect(deck.cards).toBeDefined();
		expect(deck.cards[0]).toBeInstanceOf(Card);
	});

	it("should have 52 cards", () => {
		const deck = new Deck();

		expect(deck.cards.length).toBe(52);
	})

	it("should have one card of every value for each suit", () => {
		const deck = new Deck();

		const cardsBySuit = deck.cards.reduce(
			(acc, card) => {
				return {
					...acc,
					[card.suit]: [...acc[card.suit], card.value]
				}
			},
			{ [Suit.CLUB]: [], [Suit.DIAMOND]: [], [Suit.HEART]: [], [Suit.SPADE]: [] }
		);


		// Check that each suit has one of each value
		const containsOneOfEachValue = (suitCardValues: string[]) => {
			const values = Object.values(Value);

			expect(suitCardValues).toHaveLength(13);
			expect(values.every(value => suitCardValues.includes(value)))
		} 

		containsOneOfEachValue(cardsBySuit[Suit.CLUB]);
		containsOneOfEachValue(cardsBySuit[Suit.DIAMOND]);
		containsOneOfEachValue(cardsBySuit[Suit.HEART]);
		containsOneOfEachValue(cardsBySuit[Suit.SPADE]);
	})

	it("should order the cards randomly", () => {
		const { cards: cards1 } = new Deck();
		const { cards: cards2 } = new Deck();

		// Check that not all cards are in the same order
		const isDifferentOrder = !isSameCardOrder(cards1, cards2);

		expect(isDifferentOrder).toBe(true);
	});
});

describe("Shuffling cards", () => {
	it("should should shuffle the cards in the deck", () => {
		const deck = new Deck();

		const originalCardOrder = deck.cards;

		const shuffledCardOrder = deck.shuffle();

		// Check that not all cards are in the same order
		const isDifferentOrder = !isSameCardOrder(originalCardOrder, shuffledCardOrder);

		expect(isDifferentOrder).toBe(true);
	});
});

describe("Drawing cards", () => {
	it("should return a single card from the top of the deck", () => {
		const deck = new Deck();
	
		const topCard = deck.cards.slice(0, 1);
	
		const drawCard = deck.draw();
	
		expect(topCard).toEqual(drawCard);
	});

	it("should remove the drawn card from the deck", () => {
		const deck = new Deck();

		const originalDeckSize = deck.cards.length;

		// Remove one card from the deck
		deck.draw();

		expect(deck.cards.length).toBe(originalDeckSize - 1)
	});

	it("should remove five cards from the deck", () => {
		const deck = new Deck();

		const cards = deck.cards;

		const originalDeckSize = cards.length;
		const topFiveCards = cards.slice(0, 5);

		const drawnCards = deck.draw(5);

		expect(topFiveCards).toEqual(drawnCards);
		expect(deck.cards.length).toBe(originalDeckSize - 5);
	})

	it("should remove all cards from the deck", () => {
		const deck = new Deck();

		const drawnCards = deck.draw(100);

		expect(deck.cards).toHaveLength(0);
		expect(drawnCards).toHaveLength(52);
	})
})

describe("Peeking cards", () => {
	it("should show the top card in the deck", () => {
		const deck = new Deck();

		const topCard = deck.cards[0];
		const originalDeckSize = deck.cards.length;
		
		const peekCard = deck.peek();

		expect(peekCard).toEqual(topCard);

		// Card should not be removed from the deck
		expect(deck.cards).toHaveLength(originalDeckSize);
	})

	it("should show the card at a given place in the deck", () => {
		const deck = new Deck();

		const fifthCard = deck.cards[4];
		const originalDeckSize = deck.cards.length;
		
		const peekCard = deck.peek(5);

		expect(peekCard).toEqual(fifthCard);

		// Card should not be removed from the deck
		expect(deck.cards).toHaveLength(originalDeckSize);
	})
})

describe("Remaining cards", () => {
	it("should keep count of the remaining cards", () => {
		const deck = new Deck();

		expect(deck.size).toBe(52);

		deck.draw();

		expect(deck.size).toBe(51);
	})
})
