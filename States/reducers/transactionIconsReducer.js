const initialState = [
    {name: 'pricetags', color: 'yellow'},
    {name: 'pizza', color: 'red'},
    {name: 'cash', color: 'green'},
    {name: 'train', color: 'blue'},
    {name: 'wine', color: 'purple'},
    {name: 'gift', color: 'pink'},
    {name: 'cart', color: 'white'},
    {name: 'build', color: 'white'},
    {name: 'logo-vimeo', color: 'white'},
]

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}