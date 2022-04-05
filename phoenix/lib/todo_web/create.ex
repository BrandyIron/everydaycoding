scope "/", TodoWeb do
  pipe_through :browser

  get "/items", ItemsController, :index
  post "/items", ItemsController, :create
end

def create(conn, %{"item" => item_params}) do
  Items.create_item(item_params)
  redirect(conn, to: "/items")
end
