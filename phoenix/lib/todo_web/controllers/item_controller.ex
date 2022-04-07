defmodule TodoWeb.ItemController do
  use TodoWeb, :controller

  alias Todo.Items

  def index(conn, _params) do
    items = Items.list_items()
    render(conn, "index.html", items: items)
  end
end

defmodule TodoWeb.ItemsController do
  use TodoWeb, :controller

  alias Todo.Items
  alias Todo.Items.Item

  def index(conn, _params) do
    items = Items.list_items()
    changeset = Item.changeset(%Item{}, %{})
    render(conn, "index.html", items: items, changeset: changeset)
  end

  def create(conn, %{"item" => item_params}) do
    Items.create_item(item_params)
    redirect(conn, to: "/items")
  end
