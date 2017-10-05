### Installation

#### Backend

```
composer install
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

#### Frontend
```
cd frontend
npm install
ng serve
```

Frontend requests assume that the backend API is served at ``` localhost:8000 ```, you can change this url inside ``` users.service.ts ```.

#### Testing

```
vendor/bin/phpunit
```
