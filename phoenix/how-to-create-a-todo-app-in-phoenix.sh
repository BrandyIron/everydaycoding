mix phx.new todo
mix ecto.create
mix phx.server

mix ecto.gen.migration add_items

mix ecto.migrate

mix phx.server