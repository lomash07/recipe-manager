-- Insert sample recipes and ingredients
-- src/main/resources/data.sql

-- Recipe 1: Classic Pancakes (Easy)
INSERT INTO recipes (id, title, difficulty, instructions, creator_name, created_date)
VALUES (1, 'Classic Pancakes', 'EASY',
        '1. In a large bowl, mix the flour, sugar, baking powder, and salt.\n
        2. In another bowl, whisk together the milk, eggs, and melted butter.\n
        3. Pour the wet ingredients into the dry ingredients and stir until just combined (batter should be slightly lumpy).\n
        4. Heat a lightly oiled griddle or frying pan over medium-high heat.\n
        5. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.\n
        6. Cook until bubbles form on the surface, then flip and cook until browned on the other side.\n
        7. Serve hot with maple syrup, butter, or your favorite toppings.',
        'John Smith', '2023-01-15 10:30:00');

INSERT INTO ingredients (recipe_id, ingredient_name)
VALUES
    (1, '1 1/2 cups all-purpose flour'),
    (1, '3 1/2 teaspoons baking powder'),
    (1, '1 teaspoon salt'),
    (1, '1 tablespoon white sugar'),
    (1, '1 1/4 cups milk'),
    (1, '1 egg'),
    (1, '3 tablespoons butter, melted');

-- Recipe 2: Spaghetti Carbonara (Medium)
INSERT INTO recipes (id, title, difficulty, instructions, creator_name, created_date)
VALUES (2, 'Spaghetti Carbonara', 'MEDIUM',
        '1. Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente (about 8-10 minutes).\n
        2. Meanwhile, in a large skillet, cook the pancetta over medium heat until crispy (about 5 minutes).\n
        3. In a bowl, whisk together the eggs, egg yolks, and grated cheese.\n
        4. Drain the pasta, reserving 1/2 cup of the pasta water.\n
        5. Working quickly, add the hot pasta to the skillet with the pancetta, then remove from heat.\n
        6. Pour the egg mixture over the pasta, stirring continuously to create a creamy sauce (the residual heat will cook the eggs).\n
        7. Add a splash of the reserved pasta water if needed to thin the sauce.\n
        8. Season with black pepper and serve immediately, topped with extra cheese and parsley.',
        'Maria Rossi', '2023-02-20 18:45:00');

INSERT INTO ingredients (recipe_id, ingredient_name)
VALUES
    (2, '1 pound spaghetti'),
    (2, '8 ounces pancetta or bacon, diced'),
    (2, '4 large eggs'),
    (2, '2 large egg yolks'),
    (2, '1 cup Pecorino Romano cheese, grated'),
    (2, 'Freshly ground black pepper'),
    (2, 'Fresh parsley, chopped (for garnish)');

-- Recipe 3: Chocolate Soufflé (Hard)
INSERT INTO recipes (id, title, difficulty, instructions, creator_name, created_date)
VALUES (3, 'Chocolate Soufflé', 'HARD',
        '1. Preheat oven to 375°F (190°C). Butter and sugar 6 ramekins.\n
        2. Melt chocolate and butter in a double boiler.\n
        3. Whisk in the flour and cook for 1 minute.\n
        4. Gradually whisk in the milk and cook until thickened.\n
        5. Remove from heat and whisk in the egg yolks, vanilla, and salt.\n
        6. In a separate bowl, beat the egg whites until foamy, then gradually add sugar and beat until stiff peaks form.\n
        7. Gently fold the egg whites into the chocolate mixture in three additions.\n
        8. Fill the ramekins to the top and smooth the surface.\n
        9. Run your thumb around the edge of each ramekin to create a ridge (this helps the soufflé rise evenly).\n
        10. Bake for 12-15 minutes until risen and set but still slightly jiggly in the center.\n
        11. Dust with powdered sugar and serve immediately.',
        'Pierre Dupont', '2023-03-10 20:15:00');

