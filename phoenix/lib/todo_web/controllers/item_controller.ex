defmodule TodoWeb.ItemController do
  use TodoWeb, :controller

  alias Todo.Items

  def index(conn, _params) do
    items = Items.list_items()
    render(conn, "index.html", items: items)
  end
end
