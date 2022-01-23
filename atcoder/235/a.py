a, b, c = input()
abc = a + b + c
bca = b + c + a
cab = c + a + b
ans = int(abc) + int(bca) + int(cab)
print(ans)