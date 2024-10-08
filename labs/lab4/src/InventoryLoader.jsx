const categories = ['foundations', 'proteins', 'extras', 'dressings']

export default async function inventoryLoader() {
    const inventory = {}

    const categoryList = categories.map(async category => {
        const options = await fetchIngredient(category);
        inventory[category] = [];
        return { category, options }
    });

    const promiseList = await Promise.all(categoryList);

    await Promise.all(promiseList.map(async ({ category, options }) => {
        const ingredientsList = await Promise.all(options.map(name => fetchIngredient(category, name)));

        ingredientsList.forEach(ingredient => {
            for (var option of options) {
                inventory[category][option] = ingredient;
            }
        });
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));
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