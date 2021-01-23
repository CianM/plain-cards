import { Card } from "../card";
import { Suit, Value } from "../enum";

test("should create a new card", () => {
    const suit = Suit.SPADE;
    const value = Value.A;

    expect(new Card({ suit, value })).toBeInstanceOf(Card);
});

test("should generate an ID for the card", () => {
    const suit = Suit.SPADE;
    const value = Value.A;

    const card = new Card({ suit, value });

    expect(card.id).toBe(`${value}-${suit}`);
})