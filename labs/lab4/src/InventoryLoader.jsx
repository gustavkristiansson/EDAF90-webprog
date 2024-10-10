const categories = ['foundations', 'proteins', 'extras', 'dressings']

export default async function inventoryLoader() {
    const inventory = {}

    await Promise.all([
        fetchIngredients('foundations'),
        fetchIngredients('proteins'),
        fetchIngredients('extras'),
        fetchIngredients('dressings')
    ]).then(([foundations, proteins, extras, dressings]) => {
        inventory['foundations'] = foundations
        inventory['proteins'] = proteins
        inventory['extras'] = extras
        inventory['dressings'] = dressings
    })

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return inventory;
}

async function fetchIngredients(category) {
    const options = await fetchIngredient(category)
    const values = await Promise.all(options.map(async option => {
        const details = await fetchIngredient(`${category}`, option)
        return {
            [option] : {
                name: option,
                ...details
            }
        };
    }));

   return values.reduce((accumulator, current) => ({...accumulator, ...current}), {});
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