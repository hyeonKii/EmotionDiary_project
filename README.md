# Introduce

> 프로젝트를 시작할 때 공통적인 작업을 하지않기 위해서 만든 code-base 입니다.

# Skill

-   eslint
-   typescript
-   vite
-   React
-   Express
-   dotenv

# Setup

-   Front

```bash
cd code_base/front
touch .env
echo "VITE_PORT=3001" > .env
```

-   Back

```bash
cd code_base/back
touch .env
echo "PORT=3002" > .env
```

# Command

-   Eslint

```bash
$code_base/. yarn eslint .
```

-   Front

```bash
$code_base/front yarn dev
$code_base/front yarn build
```

-   Back

```bash
$code_base/back yarn dev
$code_base/back yarn build
```
