scope "/", TodoWeb do
  pipe_through :browser

  get "/items", ItemController, :index
end

patch "/items/:id/complete", ItemsController, :complete
delete "/items/:id", ItemsController, :delete
