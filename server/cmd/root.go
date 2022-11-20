// Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package cmd

import (
	"time"

	"github.com/briandowns/spinner"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/golangnapoli/feedback-system/internal/util/cobrax"
)

type rootConfig struct {
	Spinner    *spinner.Spinner
	Debug      bool
	DisableTty bool
}

type RootCommand struct {
	*cobra.Command
	config *rootConfig
}

func NewRootCommand() *RootCommand {
	cfg := &rootConfig{}
	rootCmd := &RootCommand{
		Command: &cobra.Command{
			Use:           "gnfs",
			Short:         "Golang Napoli's feedback and proposal system API Server",
			SilenceUsage:  true,
			SilenceErrors: true,
			PersistentPreRun: func(cmd *cobra.Command, _ []string) {
				// Configure the spinner
				w := logrus.StandardLogger().Out
				if cobrax.Flag[bool](cmd, "no-tty").(bool) {
					f := new(logrus.TextFormatter)
					f.DisableColors = false
					logrus.SetFormatter(f)
				}
				cfg.Spinner = spinner.New(spinner.CharSets[11], 100*time.Millisecond, spinner.WithWriter(w))

				// Set log level
				if cobrax.Flag[bool](cmd, "debug").(bool) {
					logrus.SetLevel(logrus.DebugLevel)
				} else {
					logrus.SetLevel(logrus.InfoLevel)
				}

			},
		},
		config: cfg,
	}

	viper.AutomaticEnv()
	viper.SetEnvPrefix("GNFS")

	rootCmd.PersistentFlags().BoolVarP(&rootCmd.config.Debug, "debug", "D", false, "Enables debug output")
	rootCmd.PersistentFlags().BoolVarP(&rootCmd.config.DisableTty, "no-tty", "T", false, "Disable TTY")

	rootCmd.AddCommand(NewServeCommand())

	return rootCmd
}
