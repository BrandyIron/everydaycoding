IO.puts("Hello world from Elixir")

byte_size("hello")

String.length("hello")

String.upcase("hello")

add = fn a, b -> a + b end
add.(1, 2)

double = fn a -> add.(a, a) end
double.(2)

x = 42
(fn -> x = 0 end).()

[1, 2, true, 3]
length [1, 2, 3]

[1, 2, 3] ++ [4, 5, 6]
[1, true, 2, false, 3, true] -- [true, false]

list = [1, 2, 3]
hd(list)
tl(list)

tuple = {:ok, "hello"}
elem(tuple, 1)
put_elem(tuple, 1, "world")
