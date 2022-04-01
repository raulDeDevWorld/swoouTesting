


function rob(v1, v2) {

    const residuo = []
    const cifra = []
    const space = []
    const zero = []
    const val1 = v2 !== '' && v2 == 0 ? '5' : v1
 

    function robb (v1, v2) {

        const vl1 = v1.length
        const vl2 = v2.length

        function alg(v1, v2, c, d) {

            const cifras = v1.substring(0, d) >= v2 ? v1.substring(0, d) : v1.substring(0, d + 1)
            const q = Math.trunc(cifras / v2)
            const r = cifras - (q * v2)
            
            const z = v1 > v2 && r > 0 && d > (`${r}`).length ? '0' :''
     
            zero.push(z)
            residuo.push(r)
            cifra.push(cifras)
            space.push( c - cifras.length)
            console.log(c - cifras.length)
           
            cifras.length < c ? robb(`${r}${v1.substring(cifras.length, c)}`, v2) : ''
        }
        alg(v1, v2, vl1, vl2)
    }
    robb(val1, v2)
    cifra.shift()
    space.push(0)
    const item = residuo.pop()
    cifra.push(item)
    
    const obj = {
        cifra,
        space,
        zero,
    }

    return obj 
}

export {rob}
