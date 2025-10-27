# Reverse proxy for Storybook

Vi bruker nginx for å kunne ha ett domene (design.udir.no) som server flere versjoner av dokumentasjonen vår.

Test lokalt ved å stå i `/nginx-proxy` og kjøre disse:

```
docker build -t nginx-proxy .

docker run --rm -p 8080:8080 nginx-proxy
```
