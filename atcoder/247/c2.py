memo = {}

def S(n):
    if n in memo:
        return memo[n]
    if n == 1:
        ret = [1]
    else:
        ret = S(n-1) + [n] + S(n-1)
    memo[n] = ret
    return ret

N = int(input())
print(*S(N))