{a, b, c} = {:hello, "world", 42}

{:ok, result} = {:ok, 13}

[head | tail] = [1, 2, 3]

list = [1, 2, 3]
[0 | list]

x = 1
[^x, 2, 3] = [1, 2, 3]
{y, ^x} = {2, 1}

[head | _] = [1, 2, 3]
