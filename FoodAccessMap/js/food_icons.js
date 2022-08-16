var FoodIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
    },
});
var convIcon = new FoodIcon({
    iconUrl:
        'https://raw.githubusercontent.com/CodeForPittsburgh/food-access-map/master/app/images/convenience_store.png',
});
var growIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/fresh_access.png?raw=true',
});
var superIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/supermarket.png?raw=true',
});
var otherIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/other.png?raw=true',
});
var farmerIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/farmers_market_02.png?raw=true',
});
var summerIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/summer_food.png?raw=true',
});
var bankIcon = new FoodIcon({
    iconUrl:
        'https://github.com/CodeForPittsburgh/food-access-map/blob/master/app/images/food_bank_01.png?raw=true',
});

function getIcon(type) {
    switch(type) {
        case "supermarket":
            return superIcon;
            break;
        case 'convenience store':
            return convIcon;
            break;
        case 'Grow PGH Garden':
            return growIcon;
            break;
        case "farmer's market":
            return farmerIcon;
            break;
        case "summer meal site":
            return summerIcon;
            break;
        case "food bank site":
            return bankIcon;
            break;
        default:
            return otherIcon;
            break;
    }
}