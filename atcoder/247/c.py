def S(n):
    if n == 1:
        return [1]
    else:
        return S(n-1) + [n] + S(n-1)

N = int(input())
print(*S(N))