const koe = (el) => {
    let otiShto = ''
    if (el === 'vodka') {
        otiShto += el
    }
    if (el === 'bira') {
        otiShto += 'vidka i Bira'
    }
    return otiShto
}

console.log(koe('bira'))
