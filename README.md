# movies-explorer-api

Репозиторий бэкенда проекта `movies-explorer`.

Размещение проекта на Яндекс.Облаке:
фронтенд -
https://movies-explorer.izverk.nomoredomains.work/;
бэкенд -
https://api.movies-explorer.izver.nomoredomains.work/

## Что за проект и о чем он

Проект `movies-explorer` представляет собой интернет-сервис, позволяющий найти
фильмы по запросу и сохранить в личном кабинете. Поиск фильмов осуществляется в
стороннем сервисе MoviesExplorer (предоставлен Яндекс.Практикумом). В проекте
реализована регистрация и аутентификация пользователя, а также возможность
редактировать данные его профиля. В настоящем репозитории расположена только
бэкенд-часть проекта.

## Цель создания проекта

Проект создан в рамках обучения на курсах
[Яндекс.Практикум](https://practicum.yandex.ru/) с целью приобретения и
закрепления практических навыков веб-разработки. Проект является выпускной
дипломной работой.

## Бэкенд-часть проекта `movies-explorer` обеспечивает следующую функциональность:

- cоздаёт в базе данных запись о новом пользователе (регистрирация
  пользователя);
- возвращает из базы данных информацию о пользователе;
- обновляет в базе данных информацию о пользователе;
- создаёт/удаляет в базе данных запись о выбранном пользователем фильме;
- возвращает из базы данных все сохранённые пользователем фильмы.

## Основные из примененных инструментов, технологий и концепций:

- Java Script;
- Node.js;
- Express;
- MongoDB, Mongoose;
- валидация запросов, централизованная обработка ошибок, логирование, CORS и пр.
