interface Params {
    style: 'decimal' // or 'currency' for currency formatting
    currency: 'USD' // currency code if style is 'currency'
    minimumFractionDigits: 2
    maximumFractionDigits: 2
  }
  
  const formatNumber = (num: number, options?: Params) => {
    if (!num) {
      return 0
    } // terminate early
    if (num === 0) {
      return '0'
    } // terminate early
    const abbreviations = ['', 'K', 'M', 'B', 'T']
  
    // Default options for number formatting
    const defaultOptions = {
      style: 'decimal', // or 'currency' for currency formatting
      currency: 'USD', // currency code if style is 'currency'
      minimumFractionDigits: 0, // Updated to remove trailing zeros
      maximumFractionDigits: 20, // Set a high maximum to handle very small fractions
    }
  
    // Merge user-defined options with default options
    const mergedOptions = { ...defaultOptions, ...options }
  
    // Determine the appropriate abbreviation index
    let abbreviationIndex = 0
    while (num >= 1000 && abbreviationIndex < abbreviations.length - 1) {
      num /= 1000
      abbreviationIndex++
    }
  
    // Format the number with the appropriate abbreviation
    const formattedNumber = num.toLocaleString(undefined, mergedOptions)
    const abbreviation = abbreviations[abbreviationIndex]
  
    return `${formattedNumber} ${abbreviation}`
  }
  
  export default formatNumber
  