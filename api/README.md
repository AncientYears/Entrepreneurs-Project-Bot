# API Returns

## universal
```
zumza-NaN
    error: zumza-NaN
    status: 400
    NaN: <NaN>
```
```
zumza-businessTypeNotValid
    error: zumza-businessTypeNotValid
    status: 400
    ableTypes: <[None | businessTypes]>
```

## produce
```
zumza-notEnoughMaterial
    error: zumza-notEnoughMaterial
    status: 400
    missing: <[ [n, material] ]>
```
```
zumza-200    
    status 200
    stats : <stats>
    created: <stats.creation>
    cost: < [n, material | null] >
```

## buy
```
zumza-itemNotValidOrNotBuyable
    error: zumza-itemNotValidOrNotBuyable
    status: 400
    NaI: < Invalid Item, String >
```
```
zumza-notEnoughMoney
    error: zumza-notEnoughMoney
    status: 400
    missing: < Missing, Number >
```
```
zumza-200    
    status 200
    stats : <stats>
    bought: < [n, material] >
    cost: < price  >
```

## harvest
```
zumza-produceNotFinished
    status: 400
    error : 'zumza-produceNotFinished'
    timeLeft: <Time Left, int < -1 if not produceing>>
```
```
zumza-businessTypeNotValid
    universal
```

```
zumza-notEnoughMaterial
    error: zumza-notEnoughMaterial
    status: 400
    missing: <[ [n, material] ]>
```

```
zumza-200    
    status 200
    stats : <stats>
    harvested: < [n, material] >
    cost: < price  >
    luck: <luck, %>
```