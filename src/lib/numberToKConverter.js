import React from 'react'

const numberToKConverter = (num) => {
    if (num >= 1000) {
        return (num/1000).toFixed(1) + "k"
    }
    else {
        return num
    }
}

export default numberToKConverter