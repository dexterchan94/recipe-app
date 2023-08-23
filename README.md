# Recipe App

## Server

### Run the development server
1. Fill out `.env` based on `example.env`
2. Start PostgreSQL server
3. Install dependencies
```bash
yarn install
```
4. Generate Prisma client and GraphQL Schema
```bash
yarn generate
```
5. Run Prisma database migration
```bash
yarn prisma:migrate
```
6. Start development server
```bash
yarn dev
```
7. Stop PostgreSQL server

## Client

### Run the development server

1. Install Dependencies
```bash
yarn install
```

2. Run code generation
```bash
yarn codegen
```

3. Run the development server:
```bash
yarn dev
```


