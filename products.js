/**
 * Bliss Fries & Bakes - Shared Products Dataset
 * 
 * NOTE: Prices and descriptions are DRAFT/PLACEHOLDER values for most
 * items, intended to be replaced once the Google Sheets live-pricing
 * migration is built. "peppered-fish-yam-fries" price (18000) is a known
 * leftover test value confirmed by the client to be fixed via the
 * spreadsheet, not a real price.
 * 
 * "jollof-rice" and "meat-pie" IDs are preserved for cart continuity.
 * "blizo-premium-blend", "blizo-fruit-punch", and "peppered-fish-yam-fries"
 * are NEW ids replacing the old "blizo-premium", "blizo-fruitty", and "yummy"
 * on the homepage — those cards must be updated to use these new ids or
 * cart sync between index.html and store.html will break for these 3 items.
 * "carrot-cucumber" has been removed entirely and replaced on the homepage
 * by "chips-wih-grilled-chicken" (id preserved with its original typo,
 * matching the existing image filename — do not "fix" the id, only the
 * displayed title is corrected to "Chips with Grilled Chicken").
 */

const products = [
    {
        id: "basmatic-rice-with-chicken-sauce",
        title: "Basmati Rice with Chicken Sauce",
        description: "Fragrant basmati rice served with a rich, spiced chicken sauce.",
        price: 4500,
        image: "/images/products/basmatic-rice-with-chicken-sauce.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "bliss-fusion-platter-breakfast",
        title: "Bliss Fusion Platter Breakfast",
        description: "A hearty breakfast platter combining Bliss Fries and Bakes's signature morning favourites.",
        price: 5500,
        image: "/images/products/bliss-fusion-platter-breakfast.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "bread-fried-plantain-egg-sauce-and-pap",
        title: "Bread, Fried Plantain, Egg Sauce and Pap",
        description: "Soft bread, sweet fried plantain, spiced egg sauce and warm pap — breakfast done right.",
        price: 3800,
        image: "/images/products/bread-fried-plantain-egg-sauce-and-pap.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "breakfast-platter-spread",
        title: "Breakfast Platter Spread",
        description: "A generous breakfast spread with a variety of morning staples on one plate.",
        price: 5000,
        image: "/images/products/breakfast-platter-spread.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "fresh-off-the-pot-steaming-jollof",
        title: "Fresh Off the Pot Steaming Jollof",
        description: "Hot, smoky party-style jollof rice, served fresh off the pot.",
        price: 4500,
        image: "/images/products/fresh-off-the-pot-steaming-jollof.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "jollof-beans-and-slice-bread",
        title: "Jollof Beans and Slice Bread",
        description: "Soft jollof-spiced beans paired with slices of soft bread.",
        price: 3000,
        image: "/images/products/jollof-beans-and-slice-bread.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "jollof-rice-balls-with-grilled-fish-and-plantain",
        title: "Jollof Rice Balls with Grilled Fish and Plantain",
        description: "Jollof rice balls served with smoky grilled fish and sweet plantain.",
        price: 6000,
        image: "/images/products/jollof-rice-balls-with-grilled-fish-and-plantain.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "jollof-rice",
        title: "Jollof Rice",
        description: "Smoky party-style rice with tender chicken.",
        price: 4500,
        image: "/images/products/jollof-rice.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "loaded-indomie-stir-fry",
        title: "Loaded Indomie Stir-Fry",
        description: "Indomie noodles stir-fried and loaded with vegetables and protein.",
        price: 3500,
        image: "/images/products/loaded-indomie-stir-fry.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "moi-moi-and-milk-pap",
        title: "Moi Moi and Milk Pap",
        description: "Soft steamed bean pudding served with smooth, warm milk pap.",
        price: 3200,
        image: "/images/products/moi-moi-and-milk-pap.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "noodles",
        title: "Noodles",
        description: "Classic seasoned noodles, quick and satisfying.",
        price: 2500,
        image: "/images/products/noodles.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "pap-and-beans",
        title: "Pap and Beans",
        description: "Smooth warm pap served with well-seasoned beans.",
        price: 2800,
        image: "/images/products/pap-and-beans.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "pasta",
        title: "Pasta",
        description: "Simple, well-seasoned pasta made the Bliss Fries and Bakes way.",
        price: 3200,
        image: "/images/products/pasta.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "white-rice-and-stew-combo",
        title: "White Rice and Stew Combo",
        description: "Fluffy white rice served with rich, savoury tomato stew.",
        price: 4000,
        image: "/images/products/white-rice-and-stew-combo.jpg",
        category: "Breakfast and Quick Meals"
    },
    {
        id: "cheesy-pepper-toast-bites",
        title: "Cheesy Pepper Toast Bites",
        description: "Crispy toast bites loaded with melted cheese and a spicy kick.",
        price: 3000,
        image: "/images/products/cheesy-pepper-toast-bites.jpg",
        category: "Crispy Fries"
    },
    {
        id: "chips-wih-grilled-chicken",
        title: "Chips with Grilled Chicken",
        description: "Golden fries served alongside smoky grilled chicken.",
        price: 5000,
        image: "/images/products/chips-wih-grilled-chicken.jpg",
        category: "Crispy Fries"
    },
    {
        id: "crispy-yam-and-sauce",
        title: "Crispy Yam and Sauce",
        description: "Crispy fried yam served with a bold, flavourful dipping sauce.",
        price: 3500,
        image: "/images/products/crispy-yam-and-sauce.jpg",
        category: "Crispy Fries"
    },
    {
        id: "french-fries-and-pepper-beef",
        title: "French Fries and Pepper Beef",
        description: "Crispy French fries paired with spicy peppered beef.",
        price: 5000,
        image: "/images/products/french-fries-and-pepper-beef.jpg",
        category: "Crispy Fries"
    },
    {
        id: "fried-plantain-and-crispy-vegetable-egg",
        title: "Fried Plantain and Crispy Vegetable Egg",
        description: "Sweet fried plantain served with a crispy vegetable-loaded egg.",
        price: 3500,
        image: "/images/products/fried-plantain-and-crispy-vegetable-egg.jpg",
        category: "Crispy Fries"
    },
    {
        id: "fried-plantain-and-potato-with-pepper-sauce",
        title: "Fried Plantain and Potato with Pepper Sauce",
        description: "Fried plantain and potato served with a spicy pepper sauce.",
        price: 3800,
        image: "/images/products/fried-plantain-and-potato-with-pepper-sauce.jpg",
        category: "Crispy Fries"
    },
    {
        id: "fried-plantain-and-yam-with-pepper-sauce",
        title: "Fried Plantain and Yam with Pepper Sauce",
        description: "Fried plantain and yam served with a bold pepper sauce.",
        price: 3800,
        image: "/images/products/fried-plantain-and-yam-with-pepper-sauce.jpg",
        category: "Crispy Fries"
    },
    {
        id: "peanut-and-plantain-chip",
        title: "Peanut and Plantain Chip",
        description: "Crunchy peanuts paired with sweet plantain chips.",
        price: 2500,
        image: "/images/products/peanut-and-plantain-chip.jpg",
        category: "Crispy Fries"
    },
    {
        id: "pepper-chicken",
        title: "Pepper Chicken",
        description: "Spicy, well-seasoned peppered chicken.",
        price: 4500,
        image: "/images/products/pepper-chicken.jpg",
        category: "Crispy Fries"
    },
    {
        id: "roasted-plantain-with-sauce",
        title: "Roasted Plantain with Sauce",
        description: "Smoky roasted plantain served with a rich dipping sauce.",
        price: 3000,
        image: "/images/products/roasted-plantain-with-sauce.jpg",
        category: "Crispy Fries"
    },
    {
        id: "spiced-potato-fries-with-meat",
        title: "Spiced Potato Fries with Meat",
        description: "Seasoned potato fries served with tender spiced meat.",
        price: 4800,
        image: "/images/products/spiced-potato-fries-with-meat.jpg",
        category: "Crispy Fries"
    },
    {
        id: "blizo-zobo-drink",
        title: "Blizo Zobo Drink",
        description: "Bliss Fries and Bakes's signature take on the classic hibiscus zobo drink.",
        price: 2000,
        image: "/images/products/blizo-zobo-drink.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "parfait-and-palmwine",
        title: "Parfait and Palmwine",
        description: "A refreshing parfait paired with chilled palmwine.",
        price: 3500,
        image: "/images/products/parfait-and-palmwine.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "parfait",
        title: "Parfait",
        description: "Layers of creamy yoghurt, granola and fresh fruit.",
        price: 3000,
        image: "/images/products/parfait.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "plain-zobo",
        title: "Plain Zobo",
        description: "Chilled traditional hibiscus zobo drink.",
        price: 1800,
        image: "/images/products/plain-zobo.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "smothie",
        title: "Smoothie",
        description: "A refreshing blend of fresh tropical fruits.",
        price: 2800,
        image: "/images/products/smothie.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "tiger-nut",
        title: "Tiger Nut",
        description: "Chilled, naturally sweet tiger nut drink.",
        price: 2000,
        image: "/images/products/tiger-nut.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "agidi-pepper-soup",
        title: "Agidi Pepper Soup",
        description: "Soft agidi served with a warm, spicy pepper soup.",
        price: 4500,
        image: "/images/products/agidi-pepper-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "beef-pepper-soup",
        title: "Beef Pepper Soup",
        description: "Tender beef simmered in a warm, spicy pepper soup broth.",
        price: 5000,
        image: "/images/products/beef-pepper-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "egusi-soup",
        title: "Egusi Soup",
        description: "Rich melon seed soup packed with assorted meat and fish.",
        price: 5500,
        image: "/images/products/egusi-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "nkwobi",
        title: "Nkwobi",
        description: "Spiced cow foot delicacy simmered in a rich palm oil sauce.",
        price: 6500,
        image: "/images/products/nkwobi.jpg",
        category: "Local Delicacies"
    },
    {
        id: "ogbono-soup",
        title: "Ogbono Soup",
        description: "Silky mango seed soup enriched with stockfish and tender meat.",
        price: 5500,
        image: "/images/products/ogbono-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "oha-soup",
        title: "Oha Soup",
        description: "Traditional oha leaf soup, rich and full of flavour.",
        price: 5500,
        image: "/images/products/oha-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "okro-soup",
        title: "Okro Soup",
        description: "Fresh okro soup, light yet packed with flavour.",
        price: 5000,
        image: "/images/products/okro-soup.jpg",
        category: "Local Delicacies"
    },
    {
        id: "bliss-peanuts",
        title: "Bliss Peanuts",
        description: "Freshly roasted, well-seasoned peanuts.",
        price: 2000,
        image: "/images/products/bliss-peanuts.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "chin-chin-stocked-ready",
        title: "Chin Chin, Stocked & Ready",
        description: "Crunchy, freshly made chin chin, stocked and ready to enjoy.",
        price: 2500,
        image: "/images/products/chin-chin-stocked-ready.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "crunchy-chin-chin-fresh-batch",
        title: "Crunchy Chin Chin, Fresh Batch",
        description: "A fresh batch of crunchy, golden fried chin chin.",
        price: 2500,
        image: "/images/products/crunchy-chin-chin-fresh-batch.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "crunchy-peanut",
        title: "Crunchy Peanut",
        description: "Crunchy, lightly spiced roasted peanuts.",
        price: 2000,
        image: "/images/products/crunchy-peanut.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "egg-roll",
        title: "Egg Roll",
        description: "Soft dough wrapped around a boiled egg, deep fried to golden perfection.",
        price: 1500,
        image: "/images/products/egg-roll.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "finest-cake",
        title: "Finest Cake",
        description: "A soft, finely baked cake made with the finest ingredients.",
        price: 9500,
        image: "/images/products/finest-cake.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "meat-pie",
        title: "Meat Pie",
        description: "Golden flaky crust with a hearty minced beef and potato filling.",
        price: 4500,
        image: "/images/products/meat-pie.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "puff-puff-spring-rolls-samosa-and-peppered-meat",
        title: "Puff Puff, Spring Rolls, Samosa and Peppered Meat",
        description: "An assorted pack of puff-puff, spring rolls, samosa and peppered meat.",
        price: 6000,
        image: "/images/products/puff-puff-spring-rolls-samosa-and-peppered-meat.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "samosa-spring-rolls-and-pepper-chicken",
        title: "Samosa, Spring Rolls and Pepper Chicken",
        description: "A savoury combo of samosa, spring rolls and peppered chicken.",
        price: 6000,
        image: "/images/products/samosa-spring-rolls-and-pepper-chicken.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "small-chops-2",
        title: "Small Chops 2",
        description: "A generous assortment of Bliss Fries and Bakes's favourite small chops.",
        price: 6500,
        image: "/images/products/small-chops-2.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "small-chops",
        title: "Small Chops",
        description: "Crispy spring rolls, samosas, puff-puff and spicy gizzard bites.",
        price: 6000,
        image: "/images/products/small-chops.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "the-ultimate-grill-small-chops-box",
        title: "The Ultimate Grill & Small Chops Box",
        description: "A premium grill and small chops box, perfect for sharing at any event.",
        price: 8500,
        image: "/images/products/the-ultimate-grill-small-chops-box.jpg",
        category: "Snacks & Bakes"
    },
    {
        id: "blizo-premium-blend",
        title: "Blizo Premium Blend",
        description: "Bliss Fries and Bakes's premium Blizo blend, elevated for a richer, more refined taste.",
        price: 5500,
        image: "/Food-IMG/Blizo Premium.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "blizo-fruit-punch",
        title: "Blizo Fruit Punch",
        description: "A refreshing fruity twist on Bliss Fries and Bakes's signature Blizo blend.",
        price: 4500,
        image: "/Food-IMG/Blizo-Fruitty.jpg",
        category: "Drinks, Parfaits & Refreshment"
    },
    {
        id: "peppered-fish-yam-fries",
        title: "Peppered Fish with Yam Fries and Pepper Sauce",
        description: "Crispy peppered fish served with golden yam fries and a bold pepper sauce.",
        price: 18000,
        image: "/Food-IMG/Yummy.jpg",
        category: "Crispy Fries"
    }
];