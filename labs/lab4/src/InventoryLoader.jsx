const categories = ['foundations', 'proteins', 'extras', 'dressings']

export default async function inventoryLoader() {
    const inventory = {}

    const categoryList = categories.map(async category => {
        const options = await fetchIngredient(category);
        //for (const option of options) {
        inventory[category] = [];
        //}
        return { category, options }
    });

    const promiseList = await Promise.all(categoryList);

    //console.log(inventory, "inventory1");

    //console.log(promiseList, "PromiseList");

    // for (const category of promiseList) {
    //     const options = await fetchIngredient(category);
    //     inventory[category] = {};

    //     for (const name of options) {
    //         const ingredients = await fetchIngredient(category, name);
    //         inventory[category][name] = ingredients;
    //     }
    // }

    await Promise.all(promiseList.map(async ({ category, options }) => {
        const ingredientsList = await Promise.all(options.map(name => fetchIngredient(category, name)));

        //console.log(ingredients, "IngredientList")

        ingredientsList.forEach(ingredient => {
            for (const option of options) {
                inventory[category][option] = ingredient;
            }
        });
        //ingredientsList.forEach(ingredient => { inventory[category] = { ...ingredient } })
    }));

    // await new Promise(resolve => setTimeout(resolve, 500));
    //console.log(inventory);
    console.log(inventory.dressings);
    return inventory;
}

async function safeFetchJson(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${url} returned status ${response.status}`);
            }
            return response.json();
        });
}

async function fetchIngredient(type, ingredient) {
    return ingredient ?
        safeFetchJson(`http://localhost:8080/${type}/${ingredient}`) :
        safeFetchJson(`http://localhost:8080/${type}`);
}