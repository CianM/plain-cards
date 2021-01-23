# Plain Cards

Plain Cards is a small Typescript library for representing a deck of plain (playing) cards for use in card game apps or wherever.

## Installation
```bash
npm install --save plain-cards
```

## Usage

### Creating a new deck
Return a new instance of the `Deck` with shuffled cards:

```typescript
import Deck from "plain-cards";

const deck = new Deck();
```

### Properties
| Name    | Type     | Description                            |
| ------- | -------- | -------------------------------------- |
| `cards` | `Card[]` | List of cards remaining in the deck.   |
| `size`  | `number` | Number of cards remaining in the deck. |

### Methods
| Name | Signature | Description |
| --- | --- | --- |
| `shuffle` | `() => Card[]` | Shuffles the cards within the deck. Also returns the newly shuffled cards. |
| `draw` | `(count = 1) => Card[]` | Removes and returns the top card from the deck. Passing a number for `count` will return that many cards. |
| `peek` | `(count = 1) => Card` | Returns the card at the top of the deck. Passing a number for `count` will return that card in the order of the deck. _Note:_ Unlike `draw` this does not remove the card from the deck. |
| `cut` | `(count: number) => Card[]` | Cut the deck at a card given by `count`. Also returns the new order of the cards | 