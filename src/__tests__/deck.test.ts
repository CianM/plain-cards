import { Card } from "../card";
import { Deck } from "../deck";

test("should create a new deck", () => {
    expect(new Deck()).toBeInstanceOf(Deck);
});

test("should have a list of cards", () => {
    const deck = new Deck();

    expect(deck.cards).toBeDefined();
    expect(deck.cards[0]).toBeInstanceOf(Card);
});

test("should order the cards randomly", () => {
    const { cards: cards1 } = new Deck();
    const { cards: cards2 } = new Deck();

    // Check that not all cards are in the same order
    const isDifferentOrder = cards1.some((card, index) => card.id !== cards2[index].id);

    expect(isDifferentOrder).toBe(true);
});