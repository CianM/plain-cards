import { Card } from "../card";

/** Check if all cards are in the same order */
export const isSameCardOrder = (cards1: Card[], cards2: Card[]): boolean => {
	// Check if IDs of cards in same position are identical
	return cards1.every((card, index) => card.id === cards2[index].id);
};
