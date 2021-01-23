import { Card } from "./card";
import { Suit, Value } from "./enum";

export class Deck {

    /** Cards in deck (internal) */
    cards: Card[];

    /** Create cards for new deck */
    private generateCards = (): Card[] => {
        const suits = Object.values(Suit);
        const values = Object.values(Value);

        // Create cards
        const cards: Card[] = suits.reduce<Card[]>(
            (suitsAcc, suit) => {

                // Create all cards of a suit
                const suitCards = values.reduce<Card[]>(
                    (valuesAcc, value) => [...valuesAcc, new Card({ suit, value })],
                    []
                );

                return [...suitsAcc, ...suitCards];
            },
            []
        );

        return cards;
    }

    constructor() {
        this.cards = this.generateCards();
        this.shuffle()
    }

    /** 
     * Shuffle the cards array using the Knuth shuffle algorithm.
     * @see {@link https://bost.ocks.org/mike/shuffle/}
     * @private
     * @method
     * @returns {Card[]} Shuffled copy of cards input.
     */
    private shuffleAlgorithm = (cards: Card[]): Card[] => {
        const cardsCopy = [...cards];

        for (let i = cardsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
        }

        return cardsCopy;
    }
    
    /**
     * Shuffles the deck.
     * @method
     * @returns Shuffled deck.
     */
    shuffle = (): Card[] => {
        this.cards = this.shuffleAlgorithm(this.cards);

        return this.cards
    }
}