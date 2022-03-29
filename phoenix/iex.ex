alias Todo.Items.Item
alias Todo.Repo
Repo.insert(%Item(description: "Write a Phoenix tutorial", completed: false))
INSERT INTO "items" ("completed", "description", "inserted_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id" [false, "Write a Phoenix tutorial", -N[2021-06-07 08:52:57], -N[2021-06-07 08:52:57]]
Repo.all(Item)
