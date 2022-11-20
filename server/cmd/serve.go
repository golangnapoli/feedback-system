package cmd

import (
	"github.com/golangnapoli/feedback-system/internal/server"
	"github.com/golangnapoli/feedback-system/internal/util/cobrax"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func NewServeCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "serve",
		Short: "Starts the server",
		Long:  `Starts the server`,
		RunE: func(cmd *cobra.Command, _ []string) error {
			a := cobrax.Flag[string](cmd, "address").(string)
			p := cobrax.Flag[int](cmd, "port").(int)

			sc := server.ServerConfig{
				Address: a,
				Port:    p,
			}

			srv := server.NewServer(sc)

			return srv.Start()
		},
	}

	viper.AutomaticEnv()
	viper.SetEnvPrefix("GNFS")

	cmd.Flags().StringP("address", "a", "", "Server address")
	cmd.Flags().IntP("port", "p", 8080, "Server port")

	return cmd
}
