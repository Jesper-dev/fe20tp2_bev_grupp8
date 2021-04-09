import React from 'react'

export const TotalAssets = (state = 0, action) => {
      switch (action.type) {
        case 'SETTOTALASSETS':
            return action.payload;
        default:
            return state;
    }
}


export const TotalCrypto = (state = 0, action) => {
  switch (action.type) {
        case 'SETTOTALCRYPTO':
            return action.payload;
        default:
            return state;
    }
}

export const TotalStocks = (state = 0, action) => {
   switch (action.type) {
        case 'SETTOTALSTOCKS':
            return action.payload;
        default:
            return state;
    }
}






