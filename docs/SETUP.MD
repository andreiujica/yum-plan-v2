# SETUP

This file will give a bit of context into how to run the application. It should be fairly simple, as it is purely a front-end application. No environment variables were used and no database was used.

# Prerequisites

- Node.js 20.x
- Yarn

## Installation

### Step 1: Clone the repository

```bash
git clone repo-url
cd repo-path/
```

### Step 2: Install dependencies

```bash
yarn install
```

### Step 3: Start a development server

```bash
yarn run dev
```

## Important things to know

Again, no database was used, so the state is stored inside the localStorage and mutated using the Pinia stores. In terms of testing, the philosophy used was "Make sure that the store is well tested, and make sure that the components emit the right events (which trigger the right store methods)". Therefore, most of the store methods were tested, while in terms of the components, only the most complex ones were tested.
