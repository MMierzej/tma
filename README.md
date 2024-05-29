# Telegram Mini App

## UI

![Web UI](https://imgur.com/bhiubkA.png)
![In-App UI](https://imgur.com/3cXz9rD.png)

## Functionality

The user can fill out a form and the data in the JSON format (chosen for simplicity, can be changed to any other) are forwarded to a specified Telegram chat.

It's possible to easily extend the functionality with sending the form data into a Google Sheet or anywhere else which supports some kind of API for storing the data.

## Deployment details

The app is available within the [@b8e0e48e_bot](https://t.me/b8e0e48e_bot) Telegram bot chat and at [https://tma2137.polandcentral.azurecontainer.io/](https://tma2137.polandcentral.azurecontainer.io/).

The app is hosted in Azure as a container group:
- [Caddy](https://caddyserver.com/) container exposed publicly acting as a reverse proxy with HTTPS
- app container serving the website and processing submitted forms, hidden behind the reverse proxy

## Design decisions

- Since the UI functionality is simple, a static website in plain HTML and CSS is sufficient.
- The form data should be sent to a specified chat via the bot. Both the chat id and the bot token are secret values, so the app needs a backend to provide the required functionalities without sending any sensitive data to the client.
- The app configuration is done using environment variables to keep secret values away from the code repository.
