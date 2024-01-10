const initialState = [
    {name: 'pricetags', foreground: '#FF5733', background: '#FFC6B8', displayName: 'Shopping'},
    {name: 'pizza', foreground: '#4285F4', background: '#C7DEFF', displayName: 'TakeOut'},
    {name: 'cash', foreground: '#00C851', background: '#9EFFB8', displayName: 'Income'},
    {name: 'train', foreground: '#FFD600', background: '#FFF6B2', displayName: 'Transportation'},
    {name: 'wine', foreground: '#DB4437', background: '#FFC4BE', displayName: 'Drinks'},
    {name: 'gift', foreground: '#673AB7', background: '#D1C4E9', displayName: 'Gift'},
    {name: 'cart', foreground: '#795548', background: '#D7CCC8', displayName: 'Groceries'},
    {name: 'build', foreground: '#009688', background: '#B2DFDB', displayName: 'Repairs'},
    {name: 'logo-vimeo', foreground: '#FF9800', background: '#FFD180', displayName: 'Venmo'},
    //{ foreground: '#607D8B', background: '#CFD8DC' }
]

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}