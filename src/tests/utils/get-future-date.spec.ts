import { expect, test } from 'vitest'
import { getFutureDate } from './get-future-date'

test('increases date with one year', () => {
    const yaer = new Date().getFullYear()

    expect(getFutureDate('${year}-11-18'.getFullYear()).toEqual(2023))
})