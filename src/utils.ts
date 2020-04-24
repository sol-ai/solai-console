export const shortenString = (str: string, size: number): string => {
  return str.slice(0, Math.min(size, str.length))
}

export const shortenId = (id: string): string => shortenString(id, 8)
