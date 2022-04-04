scope "/", TodoWeb do
  pipe_through :browser

  get "/items", ItemsController, :index
  post "/items", ItemsController, :create
end
