/**
 * Bliss Fries & Bakes - Shared Products Dataset
 * 
 * NOTE FOR FUTURE DEVELOPMENT:
 * index.html currently uses hardcoded HTML cards in the "Today's Customer Favourites" section.
 * If index.html is ever converted to data-driven rendering, it can import/include this file directly.
 * The first 4 product IDs below ("jollof-rice", "fried-rice", "meat-pie", "pounded-yam-egusi")
 * match the homepage's product IDs exactly to ensure seamless localStorage cart synchronization across pages.
 */

const products = [
    {
        id: "jollof-rice",
        title: "Jollof Rice",
        description: "Smoky party-style rice with tender chicken.",
        price: 4500,
        image: "/Food-IMG/IMG-20260429-WA0026.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "fried-rice",
        title: "Fried Rice",
        description: "Colourful vegetables, tender chicken and bold savoury flavours in every bite.",
        price: 9500,
        image: "/Food-IMG/Fried_Rice.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "meat-pie",
        title: "Meat Pie",
        description: "Golden flaky crust with a hearty minced beef and potato filling.",
        price: 4500,
        image: "/Food-IMG/IMG-20260429-WA0032.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "pounded-yam-egusi",
        title: "Pounded Yam & Egusi",
        description: "Soft pounded yam with rich melon soup packed with assorted meat.",
        price: 5000,
        image: "/Food-IMG/image 53.png",
        category: "Soups & Sides"
    },
    {
        id: "blizo-premium",
        title: "Blizo Premium Combo",
        description: "Special signature combo pack with rich pastries and sides.",
        price: 5500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "carrot-cucumber-chicken",
        title: "Carrot & Cucumber + Chicken",
        description: "Fresh crunchy salad served with seasoned grilled chicken.",
        price: 4500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "blizo-fruitty",
        title: "Blizo-Fruitty Smoothie",
        description: "Refreshing blend of fresh tropical fruits and berries.",
        price: 4500,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "yummy-cake-box",
        title: "Yummy Celebration Cake",
        description: "Decadent multi-layered frosted celebration cake.",
        price: 18000,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "peppered-snail",
        title: "Peppered Snail & Plantain",
        description: "Spicy Lagos-style peppered snails served with sweet fried dodo.",
        price: 8500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "assorted-small-chops",
        title: "Assorted Small Chops Pack",
        description: "Crispy spring rolls, samosas, puff-puff and spicy gizzard bites.",
        price: 6000,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "chocolate-fudge-cake",
        title: "Chocolate Fudge Delight",
        description: "Rich dark chocolate cake layered with creamy cocoa fudge frosting.",
        price: 15000,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "zobo-special-drink",
        title: "Chilled Hibiscus Zobo Drink",
        description: "Traditional hibiscus tea infused with pineapple, ginger and mint.",
        price: 2000,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "native-rice-sauce",
        title: "Ofada Rice & Ayamase Sauce",
        description: "Fragrant local unpolished rice served with green pepper bleached oil sauce.",
        price: 6500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "efo-riro-semo",
        title: "Efo Riro & Semolina",
        description: "Rich spinach vegetable stew made with smoked fish and assorted meat.",
        price: 5500,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "red-velvet-cake",
        title: "Classic Red Velvet Cake",
        description: "Moist crimson sponge cake layered with smooth cream cheese icing.",
        price: 16500,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "chicken-pie",
        title: "Special Chicken Pie",
        description: "Golden buttery pastry shell filled with seasoned chicken chunks and veggies.",
        price: 4500,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "fresh-pineapple-juice",
        title: "Fresh Pineapple Ginger Juice",
        description: "100% freshly squeezed ripe pineapples blended with a warm ginger kick.",
        price: 2500,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "white-rice-stew",
        title: "White Rice & Beef Tomato Stew",
        description: "Fluffy white rice served with thick savory tomato sauce and fried beef.",
        price: 4000,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "ogbono-soup-amala",
        title: "Ogbono Soup with Amala",
        description: "Silky mango seed soup enriched with stockfish, dry fish and tender beef.",
        price: 5500,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "sausage-roll-pack",
        title: "Gourmet Sausage Rolls (Pack of 3)",
        description: "Flaky pastry wrapped around savory seasoned beef sausage filling.",
        price: 3500,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "vanilla-sponge-cake",
        title: "Vanilla Birthday Sponge Cake",
        description: "Light fluffy vanilla sponge with sweet buttercream frosting.",
        price: 14000,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "creamy-parfait-cup",
        title: "Fruit & Yogurt Parfait",
        description: "Creamy Greek yogurt layered with granola, honey and fresh seasonal berries.",
        price: 3500,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "crispy-chicken-fries",
        title: "Crispy French Fries & Fried Chicken",
        description: "Golden seasoned potato fries served with crunchy deep-fried chicken leg.",
        price: 5000,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "afang-soup-fufu",
        title: "Afang Soup & Cassava Fufu",
        description: "Hearty Calabar-style wild spinach soup loaded with periwinkles and beef.",
        price: 6000,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "glazed-donuts-box",
        title: "Assorted Glazed Donuts (Box of 4)",
        description: "Soft fluffy donuts with chocolate, vanilla glaze and rainbow sprinkles.",
        price: 4800,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "strawberry-cheesecake",
        title: "Strawberry Glaze Cheesecake",
        description: "Creamy baked cheesecake topped with tangy fresh strawberry compote.",
        price: 17500,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "iced-tropical-lemonade",
        title: "Chilled Tropical Lemonade",
        description: "Zesty freshly squeezed lemon juice mixed with passionfruit syrup and ice.",
        price: 2200,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "yam-porridge-asaro",
        title: "Yam Porridge (Asaro)",
        description: "Rich pottage yam cooked in palm oil tomato stew with dry fish and vegetables.",
        price: 4500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "banga-soup-starch",
        title: "Banga Soup & Delta Starch",
        description: "Traditional palm fruit soup aromatic with local spices, dry fish and catfish.",
        price: 6500,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "puff-puff-bucket",
        title: "Hot Puff-Puff (Bucket of 20)",
        description: "Freshly fried sweet golden dough balls dusted with light cinnamon sugar.",
        price: 3000,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "carrot-walnut-cake",
        title: "Spiced Carrot & Walnut Cake",
        description: "Moist cinnamon carrot cake packed with crunchy walnuts and cream icing.",
        price: 16000,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "creamy-mango-smoothie",
        title: "Fresh Mango Passionfruit Smoothie",
        description: "Thick velvety mango blend with passionfruit seeds and chilled almond milk.",
        price: 3000,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "spaghetti-bolognese-chicken",
        title: "Spicy Stir-fry Spaghetti & Chicken",
        description: "Lagos party spaghetti tossed in peppers, bell peppers and grilled chicken.",
        price: 4800,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "nsala-soup-pounded-yam",
        title: "Ofe Nsala (White Soup) & Yam",
        description: "Peppery Igbo white soup cooked with fresh catfish, utazi leaves and pounded yam.",
        price: 7000,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "scotch-egg-delight",
        title: "Crispy Golden Scotch Eggs (Pack of 2)",
        description: "Boiled eggs encased in savory seasoned sausage meat and golden breadcrumbs.",
        price: 3200,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    },
    {
        id: "cookies-cream-cake",
        title: "Cookies & Cream Layer Cake",
        description: "Decadent Oreo-infused vanilla sponge with crushed cookie buttercream.",
        price: 17000,
        image: "/images/products/placeholder.jpg",
        category: "Cakes"
    },
    {
        id: "watermelon-mint-cooler",
        title: "Chilled Watermelon Mint Refresher",
        description: "Hydrating fresh watermelon juice infused with crushed mint leaves.",
        price: 2000,
        image: "/images/products/placeholder.jpg",
        category: "Drinks"
    },
    {
        id: "gizdodo-special",
        title: "Peppered Gizdodo Special",
        description: "Delicious stir-fried combination of spicy peppered chicken gizzards and sweet dodo.",
        price: 5500,
        image: "/images/products/placeholder.jpg",
        category: "Everyday Nigerian dishes"
    },
    {
        id: "goat-meat-pepper-soup",
        title: "Spicy Goat Meat Pepper Soup",
        description: "Warm soothing broth seasoned with traditional pepper soup spices and tender goat meat.",
        price: 5000,
        image: "/images/products/placeholder.jpg",
        category: "Soups & Sides"
    },
    {
        id: "chin-chin-crunch-jar",
        title: "Crunchy Sweet Chin Chin (1kg Jar)",
        description: "Crispy golden fried pastry bites made with rich nutmeg and real butter.",
        price: 4000,
        image: "/images/products/placeholder.jpg",
        category: "Pastries & Snacks"
    }
];