INSERT INTO ingredients (recipe_id, ingredient_name)
VALUES
    (3, '8 ounces bittersweet chocolate, chopped'),
    (3, '4 tablespoons unsalted butter'),
    (3, '2 tablespoons all-purpose flour'),
    (3, '1 cup milk'),
    (3, '4 large egg yolks'),
    (3, '6 large egg whites'),
    (3, '1/4 cup granulated sugar'),
    (3, '1 teaspoon vanilla extract'),
    (3, '1/4 teaspoon salt'),
    (3, 'Powdered sugar for dusting');

-- Recipe 4: Fresh Summer Salad (Easy)
INSERT INTO recipes (id, title, difficulty, instructions, creator_name, created_date)
VALUES (4, 'Fresh Summer Salad', 'EASY',
        '1. Wash and dry all the vegetables and lettuce.\n
        2. In a large salad bowl, tear the lettuce leaves into bite-sized pieces.\n
        3. Cut the cucumber and tomatoes into slices or chunks.\n
        4. Thinly slice the red onion.\n
        5. Add all vegetables to the bowl with the lettuce.\n
        6. In a small bowl, whisk together olive oil, lemon juice, salt, and pepper to make the dressing.\n
        7. Just before serving, pour the dressing over the salad and toss to coat.\n
        8. Sprinkle with crumbled feta cheese and serve immediately.',
        'Sarah Johnson', '2023-04-05 12:30:00');

INSERT INTO ingredients (recipe_id, ingredient_name)
VALUES
    (4, '1 head of romaine lettuce'),
    (4, '1 large cucumber'),
    (4, '2 medium tomatoes'),
    (4, '1/2 red onion'),
    (4, '1/2 cup feta cheese, crumbled'),
    (4, '3 tablespoons extra virgin olive oil'),
    (4, '2 tablespoons fresh lemon juice'),
    (4, 'Salt and pepper to taste');

-- Recipe 5: Beef Stir Fry (Medium)
INSERT INTO recipes (id, title, difficulty, instructions, creator_name, created_date)
VALUES (5, 'Beef Stir Fry', 'MEDIUM',
        '1. Slice the beef into thin strips against the grain.\n
        2. In a bowl, mix soy sauce, brown sugar, garlic, and ginger. Add the beef and marinate for at least 15 minutes.\n
        3. Heat oil in a wok or large skillet over high heat.\n
        4. Add the beef (reserving the marinade) and stir-fry for 2-3 minutes until browned but not fully cooked. Remove and set aside.\n
        5. Add a bit more oil if needed, then add the vegetables. Stir-fry for 3-4 minutes until crisp-tender.\n
        6. Return the beef to the wok, add the reserved marinade and cornstarch mixture.\n
        7. Cook, stirring constantly, until the sauce thickens and the beef is cooked through (about 2 minutes).\n
        8. Serve hot over rice, garnished with green onions.',
        'Robert Chen', '2023-05-18 19:00:00');

INSERT INTO ingredients (recipe_id, ingredient_name)
VALUES
    (5, '1 pound flank steak or sirloin'),
    (5, '3 tablespoons soy sauce'),
    (5, '1 tablespoon brown sugar'),
    (5, '2 cloves garlic, minced'),
    (5, '1 teaspoon fresh ginger, grated'),
    (5, '2 tablespoons vegetable oil'),
    (5, '1 bell pepper, sliced'),
    (5, '1 onion, sliced'),
    (5, '2 cups broccoli florets'),
    (5, '1 carrot, thinly sliced'),
    (5, '1 tablespoon cornstarch mixed with 2 tablespoons water'),
    (5, '2 green onions, sliced for garnish'),
    (5, 'Cooked rice for serving');

-- Set the auto-increment value after the sample data
ALTER TABLE recipes AUTO_INCREMENT = 6;
ALTER TABLE ingredients AUTO_INCREMENT = 50;