/**
 * Returns a random item from an array or null if the array is empty.
 *
 * @param someArray
 * @returns Random item in the array.
 */
export function randomItem<T> (someArray: T[]): T|null {
  if (someArray.length === 0) {
    return null
  }

  return someArray[Math.floor(Math.random() * someArray.length)]
}

/**
 * Returns a random set of items from an array with "max" being the maximum length of the array returned.
 *
 * @param someArray - Array to get random items from.
 * @param max - The max number of random items to return, you can get less than the max if "condition" is provided
 * and returns false.
 * @param condition - Condition will be evaluated to see if the random item already exists as a random item. This helps
 * prevent us from returning duplicates.
 * @returns a random subset of "someArray"
 */
export function randomItems<T> (someArray: T[], max: number, condition?: (existingItem: T, newItem: T) => boolean): T[] {
  if (max === 0) {
    return []
  }

  const amount = Math.floor(Math.random() * max) + 1
  let randomItems: T[] = []
  for (let i = 0; i < amount; i++) {
    const newRandomItem = randomItem(someArray)
    if (newRandomItem === null) {
      continue
    }

    if (randomItems.length === 0 || condition === undefined || randomItems.find(randomItem => condition(randomItem, newRandomItem)) === undefined) {
      randomItems = [...randomItems, newRandomItem]
    }
  }

  return randomItems
}
