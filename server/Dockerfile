FROM golang:alpine AS compiler
ENV CGO_ENABLED=0
WORKDIR /app
ADD go.mod go.sum ./
ADD . /app
RUN go build -o /bin/gnfs -ldflags="-w -s" main.go

FROM alpine:3.12 AS final
COPY --from=compiler /bin/gnfs /gnfs

ENTRYPOINT ["/gnfs"]

CMD ["serve"]
