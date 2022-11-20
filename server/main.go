package main

import (
	"github.com/golangnapoli/feedback-system/cmd"
	"github.com/sirupsen/logrus"
)

func main() {
	if err := cmd.NewRootCommand().Execute(); err != nil {
		logrus.Fatal(err)
	}
}
