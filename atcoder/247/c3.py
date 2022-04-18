N = int(input())
dp = [[] for _ in range(N+1)]
dp[1] = [1]
for n in range(2, N+1):
    dp[n] = dp[n-1] + [n] + dp[n-1]
print(*dp[N])