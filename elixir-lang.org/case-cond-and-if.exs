case {1, 2, 3} do
  {4, 5, 6} -> "This clause won't match"
  {1, x, 3} -> "This clause will match and bind x to 2 in this clause"
  _ -> "This clause would match any value"
end
"This clause will match and bind x to 2 in this clause"

x = 1
case 10 do
  ^x -> "Won't match"
  _ -> "Will match"
end

case {1, 2, 3} do
  {1, x, 3} when x > 0 -> "Will match"
    _ -> "Would match, if guard condition were not satisfied"
end

case 1 do
  x when hd(x) -> "Won't match"
  x -> "Got #{x}"
end

case :ok do
  :error -> "Won't match"
end

f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end
f.(1, 3)
f.(-1, 3)
