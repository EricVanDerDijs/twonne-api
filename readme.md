# Simple Twitter clone API (Twonne API) - Personal project

This is a very simple twitter clone (Twonne) REST API made in Node.js with postgresSQL as the database.

The goal is to integrate in this project several technologies/techniques that I want to learn/try.

This are:
    - REST API Routing (for practice)
    - PostgreSQL database
    - Unit Testing

To do:
    - Integrate unit testing

## Docs:

If you are interested on using this sample API to back some frontend project you can use the "Twonnes.postman_collection.json" file to import the docs into postman.

Aditionally you will need to set this enviromental variables:
- **DB_URL:** the url of some postgres database
- **PORT:** node.js application port
- **INIT_TABLES:** "true" to initialize tables with stablished models
- **SEED_DB:** "true" to seed the db with some initial users and twonnes (superadmin user has 123456 as password);
- **SECRET:** Secret string to encrypt passwords


Happy coding!